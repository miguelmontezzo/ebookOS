import { assertSupabaseServerConfig, supabaseAdmin } from '../../_lib/supabaseAdmin.js';

function randomPassword() {
  return Math.random().toString(36).slice(2, 10);
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    assertSupabaseServerConfig();

    const { token } = req.query;
    if (!token) return res.status(400).json({ error: 'Missing token' });

    const { data: connection, error: connErr } = await supabaseAdmin
      .from('webhook_connections')
      .select('*')
      .eq('webhook_token', String(token))
      .single();

    if (connErr || !connection) return res.status(404).json({ error: 'Webhook connection not found' });

    const payload = req.body || {};
    const status = String(payload.status || payload.order_status || payload.event || 'received').toLowerCase();
    const eventType = String(payload.event || payload.type || payload.order_status || 'unknown');

    const email = payload?.customer?.email || payload?.buyer?.email || payload?.email || null;
    const productId = String(payload?.product?.id || payload?.product_id || payload?.offer?.product_id || '');

    await supabaseAdmin
      .from('webhook_connections')
      .update({
        last_event_at: new Date().toISOString(),
        last_event_status: status,
        last_event_type: eventType,
        last_payload: payload,
      })
      .eq('id', connection.id);

    const approved = ['paid', 'approved', 'completed'].includes(status);
    if (!approved || !email || !productId) {
      return res.status(200).json({ ok: true, received: true, processed: false });
    }

    const { data: ebook } = await supabaseAdmin
      .from('ebooks')
      .select('*')
      .eq('owner_id', connection.owner_id)
      .eq('payment_product_id', productId)
      .single();

    if (!ebook) {
      return res.status(200).json({ ok: true, received: true, processed: false, reason: 'product_not_mapped' });
    }

    const aluno = {
      ebook_id: ebook.id,
      email: String(email).toLowerCase().trim(),
      password: randomPassword(),
      data_compra: new Date().toISOString(),
    };

    const { error: alunoErr } = await supabaseAdmin
      .from('alunos')
      .upsert(aluno, { onConflict: 'ebook_id,email' });

    if (alunoErr) return res.status(500).json({ error: alunoErr.message });

    return res.status(200).json({ ok: true, received: true, processed: true, ebook_id: ebook.id, email: aluno.email });
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Webhook processing failed' });
  }
}

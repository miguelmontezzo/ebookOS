import { assertSupabaseServerConfig, supabaseAdmin } from '../../_lib/supabaseAdmin.js';

function randomPassword() {
  return Math.random().toString(36).slice(2, 10);
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    assertSupabaseServerConfig();

    const configuredSecret = process.env.KIWIFY_WEBHOOK_SECRET;
    if (configuredSecret) {
      const secret = req.headers['x-webhook-secret'];
      if (secret !== configuredSecret) return res.status(401).json({ error: 'Invalid webhook secret' });
    }

    const payload = req.body || {};

    const status = String(payload.status || payload.order_status || '').toLowerCase();
    const approved = ['paid', 'approved', 'completed'].includes(status);
    if (!approved) return res.status(200).json({ ignored: true, reason: `status=${status || 'unknown'}` });

    const email = payload?.customer?.email || payload?.buyer?.email || payload?.email;
    const productId = payload?.product?.id || payload?.product_id || payload?.offer?.product_id;
    const ebookIdFromMeta = payload?.metadata?.ebook_id || payload?.ebook_id;

    if (!email) return res.status(400).json({ error: 'Missing buyer email' });

    let ebook = null;
    if (ebookIdFromMeta) {
      const { data } = await supabaseAdmin.from('ebooks').select('*').eq('id', ebookIdFromMeta).single();
      ebook = data;
    }
    if (!ebook && productId) {
      const { data } = await supabaseAdmin.from('ebooks').select('*').eq('external_product_id', String(productId)).single();
      ebook = data;
    }

    if (!ebook) return res.status(404).json({ error: 'Ebook mapping not found' });

    const aluno = {
      ebook_id: ebook.id,
      email: String(email).toLowerCase().trim(),
      password: randomPassword(),
      data_compra: new Date().toISOString(),
    };

    const { error } = await supabaseAdmin
      .from('alunos')
      .upsert(aluno, { onConflict: 'ebook_id,email' });

    if (error) return res.status(500).json({ error: error.message });

    // optional payment log
    await supabaseAdmin.from('payments').insert({
      provider: 'kiwify',
      provider_payment_id: String(payload.id || payload.payment_id || ''),
      status,
      email_buyer: aluno.email,
      amount_cents: Number(payload.amount_cents || payload.amount || 0),
      ebook_id: ebook.id,
      raw_payload: payload,
    }).then(() => {}).catch(() => {});

    return res.status(200).json({ ok: true, ebook_id: ebook.id, email: aluno.email });
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Webhook processing failed' });
  }
}

import { createOrUpdateProductOnKiwify } from '../../_lib/kiwify.js';
import { assertSupabaseServerConfig, requireAdminFromBearer, supabaseAdmin } from '../../_lib/supabaseAdmin.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    assertSupabaseServerConfig();

    const paymentsEnabled = String(process.env.PAYMENTS_ENABLED || 'false') === 'true';
    if (!paymentsEnabled) {
      return res.status(200).json({ standby: true, message: 'Payments in standby mode (PAYMENTS_ENABLED=false).' });
    }

    const auth = await requireAdminFromBearer(req);
    if (auth.error) return res.status(401).json({ error: auth.error });

    const { ebookId, title, description, priceCents } = req.body || {};
    if (!ebookId || !title || !priceCents) {
      return res.status(400).json({ error: 'ebookId, title and priceCents are required' });
    }

    const { data: ebook, error: ebookErr } = await supabaseAdmin
      .from('ebooks')
      .select('*')
      .eq('id', ebookId)
      .single();

    if (ebookErr || !ebook) return res.status(404).json({ error: 'Ebook not found' });
    if (ebook.owner_id !== auth.user.id) return res.status(403).json({ error: 'Forbidden' });

    const result = await createOrUpdateProductOnKiwify({
      title,
      description,
      priceCents,
      externalProductId: ebook.external_product_id || null,
      metadata: { ebook_id: ebookId },
    });

    const { error: updateError } = await supabaseAdmin
      .from('ebooks')
      .update({
        payment_provider: 'kiwify',
        price_cents: priceCents,
        external_product_id: result.externalProductId,
        checkout_url: result.checkoutUrl,
      })
      .eq('id', ebookId);

    if (updateError) return res.status(500).json({ error: updateError.message });

    return res.status(200).json({
      ok: true,
      externalProductId: result.externalProductId,
      checkoutUrl: result.checkoutUrl,
    });
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Kiwify sync failed' });
  }
}

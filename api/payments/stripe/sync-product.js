import { assertSupabaseServerConfig, requireAdminFromBearer, supabaseAdmin } from '../../_lib/supabaseAdmin.js';
import { stripeCreatePaymentLink, stripeCreatePrice, stripeCreateProduct } from '../../_lib/stripe.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    assertSupabaseServerConfig();

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

    const currency = String(process.env.STRIPE_CURRENCY || 'brl').toLowerCase();

    const product = await stripeCreateProduct(title, description || '', ebookId);
    const price = await stripeCreatePrice(product.id, Number(priceCents), currency, ebookId);
    const paymentLink = await stripeCreatePaymentLink(price.id, ebookId);

    const { error: updateError } = await supabaseAdmin
      .from('ebooks')
      .update({
        payment_provider: 'stripe',
        price_cents: Number(priceCents),
        external_product_id: product.id,
        checkout_url: paymentLink.url,
      })
      .eq('id', ebookId);

    if (updateError) return res.status(500).json({ error: updateError.message });

    return res.status(200).json({
      ok: true,
      checkoutUrl: paymentLink.url,
      stripeProductId: product.id,
      stripePriceId: price.id,
      stripePaymentLinkId: paymentLink.id,
    });
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Stripe sync failed' });
  }
}

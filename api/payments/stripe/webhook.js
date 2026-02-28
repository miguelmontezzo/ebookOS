import Stripe from 'stripe';
import { assertSupabaseServerConfig, supabaseAdmin } from '../../_lib/supabaseAdmin.js';
import { stripeRetrievePaymentLink } from '../../_lib/stripe.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

function randomPassword() {
  return Math.random().toString(36).slice(2, 10);
}

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    assertSupabaseServerConfig();

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!stripeKey || !webhookSecret) {
      return res.status(500).json({ error: 'Missing STRIPE_SECRET_KEY and/or STRIPE_WEBHOOK_SECRET' });
    }

    const stripe = new Stripe(stripeKey);
    const rawBody = await getRawBody(req);
    const signature = req.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      return res.status(400).json({ error: `Invalid signature: ${err.message}` });
    }

    if (event.type !== 'checkout.session.completed') {
      return res.status(200).json({ ignored: true, event: event.type });
    }

    const session = event.data.object;
    const email = session?.customer_details?.email || session?.customer_email;
    if (!email) return res.status(400).json({ error: 'Missing customer email in checkout session' });

    let ebookId = session?.metadata?.ebook_id || null;

    if (!ebookId && session?.payment_link) {
      const paymentLinkId = String(session.payment_link).replace('plink_', 'plink_');
      const paymentLink = await stripeRetrievePaymentLink(paymentLinkId);
      ebookId = paymentLink?.metadata?.ebook_id || null;
    }

    if (!ebookId) return res.status(404).json({ error: 'ebook_id not found in Stripe metadata' });

    const { data: ebook } = await supabaseAdmin.from('ebooks').select('*').eq('id', ebookId).single();
    if (!ebook) return res.status(404).json({ error: 'Ebook not found' });

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

    // payment log is optional
    await supabaseAdmin.from('payments').insert({
      provider: 'stripe',
      provider_payment_id: String(session.payment_intent || session.id || ''),
      status: 'completed',
      email_buyer: aluno.email,
      amount_cents: Number(session.amount_total || 0),
      ebook_id: ebook.id,
      raw_payload: session,
    }).then(() => {}).catch(() => {});

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Webhook processing failed' });
  }
}

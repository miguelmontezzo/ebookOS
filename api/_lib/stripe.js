const STRIPE_API_BASE = 'https://api.stripe.com/v1';

function stripeHeaders() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY');
  return {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
}

function formEncode(obj = {}) {
  const params = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined && v !== null) params.append(k, String(v));
  });
  return params;
}

export async function stripeCreateProduct(name, description, ebookId) {
  const body = formEncode({
    name,
    description: description || '',
    'metadata[ebook_id]': ebookId,
  });

  const res = await fetch(`${STRIPE_API_BASE}/products`, {
    method: 'POST',
    headers: stripeHeaders(),
    body,
  });

  const json = await res.json();
  if (!res.ok) throw new Error(`Stripe product error: ${json.error?.message || res.status}`);
  return json;
}

export async function stripeCreatePrice(productId, amountCents, currency, ebookId) {
  const body = formEncode({
    product: productId,
    unit_amount: amountCents,
    currency,
    'metadata[ebook_id]': ebookId,
  });

  const res = await fetch(`${STRIPE_API_BASE}/prices`, {
    method: 'POST',
    headers: stripeHeaders(),
    body,
  });

  const json = await res.json();
  if (!res.ok) throw new Error(`Stripe price error: ${json.error?.message || res.status}`);
  return json;
}

export async function stripeCreatePaymentLink(priceId, ebookId) {
  const body = formEncode({
    'line_items[0][price]': priceId,
    'line_items[0][quantity]': 1,
    'metadata[ebook_id]': ebookId,
  });

  const res = await fetch(`${STRIPE_API_BASE}/payment_links`, {
    method: 'POST',
    headers: stripeHeaders(),
    body,
  });

  const json = await res.json();
  if (!res.ok) throw new Error(`Stripe payment link error: ${json.error?.message || res.status}`);
  return json;
}

export async function stripeRetrievePaymentLink(linkId) {
  const res = await fetch(`${STRIPE_API_BASE}/payment_links/${linkId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Stripe payment link retrieve error: ${json.error?.message || res.status}`);
  return json;
}

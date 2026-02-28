const KIWIFY_BASE_URL = process.env.KIWIFY_BASE_URL || 'https://public-api.kiwify.com';

export async function getKiwifyToken() {
  const clientId = process.env.KIWIFY_CLIENT_ID;
  const clientSecret = process.env.KIWIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing KIWIFY_CLIENT_ID or KIWIFY_CLIENT_SECRET');
  }

  const res = await fetch(`${KIWIFY_BASE_URL}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Kiwify auth failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

export async function createOrUpdateProductOnKiwify({ title, description, priceCents, externalProductId, metadata }) {
  const token = await getKiwifyToken();
  const accountId = process.env.KIWIFY_ACCOUNT_ID;
  if (!accountId) throw new Error('Missing KIWIFY_ACCOUNT_ID');

  const endpoint = externalProductId
    ? `${KIWIFY_BASE_URL}/v1/products/${externalProductId}`
    : `${KIWIFY_BASE_URL}/v1/products`;

  const method = externalProductId ? 'PUT' : 'POST';

  const payload = {
    account_id: accountId,
    name: title,
    description: description || '',
    price_cents: priceCents,
    currency: 'BRL',
    metadata: metadata || {},
  };

  const res = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Kiwify product sync failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return {
    externalProductId: data.id || data.product_id || externalProductId,
    checkoutUrl: data.checkout_url || data.url || null,
    raw: data,
  };
}

-- 1) Columns to map each ebook to external payment page/product
ALTER TABLE public.ebooks
  ADD COLUMN IF NOT EXISTS payment_link_url TEXT,
  ADD COLUMN IF NOT EXISTS payment_product_id TEXT;

CREATE INDEX IF NOT EXISTS idx_ebooks_payment_product_id ON public.ebooks (payment_product_id);

-- 2) Per-admin webhook connection (one webhook URL per producer/account)
CREATE TABLE IF NOT EXISTS public.webhook_connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'kiwify',
  webhook_token TEXT UNIQUE NOT NULL,
  last_event_at TIMESTAMP WITH TIME ZONE,
  last_event_status TEXT,
  last_event_type TEXT,
  last_payload JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(owner_id, provider)
);

ALTER TABLE public.webhook_connections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins manage own webhook connections" ON public.webhook_connections;
CREATE POLICY "Admins manage own webhook connections"
ON public.webhook_connections FOR ALL
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "Service role can update webhook events" ON public.webhook_connections;
CREATE POLICY "Service role can update webhook events"
ON public.webhook_connections FOR UPDATE
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

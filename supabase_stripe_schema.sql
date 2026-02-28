-- Stripe support columns (safe if already exists)
ALTER TABLE public.ebooks
  ADD COLUMN IF NOT EXISTS price_cents INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS payment_provider TEXT,
  ADD COLUMN IF NOT EXISTS external_product_id TEXT,
  ADD COLUMN IF NOT EXISTS checkout_url TEXT;

CREATE INDEX IF NOT EXISTS idx_ebooks_external_product_id ON public.ebooks (external_product_id);

-- Optional payment log table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  provider TEXT NOT NULL,
  provider_payment_id TEXT,
  status TEXT,
  email_buyer TEXT,
  amount_cents INTEGER DEFAULT 0,
  ebook_id UUID REFERENCES public.ebooks(id) ON DELETE CASCADE,
  raw_payload JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can read own payment logs" ON public.payments;
CREATE POLICY "Admins can read own payment logs"
ON public.payments FOR SELECT
USING (
  auth.uid() IN (SELECT owner_id FROM public.ebooks WHERE id = public.payments.ebook_id)
);

DROP POLICY IF EXISTS "Service role can insert payments" ON public.payments;
CREATE POLICY "Service role can insert payments"
ON public.payments FOR INSERT
WITH CHECK (auth.role() = 'service_role');

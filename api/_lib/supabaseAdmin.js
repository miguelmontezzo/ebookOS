import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin = createClient(
  supabaseUrl || 'https://invalid.local',
  serviceRoleKey || 'invalid',
  { auth: { persistSession: false } }
);

export function assertSupabaseServerConfig() {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY');
  }
}

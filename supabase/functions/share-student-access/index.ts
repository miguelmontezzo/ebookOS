// @ts-nocheck
// Supabase Edge Function: share-student-access
// Envia e-mail com login, senha e botão de acesso.
// Configure no projeto Supabase:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

type Payload = {
  to: string;
  alunoEmail: string;
  alunoPassword: string;
  loginUrl: string;
  ebookTitle?: string;
};

function buildHtml({ alunoEmail, alunoPassword, loginUrl, ebookTitle }: Payload) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
    <h2 style="margin:0 0 12px">Seu acesso ao ${ebookTitle || 'ebookOS'}</h2>
    <p style="margin:0 0 16px;color:#444">Seu acesso foi liberado. Use os dados abaixo para entrar:</p>

    <div style="background:#f5f7fb;border:1px solid #e6e9f2;border-radius:10px;padding:14px;margin-bottom:18px">
      <p style="margin:0 0 8px"><strong>E-mail:</strong> ${alunoEmail}</p>
      <p style="margin:0"><strong>Senha:</strong> ${alunoPassword}</p>
    </div>

    <a href="${loginUrl}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:600">Entrar no ebookOS</a>

    <p style="margin-top:18px;color:#666;font-size:13px">Se o botão não abrir, copie e cole este link no navegador:<br/>${loginUrl}</p>
  </div>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as Payload;
    if (!body?.to || !body?.alunoEmail || !body?.alunoPassword || !body?.loginUrl) {
      return new Response(JSON.stringify({ error: 'payload inválido' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const host = Deno.env.get('SMTP_HOST');
    const port = Deno.env.get('SMTP_PORT') || '587';
    const user = Deno.env.get('SMTP_USER');
    const pass = Deno.env.get('SMTP_PASS');
    const from = Deno.env.get('SMTP_FROM') || 'no-reply@ebookos.local';

    if (!host || !user || !pass) {
      return new Response(JSON.stringify({ error: 'SMTP não configurado nas envs da função' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // SMTP via API compatível com Resend-like bridge ou gateway interno.
    // Se você usa provedor SMTP puro, troque por uma integração HTTP do seu provedor
    // ou adapte com biblioteca de SMTP para Deno.
    const smtpBridgeUrl = Deno.env.get('SMTP_BRIDGE_URL');
    if (!smtpBridgeUrl) {
      return new Response(JSON.stringify({ error: 'Defina SMTP_BRIDGE_URL para envio HTTP de e-mail' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const resp = await fetch(smtpBridgeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host,
        port,
        user,
        pass,
        from,
        to: body.to,
        subject: `Acesso liberado — ${body.ebookTitle || 'ebookOS'}`,
        html: buildHtml(body)
      })
    });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`falha no bridge de e-mail: ${text}`);
    }

    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'erro interno' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

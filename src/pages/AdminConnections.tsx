import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from '../contexts/AuthAdminContext';
import { ArrowLeft, Copy, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

function genToken() {
  const arr = new Uint8Array(24);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function AdminConnections() {
  const { user } = useAdminAuth();
  const [row, setRow] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const webhookUrl = useMemo(() => {
    if (!row?.webhook_token) return '';
    return `${window.location.origin}/api/webhooks/kiwify/${row.webhook_token}`;
  }, [row]);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from('webhook_connections')
      .select('*')
      .eq('owner_id', user.id)
      .maybeSingle();

    if (!data) {
      const token = genToken();
      const { data: created } = await supabase
        .from('webhook_connections')
        .insert([{ owner_id: user.id, provider: 'kiwify', webhook_token: token }])
        .select('*')
        .single();
      setRow(created);
    } else {
      setRow(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const copy = async () => {
    if (!webhookUrl) return;
    await navigator.clipboard.writeText(webhookUrl);
    alert('Webhook copiada!');
  };

  const regen = async () => {
    if (!row) return;
    setSaving(true);
    const token = genToken();
    const { data, error } = await supabase
      .from('webhook_connections')
      .update({ webhook_token: token })
      .eq('id', row.id)
      .select('*')
      .single();

    if (error) alert('Erro ao regenerar token: ' + error.message);
    if (data) setRow(data);
    setSaving(false);
  };

  if (loading) return <div className="min-h-screen bg-zinc-900 text-white p-8">Carregando...</div>;

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </Link>

        <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-6">
          <h1 className="text-2xl font-black mb-2">Conexões</h1>
          <p className="text-zinc-400 mb-6">Configure a webhook da Kiwify para liberar acessos automaticamente.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-300 mb-2">Webhook Kiwify (copie e cole no painel do produtor)</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  value={webhookUrl}
                  readOnly
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-200"
                />
                <button onClick={copy} className="bg-emerald-500 text-zinc-900 font-bold px-4 py-3 rounded-xl inline-flex items-center justify-center gap-2">
                  <Copy className="w-4 h-4" /> Copiar
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={regen}
                disabled={saving}
                className="bg-zinc-700 hover:bg-zinc-600 text-white font-semibold px-4 py-2 rounded-lg inline-flex items-center gap-2 disabled:opacity-70"
              >
                <RefreshCw className="w-4 h-4" /> Regenerar token
              </button>

              {row?.last_event_at ? (
                <span className="inline-flex items-center gap-2 text-emerald-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Último teste recebido: {new Date(row.last_event_at).toLocaleString('pt-BR')}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-amber-400 text-sm">
                  <AlertCircle className="w-4 h-4" /> Nenhum teste recebido ainda
                </span>
              )}
            </div>

            {row?.last_event_type && (
              <div className="text-sm text-zinc-400">
                Último evento: <span className="text-zinc-200">{row.last_event_type}</span> · status: <span className="text-zinc-200">{row.last_event_status || '-'}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

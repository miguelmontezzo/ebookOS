import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle2, Loader2, AlertTriangle, LogIn } from 'lucide-react';

type Status = 'loading' | 'success' | 'error';

export default function ConfirmAccount() {
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('Validando confirmação da sua conta...');

  const hashParams = useMemo(() => {
    const hash = window.location.hash.startsWith('#') ? window.location.hash.substring(1) : window.location.hash;
    return new URLSearchParams(hash);
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        const access_token = hashParams.get('access_token');
        const refresh_token = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        if (!access_token || !refresh_token || type !== 'signup') {
          setStatus('error');
          setMessage('Link inválido ou expirado. Solicite uma nova confirmação.');
          return;
        }

        const { error } = await supabase.auth.setSession({ access_token, refresh_token });
        if (error) {
          setStatus('error');
          setMessage('Não foi possível confirmar sua conta. Tente novamente.');
          return;
        }

        // Limpa hash sensível da URL
        window.history.replaceState({}, document.title, '/auth/confirm');

        setStatus('success');
        setMessage('Parabéns! Sua conta foi confirmada com sucesso.');
      } catch {
        setStatus('error');
        setMessage('Ocorreu um erro inesperado na confirmação.');
      }
    };

    run();
  }, [hashParams]);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 font-sans flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-8 text-center">
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
            <h1 className="text-2xl font-black text-white">Confirmando conta...</h1>
            <p className="text-zinc-400">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            <h1 className="text-2xl font-black text-white">Conta confirmada 🎉</h1>
            <p className="text-zinc-300">{message}</p>
            <Link
              to="/admin/login"
              className="mt-2 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <LogIn className="w-5 h-5" />
              Fazer login
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-4">
            <AlertTriangle className="w-12 h-12 text-amber-400" />
            <h1 className="text-2xl font-black text-white">Não foi possível confirmar</h1>
            <p className="text-zinc-300">{message}</p>
            <Link
              to="/admin/register"
              className="mt-2 inline-flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Voltar para cadastro
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

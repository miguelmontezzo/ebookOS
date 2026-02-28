import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AuthAdminContext';
import { supabase } from '../lib/supabase';
import { uploadAvatarToSupabase } from '../lib/uploadAvatar';
import { ArrowLeft, Loader2, Save, UserCircle2 } from 'lucide-react';

export default function AdminAccount() {
  const { user } = useAdminAuth();

  const [name, setName] = useState((user?.user_metadata?.name as string) || '');
  const [avatarUrl, setAvatarUrl] = useState((user?.user_metadata?.avatar_url as string) || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const preview = useMemo(() => {
    if (avatarFile) return URL.createObjectURL(avatarFile);
    return avatarUrl || '';
  }, [avatarFile, avatarUrl]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!user) return;
    if (!name.trim()) {
      setError('Informe seu nome de autor.');
      return;
    }

    setIsSaving(true);

    try {
      let finalAvatarUrl = avatarUrl;

      if (avatarFile) {
        setIsUploading(true);
        const uploaded = await uploadAvatarToSupabase(avatarFile);
        setIsUploading(false);
        if (uploaded) {
          finalAvatarUrl = uploaded;
          setAvatarUrl(uploaded);
        }
      }

      const { error } = await supabase.auth.updateUser({
        data: {
          name: name.trim(),
          avatar_url: finalAvatarUrl || null,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setAvatarFile(null);
        setMessage('Conta de autor atualizada com sucesso!');
      }
    } catch {
      setError('Erro ao salvar dados da conta.');
    } finally {
      setIsSaving(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 font-sans p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para o painel
        </Link>

        <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-black mb-2">Minha Conta de Autor</h1>
          <p className="text-zinc-400 mb-8">Gerencie nome e foto do seu perfil de autor.</p>

          {error && <div className="mb-4 bg-red-500/10 border border-red-500/40 text-red-200 px-4 py-3 rounded-xl text-sm">{error}</div>}
          {message && <div className="mb-4 bg-emerald-500/10 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded-xl text-sm">{message}</div>}

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Foto de perfil</label>
              <div className="flex items-center gap-4">
                {preview ? (
                  <img src={preview} alt="Avatar" className="w-20 h-20 rounded-full object-cover border border-zinc-700" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-zinc-700/70 border border-zinc-600 flex items-center justify-center">
                    <UserCircle2 className="w-10 h-10 text-zinc-400" />
                  </div>
                )}

                <label className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  Escolher imagem
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
              {isUploading && (
                <p className="text-amber-400 text-sm mt-2 inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Enviando avatar...</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Nome do autor</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Seu nome de autor"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full bg-zinc-900/30 border border-zinc-700/50 rounded-xl px-4 py-3 text-zinc-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-70"
            >
              {isSaving ? <><Loader2 className="w-5 h-5 animate-spin" /> Salvando...</> : <><Save className="w-5 h-5" /> Salvar alterações</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

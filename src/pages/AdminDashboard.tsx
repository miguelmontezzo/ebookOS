import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Library, BookOpen, LogOut, Copy, ExternalLink, Loader2, Plus, Sparkles } from 'lucide-react';
import { useAdminAuth } from '../contexts/AuthAdminContext';
import { supabase } from '../lib/supabase';
import Logo from '../components/Logo';

interface Ebook {
    id: string;
    title: string;
    slug: string;
    description: string;
    cover_url: string;
    theme_color: string;
}

export default function AdminDashboard() {
    const { logout, user } = useAdminAuth();
    const [ebooks, setEbooks] = useState<Ebook[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEbooks() {
            if (!user) return;
            // Busca somente ebooks do produtor logado
            const { data, error } = await supabase
                .from('ebooks')
                .select('*')
                .eq('owner_id', user.id)
                .order('created_at', { ascending: false });

            if (data && !error) {
                setEbooks(data);
            }
            setLoading(false);
        }
        fetchEbooks();
    }, [user]);

    const handleCopyLink = (slug: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const url = `${window.location.origin}/${slug}/login`;
        navigator.clipboard.writeText(url);
        setCopiedSlug(slug);
        setTimeout(() => setCopiedSlug(null), 2000);
    };

    return (
        <div className="min-h-screen bg-zinc-900 text-zinc-100 font-sans">
            {/* Header */}
            <header className="bg-zinc-800/50 border-b border-zinc-700/50 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10 backdrop-blur-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                    <Logo variant="dark" />
                    <div className="border-l border-zinc-700 pl-3 ml-1">
                        <p className="text-xs font-semibold text-emerald-500 uppercase tracking-widest">Admin Dashboard</p>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 border border-zinc-700 hover:bg-zinc-800 rounded-lg text-sm text-zinc-300 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sair
                </button>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">Meus Ebooks</h2>
                        <p className="text-zinc-400 text-base sm:text-lg">Catálogo de publicações ativas (Visualização do Produtor).</p>
                    </div>
                    <Link
                        to="/admin/ai-studio"
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                    >
                        <Sparkles className="w-5 h-5" />
                        Criar Ebook com IA
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                    </div>
                ) : ebooks.length === 0 ? (
                    <div className="text-center py-20 bg-zinc-800/30 rounded-3xl border border-zinc-800 border-dashed">
                        <BookOpen className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-zinc-300">Nenhum Ebook Encontrado</h3>
                        <p className="text-zinc-500 mt-2">Você ainda não vinculou nenhum Ebook a esta conta Admin.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {ebooks.map((ebook) => (
                            <div key={ebook.id} className="group flex flex-col bg-zinc-800/50 rounded-2xl overflow-hidden border border-zinc-700/50 hover:border-emerald-500/50 transition-all duration-300">
                                {/* Cover Image */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border-b border-zinc-700/50">
                                    {ebook.cover_url ? (
                                        <img
                                            src={ebook.cover_url}
                                            alt={ebook.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                        />
                                    ) : (
                                        <div className={`w-full h-full flex items-center justify-center bg-${ebook.theme_color || 'emerald'}-900`}>
                                            <BookOpen className={`w-16 h-16 text-${ebook.theme_color || 'emerald'}-400 opacity-50`} />
                                        </div>
                                    )}
                                </div>

                                {/* Text Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="font-bold text-xl mb-2 text-white group-hover:text-emerald-400 transition-colors">{ebook.title}</h3>
                                    <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed flex-1 mb-4">
                                        {ebook.description || 'Sem descrição.'}
                                    </p>

                                    <div className="flex flex-col gap-2 mt-auto">
                                        <div className="flex gap-2 w-full">
                                            <button
                                                onClick={(e) => handleCopyLink(ebook.slug, e)}
                                                className="flex-1 flex justify-center items-center gap-2 bg-zinc-700/50 hover:bg-zinc-600 text-white py-2.5 px-3 rounded-xl text-sm font-bold transition-colors"
                                                title="Copiar Login do Aluno"
                                            >
                                                {copiedSlug === ebook.slug ? (
                                                    <span className="text-emerald-400">Copiado!</span>
                                                ) : (
                                                    <><Copy className="w-4 h-4" /> Link</>
                                                )}
                                            </button>
                                            <Link
                                                to={`/admin/ebook/${ebook.id}`}
                                                className="flex-[2] flex justify-center items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-black py-2.5 px-4 rounded-xl text-sm transition-colors shadow-lg shadow-emerald-500/10"
                                            >
                                                Gerenciar
                                            </Link>
                                        </div>
                                        <Link
                                            to={`/${ebook.slug}`}
                                            target="_blank"
                                            className="w-full flex justify-center items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50 text-zinc-300 py-2.5 px-4 rounded-xl text-sm font-bold transition-colors"
                                            title="Pré-visualizar como Aluno"
                                        >
                                            <ExternalLink className="w-4 h-4 text-zinc-400" /> Ver como Aluno
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStudentAuth } from '../contexts/AuthStudentContext';
import { Lock, Loader2, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function StudentLogin() {
    const { slug } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ebookTitle, setEbookTitle] = useState('Buscando Ebook...');

    const { loginStudent } = useStudentAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Busca o título do ebook para mostrar na tela de login de forma bonitinha
        async function fetchTitle() {
            if (!slug) return;
            const { data } = await supabase.from('ebooks').select('title').eq('slug', slug).single();
            if (data) setEbookTitle(data.title);
            else setEbookTitle('Ebook não encontrado');
        }
        fetchTitle();
    }, [slug]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password || !slug) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await loginStudent(email, password, slug);
            if (result.success) {
                navigate(`/${slug}`); // Entra na leitura
            } else {
                setError(result.error || 'Erro desconhecido. Tente novamente.');
            }
        } catch (err: any) {
            setError('Ocorreu um erro na conexão. Verifique sua internet.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/20">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                </div>
                <h2 className="mt-2 text-center text-3xl font-black tracking-tight text-zinc-900">
                    Acesso ao Aluno
                </h2>
                <p className="mt-2 text-center text-sm text-zinc-600">
                    Você está acessando: <strong className="text-indigo-600">{ebookTitle}</strong>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm sm:rounded-3xl sm:px-10 border border-zinc-200">
                    <form className="space-y-6" onSubmit={handleLogin}>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start gap-3">
                                <Lock className="w-5 h-5 shrink-0" />
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                                Endereço de Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 border border-zinc-300 rounded-xl shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-zinc-50 focus:bg-white transition-colors"
                                    placeholder="voce@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                                Sua Senha
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 border border-zinc-300 rounded-xl shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-zinc-50 focus:bg-white transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Acessando...
                                    </>
                                ) : (
                                    'Abrir Meu Ebook'
                                )}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

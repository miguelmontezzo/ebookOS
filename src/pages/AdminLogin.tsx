import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { BookOpen, Shield, Loader2 } from 'lucide-react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        setIsSubmitting(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else {
                navigate('/admin/dashboard'); // Vai para o painel de Admin
            }
        } catch (err: any) {
            setError('Ocorreu um erro na conexão. Verifique sua internet.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-emerald-500/20 shadow-xl">
                        <BookOpen className="w-8 h-8 text-zinc-900" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-black tracking-tight text-white">
                    Ebook <span className="text-emerald-500">Interativo</span>
                </h2>
                <p className="mt-2 text-center text-sm text-zinc-400">
                    Acesse seu painel administrativo
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-zinc-800/50 py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-zinc-700/50 backdrop-blur-xl">
                    <form className="space-y-6" onSubmit={handleLogin}>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm flex items-start gap-3">
                                <Shield className="w-5 h-5 shrink-0 text-red-400" />
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                                Email do Produtor
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
                                    className="appearance-none block w-full px-3 py-3 border border-zinc-700/50 rounded-xl shadow-sm placeholder-zinc-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-zinc-900/50 text-white transition-colors"
                                    placeholder="admin@seusite.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                                Senha Administrativa
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
                                    className="appearance-none block w-full px-3 py-3 border border-zinc-700/50 rounded-xl shadow-sm placeholder-zinc-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-zinc-900/50 text-white transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-zinc-900 bg-emerald-500 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-emerald-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Autenticando...
                                    </>
                                ) : (
                                    'Acessar Painel'
                                )}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { generateEbookContent, GeneratedModule } from '../lib/gemini';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from '../contexts/AuthAdminContext';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2, ArrowLeft, BookOpen, Layers, Type, CheckCircle } from 'lucide-react';

export default function AIGenerator() {
    const { user } = useAdminAuth();
    const navigate = useNavigate();

    const [theme, setTheme] = useState('');
    const [audience, setAudience] = useState('');
    const [baseText, setBaseText] = useState('');

    // Status Trackers
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStep, setGenerationStep] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [generatedEbook, setGeneratedEbook] = useState<GeneratedModule[] | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsGenerating(true);
        setGenerationStep('A IA está lendo o contexto e escrevendo os módulos (Isso pode levar até 30 segundos)...');

        try {
            const result = await generateEbookContent(theme, audience, baseText);
            setGeneratedEbook(result);
            setGenerationStep('Conteúdo gerado com sucesso!');
        } catch (err: any) {
            setError(err.message || 'Erro ao comunicar com a IA.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSaveEbook = async () => {
        if (!generatedEbook || !user) return;
        setIsGenerating(true);
        setGenerationStep('Salvando Ebook no Banco de Dados...');
        setError(null);

        try {
            // 1. Convert theme to slug
            let slug = theme.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            if (!slug) slug = `ebook-ai-${Date.now()}`;
            // Add a random hash to prevent unique constrains
            slug = `${slug}-${Math.floor(Math.random() * 1000)}`;

            // 2. Insert the Ebook Catalog Item
            const { data: ebookData, error: ebookError } = await supabase.from('ebooks').insert([{
                owner_id: user.id,
                title: theme,
                slug: slug,
                description: `Ebook criado por Inteligência Artificial focado em ${audience}.`,
                theme_color: 'indigo'
            }]).select().single();

            if (ebookError) throw ebookError;

            // 3. Insert the JSON Markdown contents
            const { error: contentError } = await supabase.from('ebook_contents').insert([{
                ebook_id: ebookData.id,
                content_json: generatedEbook
            }]);

            if (contentError) throw contentError;

            // 4. Default rules (Drip of 0 days)
            const rules = generatedEbook.map(mod => ({
                ebook_id: ebookData.id,
                modulo_nome: mod.module_name,
                dias_liberacao: 0
            }));

            const { error: rulesError } = await supabase.from('modulos_regras').insert(rules);
            if (rulesError) throw rulesError;

            navigate('/admin/dashboard');

        } catch (err: any) {
            console.error("Save Error:", err);
            setError(err.message || 'Erro ao salvar o Ebook gerado.');
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-900 text-zinc-100 font-sans p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar para o Painel
                </button>

                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-indigo-500/20 p-3 rounded-2xl text-indigo-400">
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-white">AI Ebook Studio</h1>
                        <p className="text-zinc-400 mt-1">Transforme ideias ou rascunhos em um ebook interativo completo em segundos.</p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8">
                        {error}
                    </div>
                )}

                {!generatedEbook ? (
                    // 1. INPUT PHASE
                    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-3xl p-6 sm:p-8 shadow-xl">
                        <form onSubmit={handleGenerate} className="space-y-6">

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 mb-2">
                                        <BookOpen className="w-4 h-4 text-indigo-400" />
                                        Tema Principal
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={theme}
                                        onChange={e => setTheme(e.target.value)}
                                        placeholder="Ex: Como adestrar filhotes"
                                        className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 transition-shadow"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 mb-2">
                                        <Layers className="w-4 h-4 text-indigo-400" />
                                        Público Alvo
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={audience}
                                        onChange={e => setAudience(e.target.value)}
                                        placeholder="Ex: Pessoas sem experiência anterior"
                                        className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 transition-shadow"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 mb-2">
                                    <Type className="w-4 h-4 text-indigo-400" />
                                    Texto Base (Transcrição de vídeo, Rascunhos, PDF Colado - Opcional)
                                </label>
                                <p className="text-xs text-zinc-500 mb-3">
                                    Cole aqui o conteúdo bruto que você já tem (como o texto todo de um documento Word ou de um PDF). A Inteligência Artificial vai ler este material, organizá-lo, corrigi-lo e transformá-lo nos módulos didáticos. Se deixar em branco, ela criará um conteúdo totalmente do zero baseado apenas no seu Tema.
                                </p>
                                <textarea
                                    value={baseText}
                                    onChange={e => setBaseText(e.target.value)}
                                    placeholder="Comece digitando ou cole o seu documento aqui..."
                                    className="w-full h-48 sm:h-64 bg-zinc-900/50 border border-zinc-700 rounded-xl p-4 text-zinc-300 focus:ring-2 focus:ring-indigo-500 resize-none transition-shadow"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isGenerating}
                                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGenerating ? (
                                    <><Loader2 className="w-6 h-6 animate-spin" /> {generationStep}</>
                                ) : (
                                    <><Sparkles className="w-6 h-6" /> Construir Ebook com IA</>
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    // 2. PREVIEW PHASE
                    <div className="space-y-6">
                        <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-3xl p-6 sm:p-8 shadow-xl">
                            <h2 className="text-xl font-bold text-white mb-2">Pré-visualização da Estrutura</h2>
                            <p className="text-zinc-400 text-sm mb-6">Esta é a arquitetura que a IA gerou. Ela produziu o texto completo para todos estes capítulos em segundo plano.</p>

                            <div className="space-y-4">
                                {generatedEbook.map((mod, idx) => (
                                    <div key={idx} className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl p-4 sm:p-6 hover:border-indigo-500/30 transition-colors">
                                        <h3 className="font-black text-lg text-indigo-400 mb-4 flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-xs flex items-center justify-center text-indigo-300">
                                                {idx + 1}
                                            </div>
                                            {mod.module_name}
                                        </h3>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {mod.pages.map((page, pIdx) => (
                                                <div key={pIdx} className="bg-zinc-800 rounded-xl p-3 flex items-start gap-3 border border-zinc-700">
                                                    <BookOpen className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                                                    <span className="text-sm font-medium text-zinc-300">{page.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setGeneratedEbook(null)}
                                className="flex-1 px-6 py-4 rounded-xl font-bold bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 transition-colors"
                            >
                                Descartar e Tentar Novamente
                            </button>
                            <button
                                onClick={handleSaveEbook}
                                disabled={isGenerating}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black bg-emerald-500 text-zinc-900 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Salvando...</>
                                ) : (
                                    <><CheckCircle className="w-5 h-5" /> Publicar e Ir para Estante</>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

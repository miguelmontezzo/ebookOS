import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronLeft, Loader2, LogOut, Search, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { useStudentAuth } from '../contexts/AuthStudentContext';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { GeneratedModule } from '../lib/gemini';
import Logo from '../components/Logo';
import { CheckCircle2, Target, Zap, Activity, Dumbbell, Utensils, TrendingUp, Info, AlertTriangle, Lightbulb } from 'lucide-react';

// Interface helpers
interface FlatPage {
    index: number;
    moduleName: string;
    title: string;
    content: string;
    coverBgUrl?: string;
}

export default function DynamicEbookReader() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { studentUser, logoutStudent } = useStudentAuth();

    // Data States
    const [loading, setLoading] = useState(true);
    const [ebookData, setEbookData] = useState<any>(null);
    const [modules, setModules] = useState<GeneratedModule[]>([]);

    // UI States
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Flatten pages for easy navigation
    const [flatPages, setFlatPages] = useState<FlatPage[]>([]);

    useEffect(() => {
        async function fetchContent() {
            if (!slug) return;
            try {
                // 1. Get Ebook Catalog data
                const { data: ebook, error: ebookErr } = await supabase
                    .from('ebooks')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (ebookErr || !ebook) throw new Error("Ebook não encontrado.");
                setEbookData(ebook);

                // 2. Get the Dynamic JSON Content
                const { data: content, error: contentErr } = await supabase
                    .from('ebook_contents')
                    .select('content_json')
                    .eq('ebook_id', ebook.id)
                    .single();

                if (contentErr || !content) throw new Error("Conteúdo não encontrado para este Ebook.");

                const mods: GeneratedModule[] = content.content_json;
                setModules(mods);

                // Flatten to an array so we can do next/prev easily
                const flat: FlatPage[] = [];
                let i = 0;
                mods.forEach(mod => {
                    mod.pages.forEach(page => {
                        flat.push({
                            index: i,
                            moduleName: mod.module_name,
                            title: page.title,
                            content: page.content,
                            coverBgUrl: (page as any).cover_bg_url || undefined
                        });
                        i++;
                    });
                });
                setFlatPages(flat);
            } catch (err) {
                console.error("Erro ao carregar ebook:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchContent();
    }, [slug]);

    if (loading) {
        return <div className="min-h-screen bg-white flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-zinc-400" /></div>;
    }

    if (!ebookData || flatPages.length === 0) {
        return <div className="min-h-screen bg-white flex items-center justify-center flex-col gap-4 text-zinc-500">
            <BookOpen className="w-12 h-12 text-zinc-300" />
            <p>Nenhum conteúdo dinâmico encontrado para este ebook.</p>
        </div>;
    }

    const currentPage = flatPages[currentIndex];
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === flatPages.length - 1;

    // Filter Logic for Sidebar
    const filteredFlat = flatPages.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.moduleName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredModules = modules.map(m => {
        const matchingPages = m.pages.filter(p =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.module_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return { ...m, pages: matchingPages };
    }).filter(m => m.pages.length > 0);


    const next = () => !isLast && setCurrentIndex(c => c + 1);
    const prev = () => !isFirst && setCurrentIndex(c => c - 1);
    const themeColor = ebookData.theme_color || 'indigo';
    const primaryColor = `text-${themeColor}-600`;
    const bgColor = `bg-${themeColor}-50`;

    // Replace hardcoded 'indigo' in AI-generated HTML with the ebook's theme color
    const applyThemeColor = (html: string) => {
        if (themeColor === 'indigo') return html;
        return html.replaceAll('indigo', themeColor);
    };

    const getRenderedContent = () => {
        let html = applyThemeColor(currentPage.content);
        if (currentPage.coverBgUrl && currentPage.index === 0) {
            html = html.replace(
                'class="min-h-[70vh] flex flex-col items-center justify-center text-center bg-zinc-900 text-white rounded-3xl p-8 relative overflow-hidden"',
                `class="min-h-[70vh] flex flex-col items-center justify-center text-center bg-zinc-900 text-white rounded-3xl p-8 relative overflow-hidden" style="background-image:url('${currentPage.coverBgUrl}');background-size:cover;background-position:center;"`
            );
        }
        return html;
    };

    return (
        <div className="flex h-screen bg-zinc-50 font-sans selection:bg-zinc-200">
            {/* Sidebar Overlay (Mobile) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                md:static md:translate-x-0 md:border-r md:border-zinc-200 md:shadow-none
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-zinc-200 flex items-center justify-between sticky top-0 bg-white z-10">
                    <div>
                        <Logo variant="light" />
                        <h2 className="font-black text-lg tracking-tight text-zinc-900 line-clamp-2 mt-2">{ebookData.title}</h2>
                    </div>
                    <button
                        className="md:hidden p-2 -mr-2 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-colors"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 border-b border-zinc-200">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Buscar no Ebook..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full bg-zinc-100 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 transition-shadow"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {filteredModules.length === 0 ? (
                        <div className="text-center py-6 text-zinc-500 text-sm">Nenhum resultado encontrado.</div>
                    ) : (
                        filteredModules.map((mod, mIdx) => (
                            <div key={mIdx} className="mb-6">
                                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 px-2">
                                    {mod.module_name}
                                </h3>
                                <div className="space-y-1">
                                    {mod.pages.map((page, pIdx) => {
                                        // Find absolute index to navigate
                                        const absIndex = flatPages.findIndex(fp => fp.title === page.title && fp.moduleName === mod.module_name);
                                        const isActive = currentIndex === absIndex;

                                        return (
                                            <button
                                                key={pIdx}
                                                onClick={() => {
                                                    if (absIndex !== -1) setCurrentIndex(absIndex);
                                                    setIsSidebarOpen(false);
                                                }}
                                                className={`
                                                    w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3
                                                    ${isActive
                                                        ? `${bgColor} ${primaryColor}`
                                                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                                                    }
                                                `}
                                            >
                                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? `bg-${ebookData.theme_color || 'indigo'}-600` : 'bg-transparent'}`} />
                                                <span className="truncate">{page.title}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 border-t border-zinc-200">
                    <button
                        onClick={logoutStudent}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold text-zinc-600 bg-zinc-100 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sair do Ebook
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header - Always fixed on top */}
                <header className="bg-white border-b border-zinc-200 h-14 md:h-16 flex items-center justify-between px-3 md:px-8 shrink-0 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden p-2 -ml-2 text-zinc-600 hover:bg-zinc-100 rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="hidden md:block text-sm font-medium text-zinc-500">
                            {currentPage.moduleName} <span className="mx-2 text-zinc-300">/</span> <span className="text-zinc-900">{currentPage.title}</span>
                        </div>
                        <div className="md:hidden text-sm font-bold text-zinc-900 truncate max-w-[150px] sm:max-w-[200px]">
                            {currentPage.title}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-block text-sm font-medium text-zinc-500 mr-2 sm:mr-4">
                            Página {currentIndex + 1} de {flatPages.length}
                        </span>
                        <span className="sm:hidden text-xs font-medium text-zinc-500 mr-2">
                            {currentIndex + 1}/{flatPages.length}
                        </span>
                        <button
                            onClick={prev}
                            disabled={isFirst}
                            className="p-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={next}
                            disabled={isLast}
                            className="p-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-white px-0 md:px-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="min-h-full pb-20 md:pb-32"
                        >
                            <article className={`max-w-3xl md:mx-auto mt-4 md:mt-16 px-4 md:px-6 prose prose-sm md:prose-base prose-zinc prose-h1:font-black prose-h1:text-2xl md:prose-h1:text-4xl prose-h2:font-bold prose-h2:text-xl md:prose-h2:text-2xl prose-h3:text-lg md:prose-h3:text-xl prose-p:text-zinc-600 prose-p:leading-relaxed prose-a:text-${ebookData.theme_color || 'indigo'}-600 hover:prose-a:text-${ebookData.theme_color || 'indigo'}-700 prose-blockquote:border-${ebookData.theme_color || 'indigo'}-200 prose-blockquote:bg-${ebookData.theme_color || 'indigo'}-50/50 prose-blockquote:text-${ebookData.theme_color || 'indigo'}-900 prose-blockquote:font-medium prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-li:text-zinc-600 [&_.min-h-\[70vh\]]:min-h-[50vh] [&_.min-h-\[70vh\]]:md:min-h-[70vh] [&_.min-h-\[80vh\]]:min-h-[50vh] [&_.min-h-\[80vh\]]:md:min-h-[80vh] [&_.text-5xl]:text-3xl [&_.text-5xl]:md:text-5xl [&_.text-7xl]:text-4xl [&_.text-7xl]:md:text-7xl [&_.grid]:gap-3 [&_.grid]:md:gap-6 [&_table]:text-xs [&_table]:md:text-sm`}>
                                <h1>{currentPage.title}</h1>

                                <div className="mt-8 text-lg">
                                    <ReactMarkdown
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            'check-icon': () => <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 inline-block mr-2" />,
                                            'target-icon': () => <Target className="w-5 h-5 text-emerald-500 shrink-0 inline-block mr-2" />,
                                            'zap-icon': () => <Zap className="w-5 h-5 text-emerald-400 shrink-0 inline-block mr-2" />,
                                            'info-icon': () => <Info className="w-5 h-5 text-indigo-500 shrink-0 inline-block mr-2" />,
                                            'alert-icon': () => <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 inline-block mr-2" />,
                                            'bulb-icon': () => <Lightbulb className="w-5 h-5 text-yellow-500 shrink-0 inline-block mr-2" />,
                                        } as any}
                                    >
                                        {getRenderedContent()}
                                    </ReactMarkdown>
                                </div>
                            </article>
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}

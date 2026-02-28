import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, ChevronLeft, BookOpen, Dumbbell, Utensils, TrendingUp, Activity, Lock, Loader2, LogOut, Search } from 'lucide-react';
import { Capa, Introducao, Diagnostico, Evolucao } from './Modulo1';
import { Aquecimento } from './Modulo2';
import { Treinos, AcademiaCheia } from './Modulo3';
import { Macros, Cardapios } from './Modulo4';
import { Progressao, FAQ, DicasFinais } from './Modulo5';
import { motion, AnimatePresence } from 'motion/react';
import { useStudentAuth } from '../contexts/AuthStudentContext';
import { supabase } from '../lib/supabase';
import { useParams } from 'react-router-dom';

const PAGES = [
  { id: 1, title: 'Capa', component: Capa, module: 'Módulo 1: O Início', icon: BookOpen },
  { id: 2, title: 'Introdução', component: Introducao, module: 'Módulo 1: O Início', icon: BookOpen },
  { id: 3, title: 'Diagnóstico de Nível', component: Diagnostico, module: 'Módulo 1: O Início', icon: BookOpen },
  { id: 4, title: 'Evolução', component: Evolucao, module: 'Módulo 1: O Início', icon: BookOpen },
  { id: 5, title: 'Aquecimento & Dia 7', component: Aquecimento, module: 'Módulo 2: Preparação', icon: Activity },
  { id: 6, title: 'Treinos', component: Treinos, module: 'Módulo 3: O Método', icon: Dumbbell },
  { id: 12, title: 'Academia Cheia', component: AcademiaCheia, module: 'Módulo 3: O Método', icon: Dumbbell },
  { id: 13, title: 'Macros', component: Macros, module: 'Módulo 4: Nutrição', icon: Utensils },
  { id: 14, title: 'Cardápios', component: Cardapios, module: 'Módulo 4: Nutrição', icon: Utensils },
  { id: 15, title: 'Progressão', component: Progressao, module: 'Módulo 5: Ajustes Finais', icon: TrendingUp },
  { id: 16, title: 'FAQ', component: FAQ, module: 'Módulo 5: Ajustes Finais', icon: TrendingUp },
  { id: 17, title: 'Dicas Finais', component: DicasFinais, module: 'Módulo 5: Ajustes Finais', icon: TrendingUp },
];

interface ModuloRegra {
  modulo_nome: string;
  dias_liberacao: number;
}

export default function App() {
  const { studentUser, logoutStudent } = useStudentAuth();
  const { slug } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [regras, setRegras] = useState<ModuloRegra[]>([]);
  const [loadingRegras, setLoadingRegras] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fallback to "o-metodo" if on root slug mapping just to be safe with this fixed layout
  const currentSlug = slug || 'o-metodo';

  useEffect(() => {
    async function fetchRegras() {
      try {
        const { data, error } = await supabase
          .from('modulos_regras')
          .select('modulo_nome, dias_liberacao')
          .eq('ebook_id', studentUser?.ebook_id);

        if (data && !error) {
          setRegras(data);
        }
      } catch (err) {
        console.error("Failed to load rules", err);
      } finally {
        setLoadingRegras(false);
      }
    }
    fetchRegras();
  }, [currentSlug]);

  const CurrentComponent = PAGES[currentIndex].component;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === PAGES.length - 1;

  // Calculando dias passados
  const hoje = new Date();
  const dataCompra = studentUser?.data_compra ? new Date(studentUser.data_compra) : new Date();
  const diasPassados = Math.floor((hoje.getTime() - dataCompra.getTime()) / (1000 * 3600 * 24));

  const getDiasRestantes = (moduleName: string) => {
    const regra = regras.find(r => r.modulo_nome === moduleName);
    if (!regra) return 0; // Se não tem regra, é imediato.

    const restante = regra.dias_liberacao - diasPassados;
    return restante > 0 ? restante : 0;
  };

  const next = () => {
    if (!isLast) {
      const nextModule = PAGES[currentIndex + 1].module;
      if (getDiasRestantes(nextModule) === 0) setCurrentIndex(c => c + 1);
    }
  };
  const prev = () => !isFirst && setCurrentIndex(c => c - 1);

  const filteredPages = PAGES.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group filtered pages by module
  const modules = filteredPages.reduce((acc, page) => {
    // We will need the original index to navigate properly, so let's find it.
    const originalIndex = PAGES.findIndex(p => p.id === page.id);
    if (!acc[page.module]) acc[page.module] = [];
    acc[page.module].push({ ...page, index: originalIndex });
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="min-h-screen bg-zinc-100 flex font-sans text-zinc-900">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-zinc-200 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-1">Ebook Interativo</div>
            <h2 className="font-black text-xl tracking-tight">MAPA DO PRODUTO</h2>
          </div>
          <button className="md:hidden text-zinc-500" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
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
              className="w-full bg-zinc-100 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 transition-shadow"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loadingRegras ? (
            <div className="flex justify-center p-4"><Loader2 className="w-6 h-6 animate-spin text-zinc-400" /></div>
          ) : (
            Object.entries(modules).map(([moduleName, pages]) => {
              const diasRestantes = getDiasRestantes(moduleName);
              const isBlocked = diasRestantes > 0;

              return (
                <div key={moduleName} className="mb-6">
                  <div className="flex flex-wrap justify-between items-center mb-3 px-2 gap-2">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{moduleName}</h3>
                    {isBlocked && (
                      <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" /> {diasRestantes} {diasRestantes === 1 ? 'dia' : 'dias'}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    {pages.map((page) => {
                      const Icon = page.icon;
                      const isActive = currentIndex === page.index;
                      return (
                        <button
                          key={page.id}
                          disabled={isBlocked}
                          onClick={() => {
                            if (!isBlocked) {
                              setCurrentIndex(page.index);
                              setIsSidebarOpen(false);
                            }
                          }}
                          className={`
                            w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left
                            ${isActive
                              ? 'bg-emerald-50 text-emerald-700'
                              : isBlocked
                                ? 'text-zinc-300 cursor-not-allowed hidden'
                                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}
                          `}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-500' : 'text-zinc-400'}`} />
                          {page.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
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
        {/* Header */}
        <header className="bg-white border-b border-zinc-200 h-16 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 -ml-2 text-zinc-600 hover:bg-zinc-100 rounded-lg"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:block text-sm font-medium text-zinc-500">
              {PAGES[currentIndex].module} <span className="mx-2 text-zinc-300">/</span> <span className="text-zinc-900">{PAGES[currentIndex].title}</span>
            </div>
            <div className="md:hidden text-sm font-bold text-zinc-900 truncate max-w-[150px] sm:max-w-[200px]">
              {PAGES[currentIndex].title}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-sm font-medium text-zinc-500 mr-2 sm:mr-4">
              Página {currentIndex + 1} de {PAGES.length}
            </span>
            <span className="sm:hidden text-xs font-medium text-zinc-500 mr-2">
              {currentIndex + 1}/{PAGES.length}
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
              disabled={isLast || getDiasRestantes(PAGES[currentIndex + 1]?.module) > 0}
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
              className="min-h-full pb-24"
            >
              <CurrentComponent />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

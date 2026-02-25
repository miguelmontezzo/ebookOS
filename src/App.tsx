import { useState } from 'react';
import { Menu, X, ChevronRight, ChevronLeft, BookOpen, Dumbbell, Utensils, TrendingUp, Activity } from 'lucide-react';
import { Capa, Introducao, Diagnostico, Evolucao } from './pages/Modulo1';
import { Aquecimento } from './pages/Modulo2';
import { Treinos, AcademiaCheia } from './pages/Modulo3';
import { Macros, Cardapios } from './pages/Modulo4';
import { Progressao, FAQ, DicasFinais } from './pages/Modulo5';
import { motion, AnimatePresence } from 'motion/react';

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

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const CurrentComponent = PAGES[currentIndex].component;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === PAGES.length - 1;

  const next = () => !isLast && setCurrentIndex(c => c + 1);
  const prev = () => !isFirst && setCurrentIndex(c => c - 1);

  // Group pages by module
  const modules = PAGES.reduce((acc, page, index) => {
    if (!acc[page.module]) acc[page.module] = [];
    acc[page.module].push({ ...page, index });
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
        
        <div className="flex-1 overflow-y-auto p-4">
          {Object.entries(modules).map(([moduleName, pages]) => (
            <div key={moduleName} className="mb-6">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 px-2">{moduleName}</h3>
              <div className="space-y-1">
                {pages.map((page) => {
                  const Icon = page.icon;
                  const isActive = currentIndex === page.index;
                  return (
                    <button
                      key={page.id}
                      onClick={() => {
                        setCurrentIndex(page.index);
                        setIsSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left
                        ${isActive 
                          ? 'bg-emerald-50 text-emerald-700' 
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
          ))}
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
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-zinc-500 mr-4">
              Página {currentIndex + 1} de {PAGES.length}
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
              className="p-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-white">
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

import { PageLayout } from '../components/PageLayout';
import { Target, AlertTriangle, Lightbulb } from 'lucide-react';

export function Intro() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center bg-zinc-900 text-white rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-zinc-900 to-zinc-900"></div>
            <div className="z-10 space-y-6 max-w-3xl">
                <div className="inline-block bg-indigo-500 text-white font-black px-4 py-1 rounded-full text-sm tracking-widest uppercase mb-4">
                    ANTI COPY CLUB
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                    MÉTODO EMP<br />
                    <span className="text-indigo-400">NA PRÁTICA.</span>
                </h1>
                <p className="text-xl md:text-2xl text-zinc-300 font-light max-w-2xl mx-auto mt-6">
                    Roteiros que Viralizam. <strong className="text-white font-bold">Estrutura que converte.</strong>
                </p>
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    <span className="bg-zinc-800 px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 flex items-center gap-2">
                        <Target className="w-4 h-4 text-indigo-400" /> Gancho Magnético
                    </span>
                    <span className="bg-zinc-800 px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-indigo-400" /> Conflito que Prende
                    </span>
                    <span className="bg-zinc-800 px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-indigo-400" /> Resolução e Ação
                    </span>
                </div>
            </div>
        </div>
    );
}

export function Fundamentos() {
    return (
        <PageLayout title="PÁGINA 2 — Por Que Roteiros Precisam De Estrutura?" objective="Entender que viralização é uma ciência estruturada, não sorte.">
            <div className="space-y-6">
                <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl">
                    <h3 className="font-bold text-xl mb-3 text-zinc-900 flex items-center gap-2">
                        <Target className="w-5 h-5 text-indigo-600" />
                        E (Estado Atual)
                    </h3>
                    <p className="text-zinc-700">Você produz conteúdo, posta nas redes sociais, mas a maioria dos roteiros não engaja, não gera comentários e desaparece no feed em minutos.</p>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl">
                    <h3 className="font-bold text-xl mb-3 text-orange-900 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        Mas (Conflito)
                    </h3>
                    <p className="text-orange-800">Muitas pessoas criam conteúdo sem entender que <strong>viralização é uma ciência estruturada</strong>, não sorte. Roteiros viralizam porque têm <strong>gancho magnético</strong>, <strong>conflito que prende</strong>, <strong>resolução que surpreende</strong>.</p>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-2xl">
                    <h3 className="font-bold text-xl mb-3 text-indigo-900 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-indigo-600" />
                        Por Isso (Solução)
                    </h3>
                    <p className="text-indigo-800">Este ebook te ensina a estruturar roteiros com a lógica EMP da Anti Copy Club — a mesma metodologia que transforma marcas invisíveis em autoridade viral.</p>
                </div>
            </div>
        </PageLayout>
    );
}

export function Capitulo1() {
    return (
        <PageLayout title="CAPÍTULO 1 — Entendendo a Estrutura" objective="Aprender o que compõe o mapa narrativo de um vídeo de sucesso.">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">O que é um roteiro estruturado?</h3>
            <p className="text-lg text-zinc-700 mb-6">
                Roteiro estruturado não é apenas o que você fala. É o <strong>mapa narrativo</strong> que determina:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                        <strong>1</strong>
                    </div>
                    <p className="font-medium text-zinc-800"><strong>Quantos segundos</strong> até o gancho</p>
                </div>
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                        <strong>2</strong>
                    </div>
                    <p className="font-medium text-zinc-800"><strong>Qual virada</strong> cria curiosidade</p>
                </div>
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                        <strong>3</strong>
                    </div>
                    <p className="font-medium text-zinc-800"><strong>Como a resolução</strong> gera ação (like/share)</p>
                </div>
            </div>

            <div className="bg-zinc-900 text-white p-8 rounded-2xl text-center">
                <h4 className="text-indigo-400 font-bold uppercase tracking-widest text-sm mb-4">A Fórmula Básica</h4>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xl md:text-2xl font-black">
                    <span className="bg-zinc-800 px-6 py-3 rounded-xl border border-zinc-700">E <span className="text-sm block font-normal text-zinc-400 mt-1">(Gancho)</span></span>
                    <span className="text-zinc-500">→</span>
                    <span className="bg-zinc-800 px-6 py-3 rounded-xl border border-zinc-700">MAS <span className="text-sm block font-normal text-zinc-400 mt-1">(Conflito/Virada)</span></span>
                    <span className="text-zinc-500">→</span>
                    <span className="bg-zinc-800 px-6 py-3 rounded-xl border border-zinc-700">POR ISSO <span className="text-sm block font-normal text-zinc-400 mt-1">(Resolução/CTA)</span></span>
                </div>
                <p className="mt-6 text-zinc-400">Cada elemento tem um tempo, um propósito e um resultado específico.</p>
            </div>
        </PageLayout>
    );
}

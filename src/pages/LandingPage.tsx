import React from 'react';
import { BookOpen, Sparkles, TrendingUp, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-200">
            {/* Nav */}
            <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-2 rounded-xl text-white">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <span className="font-black text-xl tracking-tight text-slate-900">Ebook Interativo</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/admin/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                            Área do Produtor
                        </Link>
                        <a href="#planos" className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                            Começar Agora
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-slate-50 -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
                            <Sparkles className="w-4 h-4" /> A revolução da leitura digital
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
                            Transforme seus ebooks chatos em uma <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">experiência imersiva.</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Chega de PDFs sem graça. Crie ambientes de leitura interativos, com proteção antipirataria e módulos liberados por dia. Aumente drásticamente a retenção e as vendas do seu infoproduto.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="#demo" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 transition-all">
                                Criar Meu Primeiro Ebook
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <a href="#features" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                                Ver Funcionalidades
                            </a>
                        </div>
                    </div>

                    {/* App Preview Mockup */}
                    <div className="mt-16 mx-auto max-w-5xl relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10 bottom-0 top-1/2 pointer-events-none" />
                        <div className="bg-white rounded-t-3xl border border-slate-200 shadow-2xl overflow-hidden aspect-video relative flex items-center justify-center bg-zinc-900">
                            <div className="text-center">
                                <BookOpen className="w-16 h-16 text-indigo-500 mx-auto mb-4 opacity-50" />
                                <p className="text-zinc-400 font-medium">Pré-visualização do Painel do Produtor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-4">Feito para Produtores de Alto Nível</h2>
                        <p className="text-lg text-slate-600">Entregue uma experiência premium que justifica o valor do seu conteúdo e impede que ele seja compartilhado facilmente.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                            <div className="w-12 h-12 bg-indigo-600/10 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Leitura Responsiva (App-like)</h3>
                            <p className="text-slate-600">O layout se adapta como um aplicativo nativo no celular do seu aluno, tornando a leitura muito mais agradável que um PDF com zoom.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                            <div className="w-12 h-12 bg-indigo-600/10 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Drip Content</h3>
                            <p className="text-slate-600">Não entregue tudo de uma vez. Defina dias específicos para a liberação de cada capítulo, mantendo o aluno engajado por mais tempo.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                            <div className="w-12 h-12 bg-indigo-600/10 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Aumente o Valor Percebido</h3>
                            <p className="text-slate-600">Seu conhecimento envelopado em uma plataforma própria ao invés de um arquivo solto aumenta drasticamente a percepção de valor na hora da venda.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Final */}
            <section className="py-24 bg-indigo-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-6">
                        Pronto para transformar a entrega dos seus conteúdos?
                    </h2>
                    <p className="text-lg text-indigo-100 mb-10">
                        Pare de perder dinheiro com PDFs pirateados e comece a encantar seus alunos hoje mesmo.
                    </p>
                    <Link to="/admin/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-indigo-600 bg-white rounded-xl hover:bg-slate-50 hover:shadow-xl transition-all">
                        Acessar Área do Produtor <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-slate-900 text-center text-slate-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Ebook Interativo. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

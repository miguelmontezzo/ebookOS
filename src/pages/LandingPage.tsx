import React, { useState } from 'react';
import { BookOpen, Sparkles, TrendingUp, Smartphone, ArrowRight, CheckCircle2, Search, ArrowDown, ChevronDown, Lock, Shield, Zap, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    const [openFeature, setOpenFeature] = useState<number | null>(0);

    return (
        <div className="min-h-screen bg-[#020617] font-sans text-slate-100 selection:bg-indigo-500/30">
            {/* Header */}
            <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                        <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm tracking-wide text-white">Ebook Interativo</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/admin/login" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">
                        Área do Produtor
                    </Link>
                    <a href="#planos" className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-full transition-all">
                        Comece Agora
                    </a>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
                {/* Background effects */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/30 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-8 leading-[1.1]">
                        Ebook Interativo — o <em className="text-indigo-400 font-serif italic">Futuro</em><br />
                        dos infoprodutos <em className="text-blue-400 font-serif italic">digitais</em> está aqui
                    </h1>

                    {/* Fake Search Input */}
                    <div className="max-w-xl mx-auto mt-12 mb-16">
                        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full p-2 backdrop-blur-md focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
                            <Search className="w-5 h-5 text-slate-400 ml-3" />
                            <input
                                type="text"
                                placeholder="Gerar e-book sobre inteligência artificial..."
                                className="w-full bg-transparent border-none text-slate-200 text-sm px-4 focus:ring-0 placeholder:text-slate-500"
                                readOnly
                            />
                            <button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full p-2 transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <p className="text-slate-400 text-sm md:text-base mb-8 max-w-2xl mx-auto">
                        Pare de vender PDFs comuns. Entregue uma experiência premium, interativa e protegida contra pirataria.
                    </p>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                    <span className="text-xs text-slate-500 uppercase tracking-widest">Descubra</span>
                    <ArrowDown className="w-4 h-4 text-slate-500 animate-bounce" />
                </div>
            </section>

            {/* Middle wavy divider (simulated with gradient) */}
            <div className="w-full h-48 bg-gradient-to-b from-transparent via-[#0f172a] to-[#020617] pointer-events-none" />

            {/* Sumary / Accordions */}
            <section className="py-24 relative z-10 border-t border-white/5 bg-[#0f172a]/50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <span className="text-xs font-mono text-indigo-400 tracking-wider uppercase mb-4 block">A Revolução</span>
                            <h2 className="text-3xl lg:text-4xl font-medium text-white mb-6 leading-tight">
                                Por que evoluir<br />
                                para o formato <em className="text-indigo-400 font-serif italic">interativo</em>
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                O mercado de infoprodutos mudou. Seus alunos esperam a mesma qualidade de uso dos maiores aplicativos do mundo. Nossa plataforma converte seu conteúdo em uma experiência que justifica altos tickets.
                            </p>
                            <Link to="/admin/login" className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                                Ver demonstração <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {[
                                { title: 'Leitura Responsiva (App-like)', desc: 'Layout perfeito em qualquer tela celular, texto que se adapta sem precisar de zoom, superando o antigo PDF.' },
                                { title: 'Drip Content Nativo', desc: 'Libere módulos e capítulos baseado em dias. Aumente o mistério e combata pedidos de reembolso mantendo o aluno engajado.' },
                                { title: 'Proteção Antipirataria', desc: 'Sistema com marcação de leitura, visualização por sessão ativa e dados do aluno, impossibilitando venda paralela sem risco.' }
                            ].map((item, idx) => (
                                <div key={idx} className="border-b border-white/10">
                                    <button
                                        className="w-full flex items-center justify-between py-5 text-left text-lg font-medium text-white hover:text-indigo-300 transition-colors"
                                        onClick={() => setOpenFeature(openFeature === idx ? null : idx)}
                                    >
                                        {item.title}
                                        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openFeature === idx ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${openFeature === idx ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4 Grid Features */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl lg:text-4xl font-medium text-white mb-16">
                        O que torna o Ebook Interativo <em className="text-indigo-400 font-serif italic">imparável</em>
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Velocidade de Carga', desc: 'Infraestrutura distribuída garante acesso instantâneo aos capítulos.', icon: Zap },
                            { title: 'IA Integrada', desc: 'Crie ou expanda dezenas de páginas com nosso modelo LLM proprietário.', icon: Sparkles },
                            { title: 'Zero Complicação', desc: 'Não exige código ou design complexo. O Markdown cuida de tudo.', icon: BookOpen },
                            { title: 'Controle Total', desc: 'Bana usuários maliciosos e acompanhe métricas de leitura com 1 clique.', icon: Shield }
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                                <item.icon className="w-6 h-6 text-indigo-400 mb-4" />
                                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Performance Bars */}
            <section className="py-24 bg-[#0a0a1a] border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <h2 className="text-3xl lg:text-4xl font-medium text-white mb-16 max-w-xl">
                        A mais alta <em className="text-indigo-400 font-serif italic">performance</em> nos indicadores do seu negócio
                    </h2>

                    <div className="space-y-12 max-w-4xl">
                        {/* Bar 1 */}
                        <div>
                            <div className="flex justify-between text-xs text-slate-400 font-medium mb-3 uppercase tracking-wider">
                                <span>Retenção de Leitura Média</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-24 text-xs font-bold text-white">Nosso App</div>
                                    <div className="flex-1">
                                        <div className="h-2.5 bg-indigo-500 rounded-r-full flex" style={{ width: '92%' }} />
                                    </div>
                                    <div className="w-12 text-xs text-slate-400 text-right">92%</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 text-xs text-slate-500">Kiwify/Hotmart</div>
                                    <div className="flex-1">
                                        <div className="h-2.5 bg-slate-800 rounded-r-full flex" style={{ width: '56%' }} />
                                    </div>
                                    <div className="w-12 text-xs text-slate-500 text-right">56%</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 text-xs text-slate-500">PDF Solto</div>
                                    <div className="flex-1">
                                        <div className="h-2.5 bg-slate-800 rounded-r-full flex" style={{ width: '41%' }} />
                                    </div>
                                    <div className="w-12 text-xs text-slate-500 text-right">41%</div>
                                </div>
                            </div>
                        </div>

                        {/* Bar 2 */}
                        <div>
                            <div className="flex justify-between text-xs text-slate-400 font-medium mb-3 uppercase tracking-wider">
                                <span>Valor Percebido (Ticket Final)</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-24 text-xs font-bold text-white">Nosso App</div>
                                    <div className="flex-1">
                                        <div className="h-2.5 bg-indigo-500 rounded-r-full flex" style={{ width: '100%' }} />
                                    </div>
                                    <div className="w-12 text-xs text-slate-400 text-right">3x</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 text-xs text-slate-500">Outros Formatos</div>
                                    <div className="flex-1">
                                        <div className="h-2.5 bg-slate-800 rounded-r-full flex" style={{ width: '33%' }} />
                                    </div>
                                    <div className="w-12 text-xs text-slate-500 text-right">1x</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Cards */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl lg:text-4xl font-medium text-white mb-16">
                        Ferramentas para todo <em className="text-indigo-400 font-serif italic">inovador</em>
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'Admin Flow', tag: 'DASHBOARD', img: 'bg-gradient-to-br from-indigo-900 via-slate-900 to-[#020617]' },
                            { name: 'Geração Cópia IA', tag: 'ASSISTANT', img: 'bg-gradient-to-tr from-blue-900 via-indigo-900 to-[#020617]' },
                            { name: 'Edição Markdown', tag: 'NATIVE', img: 'bg-gradient-to-bl from-slate-800 via-slate-900 to-[#020617]' },
                            { name: 'Lock de Segurança', tag: 'SECURITY', img: 'bg-gradient-to-tl from-indigo-800 via-slate-900 to-[#020617]' }
                        ].map((card, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className={`aspect-[4/5] rounded-2xl ${card.img} border border-white/10 mb-4 p-6 relative overflow-hidden transition-transform duration-500 group-hover:-translate-y-2`}>
                                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold tracking-wider">{card.tag}</div>
                                    {/* Abstract shapes simulated */}
                                    <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                                    <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-white/10 blur-[40px] rounded-full" />
                                </div>
                                <h3 className="font-medium text-sm text-white">{card.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-32 bg-[#020617] relative overflow-hidden border-t border-white/5">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[300px] bg-indigo-600/20 blur-[150px] rounded-t-full pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
                    <h2 className="text-3xl lg:text-5xl font-medium text-white mb-6">
                        Junte-se à <em className="text-indigo-400 font-serif italic">revolução</em>
                    </h2>
                    <p className="text-slate-400 mb-10 max-w-xl text-sm md:text-base">
                        O mercado de produtos digitais vai recompensar aqueles que trouxerem diferenciação. Comece agora.
                    </p>
                    <Link to="/admin/login" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                        ACESSE O PAINEL <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-[#020617] border-t border-white/5 text-xs text-slate-500">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-8">
                        <Link to="#" className="hover:text-slate-300">Privacidade</Link>
                        <Link to="#" className="hover:text-slate-300">Termos</Link>
                        <Link to="#" className="hover:text-slate-300">Suporte</Link>
                    </div>
                    <div className="flex gap-4">
                        <span>&copy; {new Date().getFullYear()} Ebook Interativo.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

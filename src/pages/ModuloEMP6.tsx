import { PageLayout } from '../components/PageLayout';
import { ShieldAlert, XCircle, TrendingUp, BarChart, ArrowRight } from 'lucide-react';

export function ErrosComuns() {
    return (
        <PageLayout title="CAPÍTULOS 8 E 9 — Erros Comuns & Casos" objective="Entender como NÃO cometer erros e ver a aplicação em clientes reais.">
            <div className="bg-red-50 border border-red-200 p-6 rounded-2xl mb-8">
                <h3 className="font-bold text-xl mb-3 text-red-900 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-red-600" />
                    Os 5 maiores erros de quem não viraliza
                </h3>
                <p className="text-red-800">Todo dia, dezenas de criadores cometem os mesmos erros de ritmo, CTA invisível ou gancho fraco. Veja como resolver.</p>
            </div>

            <div className="space-y-6">
                {/* Error 1 & 2 */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-red-400 transition-colors">
                        <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2 mb-2">
                            <XCircle className="w-5 h-5 text-red-500" />
                            1. Gancho Fraco
                        </h4>
                        <p className="text-zinc-600 text-sm mb-3">O que: "Olá pessoal, hoje vou falar..."<br />Erro: Em 3s, o usuário já scrollou.</p>
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-xs font-mono text-green-800 mt-2">
                            <strong>Como Consertar:</strong> "Você tá perdendo 80% do potencial de viralização por um motivo específico."
                        </div>
                    </div>

                    <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-red-400 transition-colors">
                        <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2 mb-2">
                            <XCircle className="w-5 h-5 text-red-500" />
                            2. Conflito Perdido
                        </h4>
                        <p className="text-zinc-600 text-sm mb-3">O que: Gancho forte, mas desenvolvimento some.<br />Erro: A pessoa entra e se desaponta.</p>
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-xs font-mono text-green-800 mt-2">
                            <strong>Como Consertar:</strong> Cada 10 segundos equivale a 1 ideia nova para prender.
                        </div>
                    </div>
                </div>

                {/* Error 3, 4, 5 List style */}
                <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl shadow-sm">
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <div className="bg-zinc-200 p-2 rounded-lg text-red-600 h-fit"><XCircle className="w-5 h-5" /></div>
                            <div>
                                <h4 className="font-bold text-zinc-900">3. Resolução Vaga</h4>
                                <p className="text-zinc-600 text-sm">"Então é isso. Abraços." Pessoa não sabe o que fazer com a aula.</p>
                                <p className="text-green-700 text-xs font-mono mt-1">Conserto: "É E+Mas+Por Isso. Salva o post e manda pro sócio."</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="bg-zinc-200 p-2 rounded-lg text-red-600 h-fit"><XCircle className="w-5 h-5" /></div>
                            <div>
                                <h4 className="font-bold text-zinc-900">4. CTA Invisível</h4>
                                <p className="text-zinc-600 text-sm">"Deixa seu like se gostou." Muito genérico.</p>
                                <p className="text-green-700 text-xs font-mono mt-1">Conserto: Peça ação definida do projeto ("Qual dos 3 passos testará?").</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="bg-zinc-200 p-2 rounded-lg text-red-600 h-fit"><XCircle className="w-5 h-5" /></div>
                            <div>
                                <h4 className="font-bold text-zinc-900">5. Ritmo Desconexo</h4>
                                <p className="text-zinc-600 text-sm">Você fala rápido demais ou edição lenta não reflete o roteiro.</p>
                                <p className="text-green-700 text-xs font-mono mt-1">Conserto: A edição deve acompanhar o texto. E (3s) → MAS (10s) → POR ISSO (10s).</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-indigo-500" /> Casos Reais na Prática
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-indigo-900 text-white p-6 rounded-2xl border border-indigo-700 shadow-xl">
                        <h4 className="font-bold text-lg mb-4 text-indigo-300 flex items-center gap-2">
                            SaaS de Marketing <ArrowRight className="w-4 h-4 ml-auto" /> 15k a 120k
                        </h4>
                        <div className="space-y-4">
                            <div className="flex gap-3 items-center">
                                <BarChart className="w-8 h-8 text-indigo-500" />
                                <div>
                                    <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">O Problema Anterior</p>
                                    <p className="text-sm">Conteúdo técnico de devs, 50 a 200 views. Sem estrutura.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center pt-2 border-t border-indigo-800">
                                <TrendingUp className="w-8 h-8 text-emerald-400" />
                                <div>
                                    <p className="text-xs text-emerald-500 font-bold uppercase tracking-wider">A Solução EMP</p>
                                    <p className="text-sm">Usou dor ("Você tem boa ferramenta mas não escala"). Mudou a linguagem pra ser acessível + CTA focado.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-indigo-800 font-mono text-xs text-indigo-200 italic">
                            Resultado: 200% followers up, Leads x5, e zero gastos diretos.
                        </div>
                    </div>

                    <div className="bg-zinc-900 text-white p-6 rounded-2xl border border-zinc-700 shadow-xl">
                        <h4 className="font-bold text-lg mb-4 text-zinc-300 flex items-center gap-2">
                            Coach de Vida <ArrowRight className="w-4 h-4 ml-auto" /> 0 a 35k
                        </h4>
                        <div className="space-y-4">
                            <div className="flex gap-3 items-center">
                                <BarChart className="w-8 h-8 text-zinc-500" />
                                <div>
                                    <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">O Problema Anterior</p>
                                    <p className="text-sm">Todo dia, 20 visualizações. Ninguém conhecia a marca.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center pt-2 border-t border-zinc-800">
                                <TrendingUp className="w-8 h-8 text-emerald-400" />
                                <div>
                                    <p className="text-xs text-emerald-500 font-bold uppercase tracking-wider">A Solução EMP</p>
                                    <p className="text-sm">Dúvida ("Perdi R$120 mil por isso... Oportunidade... Trabalhe menos"). Manteve as promessas em blocos (E/Mas/Por).</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-zinc-800 font-mono text-xs text-zinc-200 italic">
                            Resultado: 1 viral hit 180k. Calendário explodiu para 35k audiência.
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

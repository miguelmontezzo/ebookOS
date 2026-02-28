import { PageLayout } from '../components/PageLayout';
import { Layers, RotateCcw, Swords, Eye, PieChart, CheckCircle2 } from 'lucide-react';

export function OConflito() {
    return (
        <PageLayout title="CAPÍTULO 3 — O 'Mas' do Roteiro" objective="Como prender a atenção pelos 10 a 40 segundos cruciais do meio do vídeo.">
            <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl mb-8">
                <h3 className="font-bold text-xl mb-3 text-orange-900">O que é o Mas em um roteiro?</h3>
                <p className="text-orange-800">O <strong>Mas</strong> é o <strong>desenvolvimento</strong>. É onde você aprofunda a tensão, detalha o problema ou constrói a narrativa. É os <strong>10 a 40 segundos</strong> do meio do vídeo. Se o gancho faz a pessoa parar, o Mas faz ela ficar.</p>
            </div>

            <h3 className="text-2xl font-black text-zinc-900 mb-6">Técnicas de Conflito que Funcionam (Mas)</h3>

            <div className="space-y-6">
                {/* Type 1 */}
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-orange-400 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="bg-zinc-100 p-3 rounded-xl text-zinc-600 mt-1">
                            <Layers className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-lg text-zinc-900">1. Conflito por Aprofundamento</h4>
                            <p className="text-zinc-500 text-sm mt-1 mb-3"><strong>O que é:</strong> você apresenta camadas do problema.</p>
                            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 text-sm font-mono text-zinc-700">
                                <span className="text-indigo-600 block mb-1">[0-3s — E: GANCHO]</span>
                                "Todo roteiro que viraliza tem 3 partes."<br /><br />
                                <span className="text-orange-600 block mb-1">[4-20s — MAS: APROFUNDAMENTO]</span>
                                "A maioria das pessoas foca só em ser engraçado. Mas viralização não é sobre ser engraçado. É sobre criar tensão emocional."
                            </div>
                        </div>
                    </div>
                </div>

                {/* Type 2 */}
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-orange-400 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="bg-zinc-100 p-3 rounded-xl text-zinc-600 mt-1">
                            <RotateCcw className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-lg text-zinc-900">2. Conflito por Virada Narrativa</h4>
                            <p className="text-zinc-500 text-sm mt-1 mb-3"><strong>O que é:</strong> você cria expectativa e depois muda a direção.</p>
                            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 text-sm font-mono text-zinc-700">
                                <span className="text-indigo-600 block mb-1">[0-3s — GANCHO]</span>
                                "Eu gastei R$50 mil em curso de copywriting."<br /><br />
                                <span className="text-orange-600 block mb-1">[4-25s — MAS: VIRADA]</span>
                                "Achava que era a melhor decisão que tomava. Mas sabes o que não aprendi? Que copy perfeita sem estrutura narrativa vira texto chato."
                            </div>
                        </div>
                    </div>
                </div>

                {/* Type 3 */}
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-orange-400 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="bg-zinc-100 p-3 rounded-xl text-zinc-600 mt-1">
                            <Swords className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-lg text-zinc-900">3. Conflito por Contradição</h4>
                            <p className="text-zinc-500 text-sm mt-1 mb-3"><strong>O que é:</strong> você apresenta duas ideias que parecem opostas.</p>
                            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 text-sm font-mono text-zinc-700">
                                <span className="text-orange-600 block mb-1">[MAS: CONTRADIÇÃO]</span>
                                "Você acredita que viralização é sorte. Que é algoritmo. IA decidindo. Mas a gente achava a mesma coisa... Até testar a mesma estrutura em 13 clientes diferentes. 100% viralizou."
                            </div>
                        </div>
                    </div>
                </div>

                {/* Type 4 & 5 Compact */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-orange-400 transition-colors">
                        <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2 mb-2">
                            <Eye className="w-5 h-5 text-orange-500" />
                            4. Revelação Gradual
                        </h4>
                        <p className="text-zinc-600 text-sm">Você promete uma coisa, mas revela pedaço por pedaço. Ex: "Segredo 1... Segredo 2... Segredo 3."</p>
                    </div>
                    <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-orange-400 transition-colors">
                        <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2 mb-2">
                            <PieChart className="w-5 h-5 text-orange-500" />
                            5. Dados Chocantes
                        </h4>
                        <p className="text-zinc-600 text-sm">Apresentar múltiplos números conflitantes. Ex: "47% dos Reels morrem em 24h, mas 13% viralizam por um motivo em comum."</p>
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900 text-white p-6 rounded-2xl mt-8">
                <h3 className="font-bold text-orange-400 mb-4 uppercase tracking-wide text-sm">O Checklist do Conflito Perfeito</h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" /> <span>Prende a atenção depois do gancho</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" /> <span>Cria tensão, dúvida ou curiosidade</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" /> <span>Não perde tempo em explicações genéricas</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" /> <span>Cada frase tem propósito narrativo</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" /> <span>Prepara o terreno para a resolução e mantém ritmo visual</span></li>
                </ul>
            </div>
        </PageLayout>
    );
}

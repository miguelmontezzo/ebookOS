import { PageLayout } from '../components/PageLayout';
import { MousePointerClick, Zap, AlertCircle, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

export function OGancho() {
    return (
        <PageLayout title="CAPÍTULO 2 — O 'E' do Roteiro" objective="Dominar os primeiros 3 segundos do vídeo, o momento mais crucial do conteúdo.">
            <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-2xl mb-8">
                <h3 className="font-bold text-xl mb-3 text-indigo-900">O que é o E em um roteiro?</h3>
                <p className="text-indigo-800">O <strong>E</strong> é os <strong>primeiros 3 segundos</strong> do vídeo. É tudo que importa. Se o usuário não para o scroll, o resto não existe. Diferente de um post estático, o roteiro de vídeo vive ou morre nos primeiros 3 segundos.</p>
            </div>

            <h3 className="text-2xl font-black text-zinc-900 mb-6">Tipos de Ganchos que Funcionam (E)</h3>

            <div className="space-y-6">
                {/* Type 1 */}
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-indigo-400 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="bg-zinc-100 p-3 rounded-xl text-zinc-600 mt-1">
                            <MousePointerClick className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-zinc-900">1. Gancho de Contradição</h4>
                            <p className="text-zinc-500 text-sm mt-1 mb-3"><strong>Tempo:</strong> 2-3s | <strong>Por que funciona:</strong> Desmente expectativa e cria curiosidade.</p>
                            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                                <p className="font-medium text-indigo-700 italic">"Toda agência te cobra para viralizar. A gente não."</p>
                                <div className="text-xs text-zinc-400 mt-2 font-mono">
                                    [VÍDEO ABRE] "Toda agência cobra R$5 mil."<br />[PAUSA 1s] "A gente não. Deixa eu explicar."
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Type 2 */}
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-indigo-400 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="bg-zinc-100 p-3 rounded-xl text-zinc-600 mt-1">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-zinc-900">2. Gancho de Dor Imediata</h4>
                            <p className="text-zinc-500 text-sm mt-1 mb-3"><strong>Tempo:</strong> 2s | <strong>Por que funciona:</strong> Identifica o problema exato. A pessoa se vê descrita.</p>
                            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                                <p className="font-medium text-indigo-700 italic">"Seus Reels têm 20 views e 3 são bots."</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Type 3 */}
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-indigo-400 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="bg-zinc-100 p-3 rounded-xl text-zinc-600 mt-1">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-zinc-900">3. Gancho de Dados Surpreendentes</h4>
                            <p className="text-zinc-500 text-sm mt-1 mb-3"><strong>Tempo:</strong> 2-3s | <strong>Por que funciona:</strong> Autoridade + curiosidade. Cria tensão.</p>
                            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                                <p className="font-medium text-indigo-700 italic">"95% das agências não sabe por que conteúdo viraliza."</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Type 4 */}
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-indigo-400 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="bg-zinc-100 p-3 rounded-xl text-zinc-600 mt-1">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-zinc-900">4. Gancho de Promessa Nítida</h4>
                            <p className="text-zinc-500 text-sm mt-1 mb-3"><strong>Tempo:</strong> 3s | <strong>Por que funciona:</strong> Benefício claro. Sabe o que vai ganhar.</p>
                            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                                <p className="font-medium text-indigo-700 italic">"Vou te ensinar a estrutura que transformou 13 marcas em viral em 2025."</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Type 5 */}
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-indigo-400 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="bg-zinc-100 p-3 rounded-xl text-zinc-600 mt-1">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-zinc-900">5. Gancho de Dúvida Provocativa</h4>
                            <p className="text-zinc-500 text-sm mt-1 mb-3"><strong>Tempo:</strong> 2-3s | <strong>Por que funciona:</strong> Tira o usuário da zona de conforto.</p>
                            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                                <p className="font-medium text-indigo-700 italic">"Você sabe o que 99% do marketing digital faz errado?"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900 text-white p-6 rounded-2xl mt-8">
                <h3 className="font-bold text-indigo-400 mb-4 uppercase tracking-wide text-sm">Checklist do Gancho Perfeito</h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> <span>Cria curiosidade em menos de 3 segundos</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> <span>Identifica dor, promessa ou dados que o público quer saber</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> <span>Faz a pessoa PARAR o scroll</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> <span>Deixa claro por que continuar vendo é importante</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> <span>Não é clickbait (promete e aúdio entrega mesmo)</span></li>
                </ul>
            </div>
        </PageLayout>
    );
}

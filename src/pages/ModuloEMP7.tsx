import { PageLayout } from '../components/PageLayout';
import { Target, Users, Megaphone, Flag, ChevronRight } from 'lucide-react';

export function Conclusao() {
    return (
        <PageLayout title="CAPÍTULO 10 & EPÍLOGO — Conclusão" objective="Adaptar para qualquer nicho e internalizar a ciência da viralização.">
            <h3 className="text-2xl font-black text-zinc-900 mb-6">Múltiplos Nichos, Mesma Estrutura</h3>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Nicho 1 */}
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
                        <Target className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-zinc-900 mb-2">P/ Agências</h4>
                    <p className="text-zinc-600 text-sm mb-4">"Você é bom. Mas clientes não o veem." O Conflito revela a falta de comunicação focada e o fechamento mostra que estrutura conserta tráfego.</p>
                    <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3 text-xs text-indigo-700 italic font-mono">
                        Roteiro de conversão focado em autoridade local e prova social.
                    </div>
                </div>

                {/* Nicho 2 */}
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
                        <Megaphone className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-zinc-900 mb-2">P/ Criadores</h4>
                    <p className="text-zinc-600 text-sm mb-4">"Qual o segredo daquele criador que você inveja?" A quebra (não é sorte, é estrutura). O encerramento induz a engajamento do feed.</p>
                    <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3 text-xs text-indigo-700 italic font-mono">
                        Roteiro educativo, CTA forte p/ comentários comparativos.
                    </div>
                </div>

                {/* Nicho 3 */}
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
                        <Users className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-zinc-900 mb-2">P/ Empreendedores</h4>
                    <p className="text-zinc-600 text-sm mb-4">"Produto incrível. Mercado calado." Enfatizar que se o cliente final não entender o conflito visual do produto, ele não compra.</p>
                    <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3 text-xs text-indigo-700 italic font-mono">
                        Roteiro p/ link na bio e gerar DM (conversão via Direct).
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900 text-white p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
                <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400 border border-zinc-700">
                        <Flag className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">CIÊNCIA, NÃO SORTE.</h2>
                    <p className="text-zinc-300 text-lg mb-8 font-light">
                        Viralização não é privilégio de poucos. É <strong>Estrutura Narrativa</strong>. Siga a lógica E (Para o scroll) → MAS (Prende a atenção) → POR ISSO (Converte em ação). <br /><br />
                        Se 13 clientes aplicaram e funcionou, <strong>você é o próximo</strong>.
                    </p>

                    <div className="border border-zinc-700 bg-zinc-800/50 rounded-2xl p-6 text-left">
                        <h4 className="font-bold text-indigo-400 tracking-wider text-xs uppercase mb-3">Sua Jornada Acabou (E Acabou de Começar)</h4>
                        <ul className="space-y-3">
                            <li className="flex gap-2 items-center text-sm"><ChevronRight className="w-4 h-4 text-zinc-500" /> Vá escrever o próximo roteiro no docs.</li>
                            <li className="flex gap-2 items-center text-sm"><ChevronRight className="w-4 h-4 text-zinc-500" /> Passe no checklist (E, MAS, POR ISSO).</li>
                            <li className="flex gap-2 items-center text-sm"><ChevronRight className="w-4 h-4 text-zinc-500" /> Lance, aprenda as métricas e repita.</li>
                        </ul>
                    </div>

                    <div className="mt-8 pt-8 border-t border-zinc-800 text-sm text-zinc-500">
                        <strong>Anti Copy Club — Método EMP</strong><br />
                        Versão 1.0 | Propriedade da Anti Copy Club
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

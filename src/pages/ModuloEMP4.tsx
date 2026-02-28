import { PageLayout } from '../components/PageLayout';
import { Lightbulb, Send, MessageCircle, Save, Share2, CheckCircle2 } from 'lucide-react';

export function AResolucao() {
    return (
        <PageLayout title="CAPÍTULO 4 — O 'Por Isso' do Roteiro" objective="Transformar engajamento em ação real com os últimos 15 a 20 segundos.">
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl mb-8">
                <h3 className="font-bold text-xl mb-3 text-emerald-900">O que é o Por Isso?</h3>
                <p className="text-emerald-800">O <strong>Por Isso</strong> é a <strong>resolução, ensinamento ou CTA</strong>. É onde você transforma engajamento em ação. Se o E prende e o Mas engaja, o Por Isso converte.</p>
            </div>

            <h3 className="text-2xl font-black text-zinc-900 mb-6">Tipos de Resolução (Por Isso)</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-emerald-400 transition-colors">
                    <h4 className="font-bold text-lg text-zinc-900 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-emerald-500" /> 1. Ensinamento Direto
                    </h4>
                    <p className="text-zinc-600 text-sm mb-3">Dar a resposta de forma clara e acionável em passos.</p>
                    <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200 text-xs font-mono text-zinc-700 italic">
                        "Como fazer: 1. Gancho 3s, 2. Conflito educa, 3. Feche com CTA claro. Aplicou? Conta depois."
                    </div>
                </div>

                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-emerald-400 transition-colors">
                    <h4 className="font-bold text-lg text-zinc-900 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 2. Prova Social
                    </h4>
                    <p className="text-zinc-600 text-sm mb-3">Mostrar resultado real de quem aplicou o método.</p>
                    <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200 text-xs font-mono text-zinc-700 italic">
                        "Agência saiu de 500 para 50k followers. Dentista virou influenciador. Quer testar no mês que vem?"
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900 text-white p-8 rounded-3xl mb-8">
                <h3 className="text-xl font-bold text-emerald-400 mb-6">3. O Call-to-Action Estratégico</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-zinc-800 p-4 rounded-xl text-center border border-zinc-700 hover:border-emerald-500 transition-colors">
                        <Save className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                        <h5 className="font-bold text-sm text-zinc-100">Salvamento</h5>
                        <p className="text-xs text-zinc-400 mt-1">Torna seu conteúdo permanente e aumenta saves (feed).</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-xl text-center border border-zinc-700 hover:border-emerald-500 transition-colors">
                        <MessageCircle className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                        <h5 className="font-bold text-sm text-zinc-100">Comentário</h5>
                        <p className="text-xs text-zinc-400 mt-1">Dispara conversas e ativa o algoritmo com força.</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-xl text-center border border-zinc-700 hover:border-emerald-500 transition-colors">
                        <Share2 className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                        <h5 className="font-bold text-sm text-zinc-100">Compartilhar</h5>
                        <p className="text-xs text-zinc-400 mt-1">Expande alcance organicamente (bom p/ Stories).</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-xl text-center border border-zinc-700 hover:border-emerald-500 transition-colors">
                        <Send className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                        <h5 className="font-bold text-sm text-zinc-100">Ação Direta</h5>
                        <p className="text-xs text-zinc-400 mt-1">"Link na bio" canaliza o engajamento p/ conversão.</p>
                    </div>
                </div>
            </div>

            <h3 className="text-2xl font-black text-zinc-900 mb-6 mt-8">O Checklist Perfeito</h3>
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl">
                <ul className="space-y-3">
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> <span className="text-zinc-800">Responde a promessa feita no gancho</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> <span className="text-zinc-800">Oferece valor (ensinamento, dados, prova social)</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> <span className="text-zinc-800">Inclui CTA estratégico e claro (Não fica vago)</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> <span className="text-zinc-800">Cria urgência ou desejo de compartilhamento</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> <span className="text-zinc-800">Transforma visualização em ação (like, comment, save, share)</span></li>
                </ul>
            </div>
        </PageLayout>
    );
}

import { PageLayout } from '../components/PageLayout';
import { TrendingUp, HelpCircle, CheckCircle } from 'lucide-react';

export function Progressao() {
  return (
    <PageLayout title="PÁGINA 15 — Progressão de Carga" objective="Como garantir que você continue evoluindo.">
      <p>Fazer o mesmo treino, com o mesmo peso, pelo resto da vida, vai te deixar com o mesmo corpo pelo resto da vida. O nome do jogo é <strong>Sobrecarga Progressiva</strong>.</p>
      
      <div className="bg-zinc-50 border-l-4 border-zinc-900 p-6 rounded-r-2xl my-6">
        <h3 className="font-bold text-zinc-900 mb-2">A Regra da Faixa de Repetições</h3>
        <p className="text-sm text-zinc-700 mb-4">Se o treino pede <strong>8 a 12 repetições</strong>:</p>
        <ul className="space-y-3 text-sm text-zinc-800">
          <li className="flex gap-3"><span className="bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded text-xs">ERRO</span> <span>Se você falha na repetição 6, o peso está muito <strong>pesado</strong>. Diminua.</span></li>
          <li className="flex gap-3"><span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-xs">ACERTO</span> <span>Se você falha na repetição 10, o peso está <strong>perfeito</strong>. Mantenha.</span></li>
          <li className="flex gap-3"><span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-xs">AÇÃO</span> <span>Se você consegue fazer 13, 14, 15 repetições... o peso está <strong>leve</strong>. Aumente a carga no próximo treino.</span></li>
        </ul>
      </div>

      <div className="bg-zinc-900 text-white p-6 rounded-2xl">
        <h3 className="font-bold text-emerald-400 mb-2 uppercase tracking-wide text-sm flex items-center gap-2">
          <TrendingUp className="w-4 h-4"/> O que é Deload?
        </h3>
        <p className="text-sm text-zinc-300">A cada 6 a 8 semanas, seu corpo vai pedir arrego. As juntas doem, o sono piora, a força cai. É hora do Deload: 1 semana reduzindo as cargas em 20% e parando as séries 3 repetições antes da falha (RIR 3). É um passo atrás para dar dois à frente.</p>
      </div>
    </PageLayout>
  );
}

export function FAQ() {
  return (
    <PageLayout title="PÁGINA 16 — FAQ (Perguntas Frequentes)" objective="Matar as principais dúvidas do método.">
      <div className="space-y-4">
        <div className="bg-white border border-zinc-200 p-5 rounded-xl">
          <h4 className="font-bold text-zinc-900 flex items-start gap-2"><HelpCircle className="w-5 h-5 text-emerald-500 shrink-0"/> Posso treinar 3x na semana em vez de 6x?</h4>
          <p className="text-sm text-zinc-600 mt-2">O método foi desenhado para alta frequência e baixo volume diário (PPL 2x). Se for treinar 3x, você precisará dobrar o tempo de treino (60 min) e fazer Full Body. O método perde a característica "30 minutos".</p>
        </div>
        
        <div className="bg-white border border-zinc-200 p-5 rounded-xl">
          <h4 className="font-bold text-zinc-900 flex items-start gap-2"><HelpCircle className="w-5 h-5 text-emerald-500 shrink-0"/> Sinto que 30 minutos é pouco. Posso fazer mais exercícios?</h4>
          <p className="text-sm text-zinc-600 mt-2">Se você acha que 30 minutos é pouco, você não está treinando com a intensidade certa. Aumente a carga, respeite os 60s de descanso e faça o Rest-Pause. Você vai implorar para ir embora aos 30 min.</p>
        </div>

        <div className="bg-white border border-zinc-200 p-5 rounded-xl">
          <h4 className="font-bold text-zinc-900 flex items-start gap-2"><HelpCircle className="w-5 h-5 text-emerald-500 shrink-0"/> Mulheres vão ficar musculosas demais com treino de braço?</h4>
          <p className="text-sm text-zinc-600 mt-2">Não. Mulheres têm muito menos testosterona. Treinar braço vai deixar os membros superiores firmes, definidos e sem flacidez. Faça o treino completo + Modo Glúteo.</p>
        </div>

        <div className="bg-white border border-zinc-200 p-5 rounded-xl">
          <h4 className="font-bold text-zinc-900 flex items-start gap-2"><HelpCircle className="w-5 h-5 text-emerald-500 shrink-0"/> Preciso tomar suplemento?</h4>
          <p className="text-sm text-zinc-600 mt-2">Não é obrigatório. Whey Protein e Creatina apenas facilitam a vida corrida. O Whey ajuda a bater a meta de proteína de forma rápida. A Creatina ajuda na força. O resto é comida.</p>
        </div>
      </div>
    </PageLayout>
  );
}

export function DicasFinais() {
  return (
    <PageLayout title="PÁGINA 17 — Dicas Finais e Encerramento" objective="Últimos conselhos práticos para a jornada.">
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-zinc-50 p-4 rounded-xl flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0"/>
          <p className="text-sm text-zinc-700">A consistência de um treino nota 7 bate a inconstância de um treino nota 10.</p>
        </div>
        <div className="bg-zinc-50 p-4 rounded-xl flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0"/>
          <p className="text-sm text-zinc-700">Beba água. Músculo é 70% água. Mire em 35ml a 40ml por kg corporal.</p>
        </div>
        <div className="bg-zinc-50 p-4 rounded-xl flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0"/>
          <p className="text-sm text-zinc-700">Dorme mal? Seu resultado será pela metade. O músculo cresce na cama, não na academia.</p>
        </div>
        <div className="bg-zinc-50 p-4 rounded-xl flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0"/>
          <p className="text-sm text-zinc-700">Não pule o aquecimento. Lesão é o maior inimigo da hipertrofia.</p>
        </div>
      </div>

      <div className="bg-zinc-900 text-center p-8 rounded-3xl text-white">
        <h2 className="text-3xl font-black mb-4">O SHAPE ESTÁ NAS SUAS MÃOS</h2>
        <p className="text-zinc-300 max-w-lg mx-auto mb-8">Você tem o método. Você tem a nutrição. Você só precisa de 30 minutos por dia. Sem enrolação. Vá executar.</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-bold py-3 px-8 rounded-full transition-colors w-full sm:w-auto">
            [LINK] ACESSAR COMUNIDADE
          </button>
          <div className="bg-white p-2 rounded-lg w-24 h-24 flex items-center justify-center text-zinc-400 text-xs font-mono">
            [QR CODE]
          </div>
        </div>
        <div className="mt-6 text-zinc-500 text-sm">
          Acompanhe no Instagram: <span className="text-emerald-400">[@INSTAGRAM]</span>
        </div>
      </div>
    </PageLayout>
  );
}

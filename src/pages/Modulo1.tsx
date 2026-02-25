import { PageLayout } from '../components/PageLayout';
import { CheckCircle2, Target, Zap } from 'lucide-react';

export function Capa() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center bg-zinc-900 text-white rounded-3xl p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-zinc-900 to-zinc-900"></div>
      <div className="z-10 space-y-6 max-w-3xl">
        <div className="inline-block bg-emerald-500 text-zinc-900 font-black px-4 py-1 rounded-full text-sm tracking-widest uppercase mb-4">
          O MÉTODO DE TREINO DO LUCAS LUCCO
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
          VIDA CORRIDA.<br/>
          <span className="text-emerald-400">SHAPE EM DIA.</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-300 font-light max-w-2xl mx-auto mt-6">
          30 minutos de hipertrofia efetiva. <strong className="text-white font-bold">Sem enrolação.</strong>
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <span className="bg-zinc-800 px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 flex items-center gap-2"><Zap className="w-4 h-4 text-emerald-400"/> Menos tempo</span>
          <span className="bg-zinc-800 px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 flex items-center gap-2"><Target className="w-4 h-4 text-emerald-400"/> Mais tensão</span>
          <span className="bg-zinc-800 px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 flex items-center gap-2"><Zap className="w-4 h-4 text-emerald-400"/> Mais densidade</span>
        </div>
      </div>
    </div>
  );
}

export function Introducao() {
  return (
    <PageLayout title="PÁGINA 2 — Introdução" objective="Apresentar o conceito Vida Corrida e o Método de Treino do Lucas Lucco.">
      <p className="text-lg">Você não tem 2 horas para morar na academia. Você trabalha, estuda, tem família, boletos e uma vida corrida. Mas isso não é desculpa para não ter o shape em dia.</p>
      
      <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl">
        <h3 className="font-bold text-xl mb-3 text-zinc-900">O que é o Método de Treino do Lucas Lucco?</h3>
        <p>O método é um sistema desenhado para extrair o máximo de <strong>hipertrofia efetiva</strong> em apenas 20 a 30 minutos. Como? Cortando o volume inútil e focando no que constrói músculo: <strong>tensão mecânica e densidade</strong>.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h4 className="font-bold text-emerald-900 mb-2">Menos Tempo</h4>
          <p className="text-sm text-emerald-800">Treinos de 20-30 min. Entrou, fez o trabalho, saiu.</p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h4 className="font-bold text-emerald-900 mb-2">Mais Tensão</h4>
          <p className="text-sm text-emerald-800">Carga alta, execução controlada, chegando perto da falha (RIR 1-2).</p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h4 className="font-bold text-emerald-900 mb-2">Mais Densidade</h4>
          <p className="text-sm text-emerald-800">Descansos curtos (60-90s) e finalizadores intensos.</p>
        </div>
      </div>

      <div className="bg-zinc-900 text-white p-6 rounded-2xl mt-8">
        <h3 className="font-bold text-emerald-400 mb-2 uppercase tracking-wide text-sm">Regras Inegociáveis</h3>
        <ul className="space-y-3 mt-4">
          <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0"/> <span><strong>Descanso cravado:</strong> 60 a 90 segundos. Use o cronômetro.</span></li>
          <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0"/> <span><strong>Intensidade (RIR 1-2):</strong> RIR significa "Repetições na Reserva". RIR 1-2 quer dizer que você deve parar a série quando aguentaria fazer apenas mais 1 ou 2 repetições com boa forma.</span></li>
          <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0"/> <span><strong>Finalizador obrigatório:</strong> Toda sessão termina com um Rest-Pause para garantir densidade.</span></li>
        </ul>
      </div>
    </PageLayout>
  );
}

export function Diagnostico() {
  return (
    <PageLayout title="PÁGINA 3 — Diagnóstico de Nível" objective="Identificar o ponto de partida do aluno para alinhar expectativas.">
      <p>Antes de puxar ferro, você precisa saber onde está. O método funciona para todos, mas a carga e a percepção de esforço mudam.</p>
      
      <div className="space-y-4 mt-6">
        <div className="border border-zinc-200 p-6 rounded-2xl hover:border-emerald-400 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-zinc-200 text-zinc-700 font-bold px-3 py-1 rounded-full text-sm">NÍVEL 1</span>
            <h3 className="font-bold text-lg">Iniciante (0 a 6 meses)</h3>
          </div>
          <p className="text-zinc-600 text-sm">Ainda aprendendo os movimentos. Seu foco aqui não é falhar, é aprender a contrair o músculo certo. Use cargas moderadas e foque 100% na técnica.</p>
        </div>

        <div className="border border-zinc-200 p-6 rounded-2xl hover:border-emerald-400 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-sm">NÍVEL 2</span>
            <h3 className="font-bold text-lg">Intermediário (6 meses a 2 anos)</h3>
          </div>
          <p className="text-zinc-600 text-sm">Já sabe treinar, mas estagnou. Aqui o método vai brilhar. Você vai aprender a extrair mais resultado em menos tempo aplicando o RIR 1-2 de verdade.</p>
        </div>

        <div className="border border-zinc-200 p-6 rounded-2xl hover:border-emerald-400 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-zinc-900 text-white font-bold px-3 py-1 rounded-full text-sm">NÍVEL 3</span>
            <h3 className="font-bold text-lg">Avançado (+2 anos)</h3>
          </div>
          <p className="text-zinc-600 text-sm">Sabe o que é falha. O desafio aqui é a densidade. Fazer o mesmo volume de trabalho em 30 minutos vai chocar seu sistema e gerar novos estímulos.</p>
        </div>
      </div>
    </PageLayout>
  );
}

export function Evolucao() {
  return (
    <PageLayout title="PÁGINA 4 — Evolução" objective="Estabelecer métricas de progresso além da balança.">
      <p>A balança mente. Se você perder gordura e ganhar músculo, o peso pode não mudar, mas o espelho muda. Sem enrolação: veja como medir seu progresso.</p>
      
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-zinc-50 p-6 rounded-2xl">
          <h3 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">📸 Fotos (O Padrão Ouro)</h3>
          <ul className="space-y-2 text-sm text-zinc-700">
            <li>• Tire fotos a cada 15 dias.</li>
            <li>• Mesma luz, mesmo horário (preferência em jejum).</li>
            <li>• Frente, lado e costas.</li>
            <li>• Relaxe o abdômen em uma, contraia na outra.</li>
          </ul>
          <div className="mt-4 p-4 bg-zinc-200 rounded-lg text-center text-zinc-500 text-xs font-mono uppercase tracking-widest">
            [PLACEHOLDER: FOTO ANTES/DEPOIS]
          </div>
        </div>

        <div className="bg-zinc-50 p-6 rounded-2xl">
          <h3 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">📏 Medidas (A Prova Real)</h3>
          <ul className="space-y-2 text-sm text-zinc-700">
            <li>• Cintura (linha do umbigo).</li>
            <li>• Quadril (parte mais larga).</li>
            <li>• Braço (contraído).</li>
            <li>• Coxa (parte mais grossa).</li>
          </ul>
        </div>
      </div>

      <div className="bg-emerald-900 text-white p-6 rounded-2xl mt-6">
        <h3 className="font-bold text-emerald-400 mb-2">Checklist Semanal de Sucesso</h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded text-emerald-500 focus:ring-emerald-500 bg-zinc-800 border-zinc-700" /> Bati a proteína?</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded text-emerald-500 focus:ring-emerald-500 bg-zinc-800 border-zinc-700" /> Treinei 6x na semana?</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded text-emerald-500 focus:ring-emerald-500 bg-zinc-800 border-zinc-700" /> Respeitei o descanso (60-90s)?</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded text-emerald-500 focus:ring-emerald-500 bg-zinc-800 border-zinc-700" /> Fiz os finalizadores?</label>
        </div>
      </div>
    </PageLayout>
  );
}

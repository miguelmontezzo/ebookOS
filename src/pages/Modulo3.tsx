import { PageLayout } from '../components/PageLayout';
import { Flame, AlertTriangle, ArrowRight } from 'lucide-react';

const TreinoTable = ({ rows }: { rows: any[] }) => (
  <div className="overflow-x-auto my-6 shadow-sm rounded-xl border border-zinc-200">
    <table className="w-full text-left border-collapse bg-white">
      <thead>
        <tr className="bg-zinc-100 text-zinc-900 text-sm uppercase tracking-wider">
          <th className="p-4 font-bold">Exercício</th>
          <th className="p-4 font-bold">Séries</th>
          <th className="p-4 font-bold">Reps</th>
          <th className="p-4 font-bold">Descanso</th>
          <th className="p-4 font-bold">Observações</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {rows.map((row, i) => (
          <tr key={i} className="border-t border-zinc-200 hover:bg-zinc-50">
            <td className="p-4 font-bold text-zinc-900">{row.ex}</td>
            <td className="p-4 text-center font-mono">{row.sets}</td>
            <td className="p-4 text-center font-mono">{row.reps}</td>
            <td className="p-4 text-center font-mono text-zinc-500">{row.rest}</td>
            <td className="p-4 text-zinc-600">{row.obs}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FinalizadorBox = ({ title, desc }: { title: string, desc: string }) => (
  <div className="bg-zinc-900 text-white p-6 rounded-2xl mt-6 relative overflow-hidden">
    <div className="absolute -right-4 -top-4 text-zinc-800 opacity-50">
      <Flame className="w-24 h-24" />
    </div>
    <h4 className="font-bold text-emerald-400 mb-2 uppercase tracking-wide text-sm flex items-center gap-2 relative z-10">
      <Flame className="w-4 h-4" /> Finalizador de Densidade
    </h4>
    <p className="text-sm text-zinc-300 relative z-10"><strong>{title}:</strong> {desc}</p>
  </div>
);

const SubstituicoesBox = ({ subs }: { subs: any[] }) => (
  <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-xl mt-4">
    <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500 mb-3">Substituições (Se a máquina estiver ocupada)</h4>
    <div className="space-y-2 text-sm">
      {subs.map((sub, i) => (
        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <strong className="text-zinc-900 min-w-[140px]">{sub.ex}:</strong>
          <span className="text-zinc-600">Alt 1: {sub.alt1} <span className="text-zinc-300 mx-1">|</span> Alt 2: {sub.alt2}</span>
        </div>
      ))}
    </div>
  </div>
);

const ModoGluteoBox = () => (
  <div className="bg-pink-50 border border-pink-200 p-6 rounded-2xl mt-8">
    <h4 className="font-bold text-pink-600 mb-2 uppercase tracking-wide text-sm flex items-center gap-2">
      🍑 Modo Glúteo (Obrigatório Mulheres / Opcional Homens)
    </h4>
    <p className="text-sm text-pink-900 mb-4">Mini-bloco de 3 minutos contínuos ao final do treino. Ligue o cronômetro e não pare.</p>
    <ul className="space-y-2 text-sm text-pink-800 font-medium">
      <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4"/> <strong>0:00 a 0:30</strong> - Coice na polia (Perna Direita)</li>
      <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4"/> <strong>0:30 a 1:00</strong> - Coice na polia (Perna Esquerda)</li>
      <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4"/> <strong>1:00 a 2:00</strong> - Cadeira Abdutora (movimento contínuo)</li>
      <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4"/> <strong>2:00 a 3:00</strong> - Ponte de Glúteo Isométrica (segura no alto)</li>
    </ul>
  </div>
);

export function Treinos() {
  return (
    <div className="space-y-16">
      <PageLayout title="PÁGINA 6 — Treino PUSH A (Peito, Ombro, Tríceps)" objective="Foco em empurrar com estabilidade mecânica.">
        <TreinoTable rows={[
          { ex: "Chest Press Máquina", sets: "3", reps: "8-12", rest: "90s", obs: "RIR 1. Controle a descida (2s)." },
          { ex: "Desenvolvimento Máquina", sets: "3", reps: "8-12", rest: "90s", obs: "RIR 1-2. Amplitude completa." },
          { ex: "Elevação Lateral Halteres", sets: "3", reps: "12-15", rest: "60s", obs: "Foco na contração, não no peso." },
          { ex: "Tríceps Corda na Polia", sets: "3", reps: "10-15", rest: "60s", obs: "Abra a corda no final do movimento." }
        ]} />
        <FinalizadorBox 
          title="Rest-Pause no Tríceps Corda" 
          desc="Após a última série, descanse 15 segundos e faça mais repetições até a falha (geralmente 5-8 reps). O músculo deve queimar." 
        />
        <SubstituicoesBox subs={[
          { ex: "Chest Press", alt1: "Supino Reto Halteres", alt2: "Supino Reto Barra" },
          { ex: "Desenvolvimento", alt1: "Desenvolvimento Halteres", alt2: "Desenvolvimento Smith" },
          { ex: "Tríceps Corda", alt1: "Tríceps Testa Polia", alt2: "Tríceps Francês Halter" }
        ]} />
      </PageLayout>

      <PageLayout title="PÁGINA 7 — Treino PULL A (Costas, Bíceps, Posterior Ombro)" objective="Foco em puxadas verticais e horizontais.">
        <TreinoTable rows={[
          { ex: "Pulldown (Puxada Alta)", sets: "3", reps: "8-12", rest: "90s", obs: "Estufe o peito, puxe com os cotovelos." },
          { ex: "Remada Máquina (Pegada Neutra)", sets: "3", reps: "8-12", rest: "90s", obs: "Aperte as escápulas no final." },
          { ex: "Crucifixo Inverso Máquina", sets: "3", reps: "12-15", rest: "60s", obs: "Movimento curto, foco no posterior de ombro." },
          { ex: "Rosca na Polia (Barra Reta)", sets: "3", reps: "10-15", rest: "60s", obs: "Cotovelos colados no corpo." }
        ]} />
        <FinalizadorBox 
          title="Rest-Pause na Rosca Polia" 
          desc="Após a última série, descanse 15 segundos e faça mais repetições até a falha. Bíceps estourando." 
        />
        <SubstituicoesBox subs={[
          { ex: "Pulldown", alt1: "Barra Fixa (com elástico)", alt2: "Puxada Alta Triângulo" },
          { ex: "Remada Máquina", alt1: "Remada Curvada Barra", alt2: "Remada Serrote Halter" },
          { ex: "Rosca Polia", alt1: "Rosca Direta Barra W", alt2: "Rosca Alternada Halteres" }
        ]} />
      </PageLayout>

      <PageLayout title="PÁGINA 8 — Treino LEGS A (Foco Posterior e Glúteo)" objective="Desenvolvimento da cadeia posterior da perna.">
        <TreinoTable rows={[
          { ex: "Cadeira Flexora", sets: "3", reps: "10-15", rest: "90s", obs: "Segure 1s na contração máxima." },
          { ex: "Hip Thrust Máquina (Elevação Pélvica)", sets: "3", reps: "8-12", rest: "90s", obs: "Força no calcanhar, contraia o glúteo." },
          { ex: "Leg Press (Pés altos e afastados)", sets: "3", reps: "10-12", rest: "90s", obs: "Foco em alongar o glúteo na descida." },
          { ex: "Cadeira Extensora (Leve)", sets: "2", reps: "15-20", rest: "60s", obs: "Apenas para fluxo sanguíneo no quadríceps." }
        ]} />
        <FinalizadorBox 
          title="Rest-Pause na Cadeira Flexora" 
          desc="Faça a última série, descanse 15s, faça mais 5-8 reps. Descanse 15s, faça mais reps até a falha total." 
        />
        <SubstituicoesBox subs={[
          { ex: "Cadeira Flexora", alt1: "Mesa Flexora", alt2: "Stiff com Halteres" },
          { ex: "Hip Thrust Máquina", alt1: "Elevação Pélvica Barra Livre", alt2: "Glúteo Polia" }
        ]} />
        <ModoGluteoBox />
      </PageLayout>

      <PageLayout title="PÁGINA 9 — Treino PUSH B (Peito, Ombro, Tríceps)" objective="Variação de ângulos para estímulo completo.">
        <TreinoTable rows={[
          { ex: "Supino Inclinado Halteres", sets: "3", reps: "8-12", rest: "90s", obs: "Foco na porção superior do peito." },
          { ex: "Peck Deck (Voador)", sets: "3", reps: "10-15", rest: "60s", obs: "Aperte o peito no meio." },
          { ex: "Elevação Lateral Polia", sets: "3", reps: "12-15", rest: "60s", obs: "Tensão contínua no ombro." },
          { ex: "Tríceps Testa Polia", sets: "3", reps: "10-15", rest: "60s", obs: "Cotovelos apontados para frente." }
        ]} />
        <FinalizadorBox 
          title="Rest-Pause no Peck Deck" 
          desc="Após a última série, 15s de pausa, máximo de reps. Peitoral vai queimar." 
        />
        <SubstituicoesBox subs={[
          { ex: "Supino Inclinado Halteres", alt1: "Chest Press Inclinado", alt2: "Supino Inclinado Smith" },
          { ex: "Peck Deck", alt1: "Crucifixo Halteres", alt2: "Crossover Polia Alta" }
        ]} />
      </PageLayout>

      <PageLayout title="PÁGINA 10 — Treino PULL B (Costas, Bíceps)" objective="Foco em espessura das costas.">
        <TreinoTable rows={[
          { ex: "Remada Baixa Polia (Triângulo)", sets: "3", reps: "8-12", rest: "90s", obs: "Puxe em direção ao umbigo." },
          { ex: "Pulldown Pegada Supinada (Invertida)", sets: "3", reps: "8-12", rest: "90s", obs: "Foco no latíssimo do dorso." },
          { ex: "Pull-over Polia Alta (Corda)", sets: "3", reps: "12-15", rest: "60s", obs: "Braços semi-estendidos." },
          { ex: "Rosca Martelo Halteres", sets: "3", reps: "10-12", rest: "60s", obs: "Trabalha braquial e antebraço." }
        ]} />
        <FinalizadorBox 
          title="Rest-Pause no Pull-over" 
          desc="Última série + 15s pausa + falha." 
        />
        <SubstituicoesBox subs={[
          { ex: "Remada Baixa", alt1: "Remada Máquina Articulada", alt2: "Remada Curvada Pegada Supinada" },
          { ex: "Rosca Martelo", alt1: "Rosca Martelo Polia (Corda)", alt2: "Rosca Inversa Barra" }
        ]} />
      </PageLayout>

      <PageLayout title="PÁGINA 11 — Treino LEGS B (Foco Quadríceps)" objective="Desenvolvimento da parte frontal da perna.">
        <TreinoTable rows={[
          { ex: "Agachamento no Smith", sets: "3", reps: "8-12", rest: "90s", obs: "Pés levemente à frente. Desça até 90 graus ou mais." },
          { ex: "Leg Press (Pés baixos e juntos)", sets: "3", reps: "10-12", rest: "90s", obs: "Foco total no quadríceps." },
          { ex: "Cadeira Extensora", sets: "3", reps: "12-15", rest: "60s", obs: "Segure 1s em cima." },
          { ex: "Panturrilha Sentado (Máquina)", sets: "4", reps: "15-20", rest: "45s", obs: "Alongue bem na descida." }
        ]} />
        <FinalizadorBox 
          title="Rest-Pause na Cadeira Extensora" 
          desc="Última série + 15s pausa + falha. Você vai ter dificuldade para andar depois disso." 
        />
        <SubstituicoesBox subs={[
          { ex: "Agachamento Smith", alt1: "Agachamento Livre", alt2: "Hack Squat" },
          { ex: "Leg Press", alt1: "Passada/Avanço Halteres", alt2: "Bulgarian Squat" }
        ]} />
        <ModoGluteoBox />
      </PageLayout>
    </div>
  );
}

export function AcademiaCheia() {
  return (
    <PageLayout title="PÁGINA 12 — Se a academia estiver cheia..." objective="Garantir que o treino aconteça em 30 min, independente da lotação.">
      <p>A regra de ouro do método: <strong>Não espere por máquinas. Substitua pela função do movimento.</strong></p>
      
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200">
          <h4 className="font-bold text-zinc-900 mb-2">Empurrar Horizontal (Peito)</h4>
          <p className="text-sm text-zinc-600 mb-2">Se Chest Press e Supino estão cheios:</p>
          <div className="bg-white p-2 rounded border border-zinc-100 text-sm font-medium text-emerald-700">Faça Flexão de Braço (Push-up) ou use o Crossover.</div>
        </div>
        
        <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200">
          <h4 className="font-bold text-zinc-900 mb-2">Puxar Vertical (Costas)</h4>
          <p className="text-sm text-zinc-600 mb-2">Se o Pulldown está cheio:</p>
          <div className="bg-white p-2 rounded border border-zinc-100 text-sm font-medium text-emerald-700">Faça Barra Fixa ou Puxada no Crossover ajoelhado.</div>
        </div>

        <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200">
          <h4 className="font-bold text-zinc-900 mb-2">Empurrar Perna (Quadríceps)</h4>
          <p className="text-sm text-zinc-600 mb-2">Se Leg Press e Smith estão cheios:</p>
          <div className="bg-white p-2 rounded border border-zinc-100 text-sm font-medium text-emerald-700">Pegue dois halteres e faça Agachamento Búlgaro ou Passada.</div>
        </div>

        <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200">
          <h4 className="font-bold text-zinc-900 mb-2">Puxar Perna (Posterior)</h4>
          <p className="text-sm text-zinc-600 mb-2">Se a Cadeira Flexora está cheia:</p>
          <div className="bg-white p-2 rounded border border-zinc-100 text-sm font-medium text-emerald-700">Faça Stiff com Halteres ou Barra.</div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-900"><strong>Dica Sem Enrolação:</strong> O músculo não sabe se você está segurando uma barra cromada, um halter enferrujado ou empurrando uma máquina de 50 mil reais. Ele só entende <strong>tensão</strong>. Adapte e execute.</p>
      </div>
    </PageLayout>
  );
}

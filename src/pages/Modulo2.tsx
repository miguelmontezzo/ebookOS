import { PageLayout } from '../components/PageLayout';
import { Clock } from 'lucide-react';

export function Aquecimento() {
  return (
    <PageLayout title="PÁGINA 5 — Aquecimento, Mobilidade e Dia 7" objective="Preparar o corpo em 3 minutos e apresentar a rotina opcional de recuperação.">
      <p>Esqueça 15 minutos de esteira. O aquecimento do método é específico, rápido e prepara as articulações para a carga.</p>
      
      <div className="bg-zinc-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl my-6">
        <h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2"><Clock className="w-5 h-5 text-emerald-500"/> Aquecimento Padrão (3 minutos)</h3>
        <ol className="list-decimal list-inside space-y-2 text-zinc-700 text-sm">
          <li><strong>Mobilidade articular (1 min):</strong> Rotação de ombros, quadril e tornozelos.</li>
          <li><strong>Série de Aquecimento (2 min):</strong> 1 série de 15 repetições do PRIMEIRO exercício do dia, com 40% da carga que você vai usar.</li>
        </ol>
        <p className="text-xs text-zinc-500 mt-3 italic">*Exemplo: Se vai fazer Chest Press com 50kg, aqueça com 20kg.</p>
      </div>

      <h3 className="font-bold text-xl mt-8 mb-4">O Dia 7 (Opcional)</h3>
      <p className="text-zinc-700 mb-4">O método é PPL 2x (6 dias de treino). O 7º dia é para descanso ativo. Se você tem 20 minutos sobrando, faça esta rotina de Mobilidade + Core para blindar o corpo.</p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900 text-white">
              <th className="p-3 rounded-tl-lg">Exercício</th>
              <th className="p-3">Tempo/Séries</th>
              <th className="p-3 rounded-tr-lg">Foco</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-zinc-200">
              <td className="p-3 font-medium">Prancha Abdominal</td>
              <td className="p-3">3x 45-60s</td>
              <td className="p-3 text-zinc-600">Core (estabilidade)</td>
            </tr>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <td className="p-3 font-medium">Gato-Vaca (Cat-Cow)</td>
              <td className="p-3">2x 15 reps</td>
              <td className="p-3 text-zinc-600">Mobilidade de coluna</td>
            </tr>
            <tr className="border-b border-zinc-200">
              <td className="p-3 font-medium">Alongamento de Flexores de Quadril</td>
              <td className="p-3">2x 30s/perna</td>
              <td className="p-3 text-zinc-600">Postura (quem fica muito sentado)</td>
            </tr>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <td className="p-3 font-medium">Abdominal Supra (curto)</td>
              <td className="p-3">3x 15-20 reps</td>
              <td className="p-3 text-zinc-600">Hipertrofia do reto abdominal</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}

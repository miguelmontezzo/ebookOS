import { PageLayout } from '../components/PageLayout';
import { Calculator, Utensils, ShoppingCart } from 'lucide-react';

export function Macros() {
  return (
    <PageLayout title="PÁGINA 13 — Nutrição: Macros Sem Enrolação" objective="Entender quanto comer para o seu objetivo.">
      <p>Treino é o estímulo, comida é o tijolo. Sem material, a casa não sobe. Esqueça dietas malucas, foque nos números.</p>
      
      <div className="bg-zinc-900 text-white p-6 rounded-2xl my-6">
        <h3 className="font-bold text-emerald-400 mb-4 flex items-center gap-2"><Calculator className="w-5 h-5"/> A Matemática do Corpo</h3>
        <div className="space-y-4 text-sm text-zinc-300">
          <p><strong>TMB (Taxa Metabólica Basal):</strong> O que seu corpo gasta só para existir (fórmula de Mifflin-St Jeor).</p>
          <p><strong>NAF (Nível de Atividade Física):</strong> Multiplicador do seu gasto diário. Para quem treina 6x na semana e trabalha sentado, NAF é ~1,55. Se for ativo no trabalho, ~1,725.</p>
          <p><strong>TDEE (Gasto Energético Total):</strong> TMB x NAF. É a sua manutenção.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="border-2 border-zinc-200 p-6 rounded-2xl">
          <h4 className="font-black text-xl text-zinc-900 mb-2">Caminho 1: RECOMP</h4>
          <p className="text-sm text-zinc-600 mb-4">Para quem quer perder gordura e ganhar massa (falso magro ou leve sobrepeso).</p>
          <ul className="text-sm font-medium text-zinc-800 space-y-1">
            <li>• Calorias: Manutenção ou Déficit leve (-5%)</li>
            <li>• Proteína: 2,0 a 2,2 g/kg</li>
            <li>• Gordura: 0,8 a 1,0 g/kg</li>
            <li>• Carbo: O restante das calorias</li>
          </ul>
        </div>
        <div className="border-2 border-emerald-500 p-6 rounded-2xl bg-emerald-50">
          <h4 className="font-black text-xl text-emerald-900 mb-2">Caminho 2: SUPERÁVIT</h4>
          <p className="text-sm text-emerald-800 mb-4">Para quem é magro e quer crescer (hipertrofia pura).</p>
          <ul className="text-sm font-medium text-emerald-900 space-y-1">
            <li>• Calorias: Superávit leve (+5% a +10%)</li>
            <li>• Proteína: 1,6 a 2,0 g/kg</li>
            <li>• Gordura: 0,8 a 1,0 g/kg</li>
            <li>• Carbo: O restante das calorias (alto)</li>
          </ul>
        </div>
      </div>

      <div className="bg-zinc-100 p-6 rounded-2xl">
        <h4 className="font-bold text-zinc-900 mb-3 uppercase tracking-wider text-sm">Exemplo Calculado (Não copie, calcule o seu)</h4>
        <p className="text-sm text-zinc-600 mb-3"><strong>Dados:</strong> 91kg, 187cm, 34 anos, masculino, NAF 1,725</p>
        <div className="grid grid-cols-2 gap-4 text-sm font-mono bg-white p-4 rounded-lg border border-zinc-200">
          <div>
            <span className="text-zinc-500 block text-xs">TMB</span>
            <strong>1913 kcal</strong>
          </div>
          <div>
            <span className="text-zinc-500 block text-xs">TDEE (Manutenção)</span>
            <strong>~3300 kcal</strong>
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between border-b border-zinc-200 pb-1">
            <span className="text-zinc-600">Recomp (3300 kcal)</span>
            <span className="font-medium">P: 200g | G: 82g | C: ~440g</span>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-1">
            <span className="text-zinc-600">Recomp -5% (3135 kcal)</span>
            <span className="font-medium">P: 200g | G: 82g | C: ~400g</span>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-1">
            <span className="text-zinc-600">Superávit +5% (3465 kcal)</span>
            <span className="font-medium">P: 200g | G: 82g | C: ~482g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-600">Superávit +10% (3630 kcal)</span>
            <span className="font-medium">P: 200g | G: 82g | C: ~523g</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export function Cardapios() {
  return (
    <PageLayout title="PÁGINA 14 — Cardápios e Marmitas" objective="Modelos práticos para não errar na dieta.">
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-zinc-200 shadow-sm p-6 rounded-2xl">
          <h3 className="font-bold text-zinc-900 mb-4 flex items-center gap-2"><Utensils className="w-5 h-5"/> Modelo 4 Refeições</h3>
          <ul className="space-y-3 text-sm text-zinc-700">
            <li><strong>Café da Manhã:</strong> Ovos mexidos + Pão de forma + Fruta</li>
            <li><strong>Almoço:</strong> Arroz + Feijão + Frango grelhado + Salada livre</li>
            <li><strong>Lanche:</strong> Iogurte natural + Whey + Aveia</li>
            <li><strong>Jantar:</strong> Macarrão + Patinho moído + Legumes</li>
          </ul>
        </div>
        <div className="bg-white border border-zinc-200 shadow-sm p-6 rounded-2xl">
          <h3 className="font-bold text-zinc-900 mb-4 flex items-center gap-2"><Utensils className="w-5 h-5"/> Modelo 5 Refeições</h3>
          <ul className="space-y-3 text-sm text-zinc-700">
            <li><strong>Café da Manhã:</strong> Mingau de aveia com Whey</li>
            <li><strong>Lanche Manhã:</strong> Fruta + Castanhas</li>
            <li><strong>Almoço:</strong> Batata doce + Frango + Salada</li>
            <li><strong>Lanche Tarde:</strong> Pão com pasta de amendoim</li>
            <li><strong>Jantar:</strong> Arroz + Peixe/Frango + Legumes</li>
          </ul>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl mb-8">
        <h3 className="font-bold text-emerald-900 mb-4 uppercase tracking-wide text-sm">Otimizando o Treino</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <strong className="text-emerald-800 block mb-1">Pré-Treino (1-2h antes)</strong>
            <p className="text-sm text-emerald-700">Foco em carboidrato de média/rápida absorção e proteína leve. Ex: Banana amassada com aveia e 1 scoop de Whey.</p>
          </div>
          <div>
            <strong className="text-emerald-800 block mb-1">Pós-Treino</strong>
            <p className="text-sm text-emerald-700">Proteína + Carboidrato para repor glicogênio. Ex: Refeição completa (almoço/jantar) ou Shake de Whey + Doce de leite.</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-bold text-zinc-900 mb-4 text-lg flex items-center gap-2"><ShoppingCart className="w-5 h-5"/> Lista de Compras Base</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200"><strong>Proteínas:</strong> Ovos, Frango, Patinho, Whey, Iogurte.</div>
          <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200"><strong>Carbos:</strong> Arroz, Aveia, Batata, Macarrão, Pão, Frutas.</div>
          <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200"><strong>Gorduras:</strong> Azeite, Pasta de Amendoim, Castanhas.</div>
          <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200"><strong>Micros:</strong> Brócolis, Cenoura, Alface, Tomate.</div>
        </div>
      </div>

      <div className="bg-zinc-900 text-white p-6 rounded-2xl">
        <h3 className="font-bold text-emerald-400 mb-4 uppercase tracking-wide text-sm">Cardápios Correria (Marmitas)</h3>
        <div className="space-y-4 text-sm text-zinc-300">
          <div className="border-b border-zinc-800 pb-3">
            <strong className="text-white">Marmita 1 (Clássica):</strong> 150g Arroz branco + 120g Frango desfiado + Brócolis.
          </div>
          <div className="border-b border-zinc-800 pb-3">
            <strong className="text-white">Marmita 2 (Força):</strong> 150g Macarrão + 120g Patinho moído com molho de tomate.
          </div>
          <div>
            <strong className="text-white">Marmita 3 (Low Volume):</strong> 150g Purê de batata + 120g Iscas de frango acebolado.
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

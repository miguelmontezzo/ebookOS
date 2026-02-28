import { GoogleGenAI, Type, Schema } from '@google/genai';

// Extract key safely
const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;

// Initialize the SDK only if key exists to prevent browser crash
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface GeneratedPage {
    title: string;
    content: string; // HTML + Markdown content
}

export interface GeneratedModule {
    module_name: string;
    pages: GeneratedPage[];
}

// Define the exact JSON schema we want the model to return
const ebookSchema: Schema = {
    type: Type.ARRAY,
    description: "Um array de Módulos (Seções principais do Ebook). Cada Módulo contém Páginas/Capítulos.",
    items: {
        type: Type.OBJECT,
        properties: {
            module_name: {
                type: Type.STRING,
                description: "O título do módulo. Ex: '1. Introdução', '2. Fundamentos Básicos'",
            },
            pages: {
                type: Type.ARRAY,
                description: "As páginas que pertencem a este módulo.",
                items: {
                    type: Type.OBJECT,
                    properties: {
                        title: {
                            type: Type.STRING,
                            description: "O título da página/capítulo.",
                        },
                        content: {
                            type: Type.STRING,
                            description: "O conteúdo completo desta página em HTML rico com classes TailwindCSS. Consulte o catálogo de componentes visuais fornecido no system prompt. NUNCA use markdown puro (**, ##, etc). SEMPRE use tags HTML com classes Tailwind.",
                        }
                    },
                    required: ["title", "content"]
                }
            }
        },
        required: ["module_name", "pages"]
    }
};

// ----- COMPONENT CATALOG -----
// This is the heart of the AI design system. It teaches Gemini EXACTLY which
// HTML patterns to use, extracted from the real /o-metodo and /metodoEMP ebooks.
// Uses 'indigo' as placeholder color — replaced dynamically via .replaceAll() in generateEbookContent.
const COMPONENT_CATALOG = `
=== CATÁLOGO DE COMPONENTES VISUAIS (USE OBRIGATORIAMENTE) ===

REGRA DE OURO: Nunca escreva markdown puro. Nunca use ** para negrito, use <strong>. Nunca use ## para título, use <h3>. Nunca use - para lista, use <ul><li>. Todo conteúdo DEVE ser HTML com classes Tailwind CSS. Use "class" e não "className".

--- COMPONENTE 1: CAPA (Primeira página obrigatória) ---
<div class="min-h-[70vh] flex flex-col items-center justify-center text-center bg-zinc-900 text-white rounded-3xl p-8 relative overflow-hidden">
  <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-zinc-900 to-zinc-900"></div>
  <div class="z-10 space-y-6 max-w-3xl">
    <div class="inline-block bg-indigo-500 text-white font-black px-4 py-1 rounded-full text-sm tracking-widest uppercase mb-4">NOME DO EBOOK</div>
    <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-tight">TÍTULO GRANDE.<br/><span class="text-indigo-400">SUBTÍTULO DESTAQUE.</span></h1>
    <p class="text-xl md:text-2xl text-zinc-300 font-light max-w-2xl mx-auto mt-6">Descrição curta. <strong class="text-white font-bold">Frase de impacto.</strong></p>
    <div class="mt-12 flex flex-wrap justify-center gap-4">
      <span class="bg-zinc-800 px-4 py-2 rounded-lg text-sm font-medium text-zinc-300">✦ Benefício 1</span>
      <span class="bg-zinc-800 px-4 py-2 rounded-lg text-sm font-medium text-zinc-300">✦ Benefício 2</span>
      <span class="bg-zinc-800 px-4 py-2 rounded-lg text-sm font-medium text-zinc-300">✦ Benefício 3</span>
    </div>
  </div>
</div>

    --- COMPONENTE 2: CAIXA DE DESTAQUE(Info Box)-- -
        <div class="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl mb-6" >
            <h3 class="font-bold text-xl mb-3 text-zinc-900" > Título da Caixa </h3>
                < p class="text-zinc-700" > Texto explicativo com < strong > destaques em negrito < /strong>.</p >
                    </div>

    --- COMPONENTE 3: GRID DE CARDS(2, 3 ou 4 colunas)-- -
        <div class="grid md:grid-cols-3 gap-6 my-8" >
            <div class="bg-emerald-50 p-6 rounded-2xl border border-emerald-100" >
                <h4 class="font-bold text-emerald-900 mb-2" > Card 1 </h4>
                    < p class="text-sm text-emerald-800" > Descrição do card.</p>
                        </div>
                        < div class= "bg-emerald-50 p-6 rounded-2xl border border-emerald-100" >
                        <h4 class="font-bold text-emerald-900 mb-2" > Card 2 </h4>
                            < p class="text-sm text-emerald-800" > Descrição do card.</p>
                                </div>
                                < div class= "bg-emerald-50 p-6 rounded-2xl border border-emerald-100" >
                                <h4 class="font-bold text-emerald-900 mb-2" > Card 3 </h4>
                                    < p class="text-sm text-emerald-800" > Descrição do card.</p>
                                        </div>
                                        </div>

--- COMPONENTE 4: ALERTA ESCURO(Dark Alert Box)-- -
        <div class="bg-zinc-900 text-white p-6 rounded-2xl my-8" >
            <h3 class="font-bold text-emerald-400 mb-2 uppercase tracking-wide text-sm" > Título do Alerta </h3>
                < ul class= "space-y-3 mt-4" >
                <li class="flex items-start gap-3" > <span class="text-emerald-500" >✓</span> <span><strong>Item negrito:</strong > descrição do item.< /span></li >
                    <li class= "flex items-start gap-3" > <span class="text-emerald-500" >✓</span> <span><strong>Item negrito:</strong > descrição do item.< /span></li >
                        </ul>
                        </div>

--- COMPONENTE 5: CARDS DE NÍVEL(Level Cards com Badge)-- -
        <div class="space-y-4 my-6" >
            <div class="border border-zinc-200 p-6 rounded-2xl" >
                <div class="flex items-center gap-3 mb-2" >
                    <span class="bg-zinc-200 text-zinc-700 font-bold px-3 py-1 rounded-full text-sm" > NÍVEL 1 </span>
                        < h3 class="font-bold text-lg" > Título do Nível </h3>
                            </div>
                            < p class= "text-zinc-600 text-sm" > Descrição do nível.</p>
                                </div>
                                < div class= "border border-zinc-200 p-6 rounded-2xl" >
                                <div class="flex items-center gap-3 mb-2" >
                                    <span class="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-sm" > NÍVEL 2 </span>
                                        < h3 class="font-bold text-lg" > Título do Nível </h3>
                                            </div>
                                            < p class= "text-zinc-600 text-sm" > Descrição do nível.</p>
                                                </div>
                                                </div>

--- COMPONENTE 6: CALLOUT COM BORDA LATERAL-- -
        <div class="bg-zinc-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl my-6" >
            <h3 class="font-bold text-zinc-900 mb-2" > Título do Callout </h3>
                < p class= "text-sm text-zinc-700" > Conteúdo do callout.</p>
                    </div>

--- COMPONENTE 7: TABELA DE DADOS-- -
        <div class="overflow-x-auto my-6" >
            <table class="w-full text-left border-collapse" >
                <thead>
                <tr class="bg-zinc-900 text-white" >
                    <th class="p-3 rounded-tl-lg" > Coluna 1 </th>
                        < th class="p-3" > Coluna 2 </th>
                            < th class="p-3 rounded-tr-lg" > Coluna 3 </th>
                                </tr>
                                </thead>
                                < tbody class="text-sm" >
                                    <tr class="border-b border-zinc-200" >
                                        <td class="p-3 font-medium" > Dado 1 </td>
                                            < td class="p-3" > Dado 2 </td>
                                                < td class="p-3 text-zinc-600" > Dado 3 </td>
                                                    </tr>
                                                    < tr class="border-b border-zinc-200 bg-zinc-50" >
                                                        <td class="p-3 font-medium" > Dado A </td>
                                                            < td class="p-3" > Dado B </td>
                                                                < td class="p-3 text-zinc-600" > Dado C </td>
                                                                    </tr>
                                                                    </tbody>
                                                                    </table>
                                                                    </div>

    --- COMPONENTE 8: WARNING / TIP BOX COLORIDO-- -
        <div class="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3" >
            <span class="text-amber-500 mt-0.5" >⚠️</span>
                < p class="text-sm text-amber-900" > <strong>Dica Importante: </strong> Texto da dica aqui.</p >
                    </div>

    --- COMPONENTE 9: FAQ CARD-- -
        <div class="space-y-4 my-6" >
            <div class="bg-white border border-zinc-200 p-5 rounded-xl" >
                <h4 class="font-bold text-zinc-900 flex items-start gap-2" >❓ Pergunta frequente aqui ? </h4>
                    < p class="text-sm text-zinc-600 mt-2" > Resposta detalhada aqui.</p>
                        </div>
                        </div>

    --- COMPONENTE 10: CARD DE PASSO - A - PASSO NUMERADO-- -
        <div class="grid md:grid-cols-3 gap-6 mb-8" >
            <div class="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm" >
                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600" > <strong>1 < /strong></div >
                    <p class="font-medium text-zinc-800" > <strong>Passo 1: </strong> Descrição</p >
                        </div>
                        < div class="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm" >
                            <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600" > <strong>2 < /strong></div >
                                <p class="font-medium text-zinc-800" > <strong>Passo 2: </strong> Descrição</p >
                                    </div>
                                    </div>

    --- COMPONENTE 11: FEATURE CARD COM ÍCONE-- -
        <div class="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm my-4" >
            <div class="flex items-start gap-4" >
                <div class="bg-zinc-100 p-3 rounded-xl text-zinc-600 mt-1" >🎯</div>
                    < div >
                    <h4 class="font-bold text-lg text-zinc-900" > Título da Feature </h4>
                        < p class="text-zinc-500 text-sm mt-1 mb-3" > <strong>Detalhe: </strong> informação.</p >
                            <div class="bg-zinc-50 p-4 rounded-lg border border-zinc-100" >
                                <p class="font-medium text-indigo-700 italic" > "Exemplo ou citação aqui." </p>
                                    </div>
                                    </div>
                                    </div>
                                    </div>

    --- COMPONENTE 12: SCRIPT / ROTEIRO(código / monospace)-- -
        <div class="bg-zinc-50 p-4 rounded-lg border border-zinc-200 text-sm font-mono text-zinc-700 my-4" >
            <span class="text-indigo-600 block mb-1" > [SEÇÃO 1] </span>
  Texto do script aqui.< br /> <br/>
        < span class="text-orange-600 block mb-1" > [SEÇÃO 2] </span>
  Continuação do script.
</div>

--- COMPONENTE 13: BLOCO DE ENCERRAMENTO / CTA-- -
        <div class="bg-zinc-900 text-center p-8 rounded-3xl text-white my-8" >
            <h2 class="text-3xl font-black mb-4" > FRASE DE ENCERRAMENTO </h2>
                < p class="text-zinc-300 max-w-lg mx-auto mb-8" > Texto motivacional final.</p>
                    </div>

    --- COMPONENTE 14: GRID DE DADOS(font - mono para números)-- -
        <div class="bg-zinc-100 p-6 rounded-2xl my-6" >
            <h4 class="font-bold text-zinc-900 mb-3 uppercase tracking-wider text-sm" > Título </h4>
                < div class="grid grid-cols-2 gap-4 text-sm font-mono bg-white p-4 rounded-lg border border-zinc-200" >
                    <div><span class="text-zinc-500 block text-xs" > Label < /span><strong>Valor</strong > </div>
                        < div > <span class="text-zinc-500 block text-xs" > Label < /span><strong>Valor</strong > </div>
                            </div>
                            </div>

    --- COMPONENTE 15: CAIXA COLORIDA TEMÁTICA(indigo, orange, emerald)-- -
        <div class="bg-indigo-50 border border-indigo-200 p-6 rounded-2xl mb-6" >
            <h3 class="font-bold text-xl mb-3 text-indigo-900" > Título </h3>
                < p class="text-indigo-800" > Texto explicativo.</p>
                    </div>

    --- COMPONENTE 16: LISTA DE COMPRAS / GRID DE TAGS-- -
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm my-6" >
            <div class="bg-zinc-50 p-3 rounded-lg border border-zinc-200" > <strong>Categoria: </strong> Item 1, Item 2.</div >
                <div class="bg-zinc-50 p-3 rounded-lg border border-zinc-200" > <strong>Categoria: </strong> Item 1, Item 2.</div >
                    </div>

    --- COMPONENTE 17: CHECKLIST INTERATIVO(dark bg)-- -
        <div class="bg-emerald-900 text-white p-6 rounded-2xl my-6" >
            <h3 class="font-bold text-emerald-400 mb-2" > Checklist </h3>
                < div class="grid grid-cols-2 gap-4 mt-4" >
                    <label class="flex items-center gap-2 text-sm" > <input type="checkbox" class="rounded text-emerald-500" /> Item 1 </label>
                        < label class="flex items-center gap-2 text-sm" > <input type="checkbox" class="rounded text-emerald-500" /> Item 2 </label>
                            </div>
                            </div>

    --- COMPONENTE 18: BADGES STATUS(Erro / Acerto / Ação)-- -
        <ul class="space-y-3 text-sm my-6" >
            <li class="flex gap-3" > <span class="bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded text-xs" > ERRO < /span> <span>Descrição do erro.</span > </li>
                < li class="flex gap-3" > <span class="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-xs" > ACERTO < /span> <span>Descrição do acerto.</span > </li>
                    < li class="flex gap-3" > <span class="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-xs" > AÇÃO < /span> <span>Descrição da ação.</span > </li>
                        </ul>

                        === FIM DO CATÁLOGO ===
                            `;

/**
 * Função responsável por chamar o Gemini, passar o contexto e retornar o Ebook já estruturado
 */
export async function generateEbookContent(theme: string, targetAudience: string, baseText: string, themeColor: string = 'indigo'): Promise<GeneratedModule[]> {
    if (!ai) {
        throw new Error("Chave da API do Google Gemini não configurada. Por favor, adicione GEMINI_API_KEY='sua_chave' no arquivo .env na raiz do projeto e reinicie o servidor.");
    }

    try {
        // Replace placeholder color with the user's chosen theme color
        const catalog = COMPONENT_CATALOG.replaceAll('indigo', themeColor);

        const systemInstruction = `Você é um designer e autor especialista em infoprodutos digitais premium. 
Seu objetivo é criar a estrutura de módulos e todo o conteúdo visual de um e - book altamente vendável, envolvente e interativo.

REGRAS ABSOLUTAS DE FORMATAÇÃO:
1. NUNCA use markdown puro. Nunca use **, ##, -, > ou qualquer sintaxe markdown.
2. SEMPRE use HTML puro com classes TailwindCSS conforme o catálogo abaixo.
3. Use "class" nos atributos HTML, NUNCA "className".
4. Cada página DEVE usar pelo menos 3 componentes diferentes do catálogo.
5. Intercale blocos visuais (cards, tabelas, alertas, FAQ, checklists, callouts) com parágrafos <p> simples.
6. Para negrito use <strong>, para itálico use <em>.
7. Para parágrafos use <p class="text-lg text-zinc-700 mb-4">.
8. Para subtítulos use <h3 class="text-2xl font-bold text-zinc-900 mb-4">.
9. A primeira página do primeiro módulo DEVE ser a CAPA usando o Componente 1.

PADRÃO OBRIGATÓRIO DO EBOOK (REFERÊNCIA /o-metodo):
- Estruture em módulos com progressão pedagógica clara (início > diagnóstico > execução > ajuste > fechamento).
- Inclua blocos de "nível"/"diagnóstico" com critérios objetivos (iniciante, intermediário, avançado).
- Inclua elementos interativos em todas as páginas-chave (checklist, FAQ, cards de ação, passo a passo).
- Texto sempre escaneável: títulos fortes, subtítulos curtos, bullets objetivos e blocos visuais balanceados.
- Evite páginas "chapadas" de texto corrido. Priorize leitura premium estilo ebook interativo.
- Mantenha consistência visual entre páginas (tom editorial, hierarquia tipográfica e ritmo de componentes).

Se o usuário fornecer um texto base, organize-o e expanda-o usando os componentes visuais.
Se o usuário NÃO fornecer texto base, gere conteúdo espetacular e longo do zero.
Nunca responda com explicações, apenas com o JSON bruto.

        ${catalog} `;

        const promptTemplate = `
Crie um e - book completo e visualmente rico com:
    - Tema: ${theme}
    - Público Alvo: ${targetAudience}
${baseText ? `- Texto base do autor (organize, expanda e formate com os componentes visuais):\n\n${baseText}\n` : ''}

    IMPORTANTE: Cada página deve parecer uma landing page premium. Use MUITOS componentes visuais do catálogo (cards, tabelas, alertas coloridos, callouts, badges).
Não economize em elementos visuais. Cada página deve ter no mínimo 3 blocos visuais diferentes.

Padronize no estilo do ebook /o-metodo:
- pelo menos 1 bloco de diagnóstico ou nível no ebook
- pelo menos 1 checklist interativo
- pelo menos 1 FAQ visual
- pelo menos 1 página de progressão/ajustes finais
- fechamento com CTA forte e prático.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: promptTemplate,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: ebookSchema,
                temperature: 0.7,
            }
        });

        // Parse the text which is guaranteed to be JSON matching the schema
        const textResponse = response.text;
        if (!textResponse) throw new Error("A IA não retornou nenhum texto.");

        const data: GeneratedModule[] = JSON.parse(textResponse);
        return data;

    } catch (error) {
        console.error("Erro na geração de Ebook via Gemini:", error);
        throw error;
    }
}

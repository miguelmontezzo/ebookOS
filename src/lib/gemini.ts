import { GoogleGenAI, Type, Schema } from '@google/genai';

// Extract key safely
const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;

// Initialize the SDK only if key exists to prevent browser crash
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface GeneratedPage {
    title: string;
    content: string; // Markdown content
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
                            description: "O título da página/capítulo. Ex: 'O que é o Método?', 'Mitos e Verdades'",
                        },
                        content: {
                            type: Type.STRING,
                            description: "O conteúdo completo deste capítulo. Você DEVE mesclar Markdown tradicional com tags HTML e classes do TailwindCSS para criar um visual premium. Use as cores zinc, emerald e indigo. Exemplos obrigatórios de uso: 1. Caixas de Destaque: `<div className=\"bg-zinc-50 border border-zinc-200 p-6 rounded-2xl mb-6\"><h3 className=\"font-bold text-xl mb-3 text-zinc-900\">Título</h3><p>Texto</p></div>` 2. Cards em Grid: `<div className=\"grid md:grid-cols-2 gap-6 mb-6\"><div className=\"bg-emerald-50 p-6 rounded-2xl border border-emerald-100\"><h4 className=\"font-bold text-emerald-900 mb-2\">Card 1</h4><p className=\"text-sm text-emerald-800\">Texto</p></div>...</div>` 3. Alertas: `<div className=\"bg-emerald-900 text-white p-6 rounded-2xl my-8\"><h3 className=\"font-bold text-emerald-400 mb-2\">Aviso</h3><p>Texto</p></div>`. NUNCA use markdown puro se puder usar uma dessas caixas para destacar a informação.",
                        }
                    },
                    required: ["title", "content"]
                }
            }
        },
        required: ["module_name", "pages"]
    }
};

/**
 * Função responsável por chamar o Gemini, passar o contexto e retornar o Ebook já estruturado
 */
export async function generateEbookContent(theme: string, targetAudience: string, baseText: string): Promise<GeneratedModule[]> {
    if (!ai) {
        throw new Error("Chave da API do Google Gemini não configurada. Por favor, adicione GEMINI_API_KEY='sua_chave' no arquivo .env na raiz do projeto e reinicie o servidor.");
    }

    try {
        const systemInstruction = `Você é um copywriter e autor especialista em infoprodutos top de mercado. 
Seu objetivo é criar a estrutura de módulos e todo o texto de um e-book altamente vendável, envolvente e interativo.
Se o usuário lhe fornecer um texto base, transcrição ou resumo, seu trabalho é organizá-lo, limpá-lo, expandi-lo profissionalmente e fatiá-lo em Capítulos ordenados.
Se o usuário NÃO fornecer texto base (fornecer apenas um tema), use seu próprio conhecimento para gerar um conteúdo espetacular, rico e longo.
Nunca responda com explicações, apenas com o JSON bruto da estrutura final do ebook.`;

        const promptTemplate = `
Crie um e-book completo com as seguintes características:
- Tema: ${theme}
- Público Alvo: ${targetAudience}
${baseText ? `- Utilize como base de conhecimento OBRIGATÓRIA o seguinte texto raw fornecido pelo autor (organize, expanda e refine-o):\n\n${baseText}\n` : ''}

Atenção redobrada ao preencher a chave 'content'. Você não está escrevendo um txt simples, você está desenhando uma página web! 
É OBRIGATÓRIO o uso intenso de divs com classes Tailwind baseadas no Ebook Interativo (ex: bg-zinc-50, border-zinc-200, rounded-2xl, p-6, grid, md:grid-cols-2, bg-emerald-50, text-emerald-900, bg-indigo-50, text-indigo-900). 
Intercale parágrafos soltos com essas caixas ricas para prender a atenção do leitor.`;

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

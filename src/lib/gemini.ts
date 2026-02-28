import { GoogleGenAI, Type, Schema } from '@google/genai';

// Initialize the SDK. We use process.env to not expose it on the client
// but since this is Vite, the env var should be in vite.config.ts define section
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
                            description: "O conteúdo completo deste capítulo em linguagem rica Markdown. Use marcação para títulos (###), negritos, listas numeradas, citações e crie textos envolventes, fluidos e didáticos. Desenvolva o texto profundamente.",
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

Atenção redobrada ao preencher a chave 'content' com Markdown. Divida bem os parágrafos, ensine passo a passo e mantenha o leitor preso da primeira a última palavra.`;

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

import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const BASE_PROMPT = `Você é um Diretor de Arte Editorial especializado em capas minimalistas de alto padrão.

Crie apenas a arte frontal da capa de um livro.

Título: {TITULO}
Autor: {AUTOR}

Especificações obrigatórias:
• Formato A4 vertical (210x297mm)
• Proporção real de impressão
• Alta resolução (300 DPI)
• Apenas a capa frontal plana
• Sem mockup 3D
• Sem livro físico
• Sem fundo externo
• Apenas a arte da capa

Estética:
• Minimalista
• Luxuosa
• Clean
• Sofisticada
• Moderna
• Direta

Direção visual:
• Muito espaço negativo
• Paleta reduzida (máximo 2 cores principais)
• Fundo sólido ou textura extremamente sutil
• Pode usar preto profundo, branco puro, bege premium, azul marinho, verde escuro ou fundo claro sofisticado
• Se usar dourado, que seja metálico elegante e discreto

Tipografia:
• Fonte serifada elegante OU sans-serif premium moderna
• Título com forte presença visual
• Nome do autor menor, equilibrado e refinado
• Kerning bem ajustado
• Hierarquia clara

Composição:
• Centralizada ou perfeitamente balanceada
• Margens bem definidas
• Grid editorial invisível
• Nenhum elemento clichê
• Se houver símbolo, deve ser minimalista e conceitual

Resultado esperado:
Uma capa que pareça publicada por uma grande editora internacional.
Impacto silencioso.
Luxo discreto.
Autoridade imediata.`;

export async function generateCoverImageFile(title: string, author: string): Promise<File | null> {
  if (!ai) return null;

  const prompt = BASE_PROMPT
    .replace('{TITULO}', title)
    .replace('{AUTOR}', author || 'Autor desconhecido');

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '3:4',
      },
    });

    const imageBytes = response?.generatedImages?.[0]?.image?.imageBytes;
    if (!imageBytes) return null;

    const binary = atob(imageBytes);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: 'image/jpeg' });
    return new File([blob], `cover-${Date.now()}.jpg`, { type: 'image/jpeg' });
  } catch (err) {
    console.error('Erro ao gerar capa automática:', err);
    return null;
  }
}

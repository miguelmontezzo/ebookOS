import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;
const preferredImageModel = (import.meta as any).env?.VITE_COVER_IMAGE_MODEL || 'nano-banana-2';

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

async function cropToA4(file: File): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const targetRatio = 210 / 297; // A4 vertical
      const sourceRatio = img.width / img.height;

      let sx = 0;
      let sy = 0;
      let sw = img.width;
      let sh = img.height;

      if (sourceRatio > targetRatio) {
        // imagem mais larga: corta laterais
        sw = img.height * targetRatio;
        sx = (img.width - sw) / 2;
      } else if (sourceRatio < targetRatio) {
        // imagem mais alta: corta topo/base
        sh = img.width / targetRatio;
        sy = (img.height - sh) / 2;
      }

      const outW = 1240;
      const outH = Math.round(outW / targetRatio);
      const canvas = document.createElement('canvas');
      canvas.width = outW;
      canvas.height = outH;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        resolve(file);
        return;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (!blob) {
            resolve(file);
            return;
          }
          resolve(new File([blob], `cover-${Date.now()}-a4.jpg`, { type: 'image/jpeg' }));
        },
        'image/jpeg',
        0.95
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };

    img.src = url;
  });
}

async function tryGenerate(model: string, prompt: string): Promise<File | null> {
  const response = await ai!.models.generateImages({
    model,
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

  const raw = new File([new Blob([bytes], { type: 'image/jpeg' })], `cover-${Date.now()}.jpg`, { type: 'image/jpeg' });
  return await cropToA4(raw);
}

export async function generateCoverImageFile(title: string, author: string): Promise<File | null> {
  if (!ai) return null;

  const prompt = BASE_PROMPT
    .replace('{TITULO}', title)
    .replace('{AUTOR}', author || 'Autor desconhecido');

  try {
    // 1) Preferido: Nano Banana 2 (configurável por env)
    const preferred = await tryGenerate(preferredImageModel, prompt);
    if (preferred) return preferred;

    // 2) Fallback confiável
    return await tryGenerate('imagen-4.0-generate-001', prompt);
  } catch (err) {
    console.error('Erro ao gerar capa automática:', err);
    try {
      return await tryGenerate('imagen-4.0-generate-001', prompt);
    } catch {
      return null;
    }
  }
}

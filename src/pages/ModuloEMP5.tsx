import { PageLayout } from '../components/PageLayout';
import { Smartphone, Layout, Mail, FileCheck, Search, Edit3, AlertCircle, CheckCircle2 } from 'lucide-react';

export function Pratica() {
    return (
        <PageLayout title="CAPÍTULO 5, 6 E 7 — Na Prática" objective="Ver a estrutura aplicada em múltiplos formatos e aprender a validar.">
            <h3 className="text-2xl font-black text-zinc-900 mb-6">Roteiros Práticos por Formato</h3>

            <div className="space-y-6">
                {/* REELS */}
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-blue-400 transition-colors">
                    <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2 mb-4">
                        <Smartphone className="w-6 h-6 text-blue-500" />
                        1. Reel / TikTok (60 Segundos)
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm font-mono text-zinc-700 bg-zinc-50 p-4 rounded-xl">
                        <div className="border border-zinc-200 p-3 rounded-lg bg-white">
                            <span className="text-blue-600 font-bold block mb-1">[0-3s] GANCHO</span>
                            "Você sabe por que seus Reels têm 50 views?"
                        </div>
                        <div className="border border-zinc-200 p-3 rounded-lg bg-white">
                            <span className="text-yellow-600 font-bold block mb-1">[4-35s] CONFLITO</span>
                            "Não é falta de qualidade. 95% não entende a estrutura EMP. E o algo mata o vídeo."
                        </div>
                        <div className="border border-zinc-200 p-3 rounded-lg bg-white">
                            <span className="text-emerald-600 font-bold block mb-1">[36-60s] RESOLUÇÃO</span>
                            "Por isso criamos o método. Salva esse post e manda pra alguém."
                        </div>
                    </div>
                </div>

                {/* CARROSSEL */}
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-blue-400 transition-colors">
                    <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2 mb-4">
                        <Layout className="w-6 h-6 text-blue-500" />
                        2. Carrossel (10-15 Slides)
                    </h4>
                    <p className="text-zinc-600 text-sm mb-3"><strong>Slide 1:</strong> Gancho | <strong>Slides 2-10:</strong> MAS (Aprofundamento) | <strong>Slides 11-15:</strong> Resolução + CTA.</p>
                </div>

                {/* EMAIL */}
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-blue-400 transition-colors">
                    <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2 mb-4">
                        <Mail className="w-6 h-6 text-blue-500" />
                        3. E-mail ou WhatsApp
                    </h4>
                    <p className="text-zinc-600 text-sm mb-3">
                        <strong>Assunto/Abertura:</strong> "Seu marketing não funciona" (Gancho)<br />
                        <strong>Desenvolvimento:</strong> "A maioria cria sem estrutura e gancho de 3s..." (Conflito)<br />
                        <strong>Fechamento:</strong> "Veja o método neste link estruturado." (Resolução)
                    </p>
                </div>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl mt-12 text-white">
                <h3 className="text-2xl font-black text-blue-400 mb-6 flex items-center gap-3">
                    <Edit3 className="w-6 h-6" /> Passo a Passo para Criar
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold text-lg text-zinc-100 flex items-center gap-2 mb-3">
                            <Search className="w-5 h-5 text-blue-500" /> 1. Defina o E
                        </h4>
                        <p className="text-sm text-zinc-400">Qual a dor do público? Ex: "Pessoas com reels falidos". Qual o gancho magnético?</p>

                        <h4 className="font-bold text-lg text-zinc-100 flex items-center gap-2 mb-3 mt-6">
                            <AlertCircle className="w-5 h-5 text-yellow-500" /> 2. Defina o Mas
                        </h4>
                        <p className="text-sm text-zinc-400">O que aprofunda? (É falta de estrutura, e não de sorte). Crie 3 camadas.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-zinc-100 flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 3. Defina o Por Isso
                        </h4>
                        <p className="text-sm text-zinc-400">Qual o valor prático no final? E qual será o CTA exato da tela final?</p>

                        <h4 className="font-bold text-lg text-zinc-100 flex items-center gap-2 mb-3 mt-6">
                            <FileCheck className="w-5 h-5 text-indigo-400" /> 4. Checklist Final
                        </h4>
                        <p className="text-sm text-zinc-400">Eu assistiria duas vezes? O ritmo verbal acompanha o visual? O CTA tem propósito?</p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

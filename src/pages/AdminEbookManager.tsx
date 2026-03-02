import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { uploadCoverToSupabase } from '../lib/uploadCover';
import { generateCoverImageFile } from '../lib/coverGenerator';
import { Users, Lock, ChevronLeft, Plus, Minus, Trash2, Save, Loader2, BookOpen, Settings, Dices, ImagePlus, MessageCircle, Copy, Check } from 'lucide-react';
import { EBOOK_MODULES } from '../config/ebookModules';
import ColorPicker from '../components/ColorPicker';

export default function AdminEbookManager() {
    const { id } = useParams();
    const [ebook, setEbook] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'alunos' | 'regras' | 'conteudo' | 'config'>('alunos');
    const [loading, setLoading] = useState(true);

    // Alunos State
    const [alunos, setAlunos] = useState<any[]>([]);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isAddingAluno, setIsAddingAluno] = useState(false);
    const [copiedAlunoId, setCopiedAlunoId] = useState<string | null>(null);

    // Regras State
    const [regras, setRegras] = useState<any[]>([]);
    const [dynamicModuleNames, setDynamicModuleNames] = useState<string[]>([]);
    const [newModuloNome, setNewModuloNome] = useState('');
    const [newDiasLiberacao, setNewDiasLiberacao] = useState('');
    const [isAddingRegra, setIsAddingRegra] = useState(false);

    // Conteúdo State
    const [contentModules, setContentModules] = useState<any[]>([]);
    const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
    const [selectedPageIndex, setSelectedPageIndex] = useState(0);
    const [isSavingContent, setIsSavingContent] = useState(false);
    const [isAdvancedMode, setIsAdvancedMode] = useState(false);
    const editorRef = useRef<HTMLDivElement | null>(null);

    // Config State
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editCover, setEditCover] = useState('');
    const [isSavingSettings, setIsSavingSettings] = useState(false);
    const [editThemeColor, setEditThemeColor] = useState('indigo');
    const [coverFileSettings, setCoverFileSettings] = useState<File | null>(null);
    const [coverPreviewSettings, setCoverPreviewSettings] = useState<string | null>(null);
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const [isRegeneratingCover, setIsRegeneratingCover] = useState(false);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            if (!id) return;

            // Carrega Ebook
            const { data: ebookData } = await supabase.from('ebooks').select('*').eq('id', id).single();
            setEbook(ebookData);

            if (ebookData) {
                setEditTitle(ebookData.title || '');
                setEditDescription(ebookData.description || '');
                setEditCover(ebookData.cover_url || '');
                setEditThemeColor(ebookData.theme_color || 'indigo');

                // Carrega Alunos
                await fetchAlunos();
                // Carrega Regras
                await fetchRegras();

                // Carrega conteúdo JSON para editor + nomes dinâmicos
                const { data: contentData } = await supabase
                    .from('ebook_contents')
                    .select('content_json')
                    .eq('ebook_id', ebookData.id)
                    .single();

                if (contentData?.content_json) {
                    setContentModules(contentData.content_json);

                    if (!EBOOK_MODULES[ebookData.slug]) {
                        const names = contentData.content_json.map((m: any) => m.module_name);
                        setDynamicModuleNames(names);
                    }
                }
            }
            setLoading(false);
        }
        loadData();
    }, [id]);

    const fetchAlunos = async () => {
        const { data } = await supabase.from('alunos').select('*').eq('ebook_id', id).order('created_at', { ascending: false });
        if (data) setAlunos(data);
    };

    const fetchRegras = async () => {
        const { data } = await supabase.from('modulos_regras').select('*').eq('ebook_id', id).order('created_at', { ascending: true });
        if (data) setRegras(data);
    };

    const handleAddAluno = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail || !newPassword) return;
        setIsAddingAluno(true);
        const { error } = await supabase.from('alunos').insert([
            { ebook_id: id, email: newEmail, password: newPassword }
        ]);
        if (!error) {
            setNewEmail('');
            setNewPassword('');
            await fetchAlunos();
        } else {
            alert('Erro ao adicionar aluno: ' + error.message);
        }
        setIsAddingAluno(false);
    };

    const handleGeneratePassword = () => {
        const pass = Math.random().toString(36).substring(2, 10);
        setNewPassword(pass);
    };

    const handleRemoverAluno = async (alunoId: string) => {
        if (!confirm('Remover o acesso deste aluno ao Ebook?')) return;
        await supabase.from('alunos').delete().eq('id', alunoId);
        await fetchAlunos();
    };

    const buildAccessMessage = (aluno: any) => {
        const loginUrl = `${window.location.origin}/${ebook.slug}/login`;
        return `🚀 Acesso liberado ao ${ebook.title}\n\n📧 Login: ${aluno.email}\n🔒 Senha: ${aluno.password}\n\n👉 Entrar agora: ${loginUrl}`;
    };

    const handleShareAccess = (aluno: any) => {
        if (!ebook?.slug) return;
        const msg = encodeURIComponent(buildAccessMessage(aluno));
        const waUrl = `https://wa.me/?text=${msg}`;
        window.open(waUrl, '_blank');
    };

    const handleQuickLogin = (aluno: any) => {
        if (!ebook?.slug) return;
        const params = new URLSearchParams({
            email: aluno.email,
            password: aluno.password,
            autologin: '1'
        });
        window.open(`${window.location.origin}/${ebook.slug}/login?${params.toString()}`, '_blank');
    };

    const handleCopyAccess = async (aluno: any) => {
        if (!ebook?.slug) return;
        await navigator.clipboard.writeText(buildAccessMessage(aluno));
        setCopiedAlunoId(aluno.id);
        setTimeout(() => setCopiedAlunoId(null), 1800);
    };

    const handleAddRegra = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newModuloNome || !newDiasLiberacao) return;
        setIsAddingRegra(true);
        const { error } = await supabase.from('modulos_regras').insert([
            { ebook_id: id, modulo_nome: newModuloNome, dias_liberacao: parseInt(newDiasLiberacao) }
        ]);
        if (!error) {
            setNewModuloNome('');
            setNewDiasLiberacao('');
            await fetchRegras();
        } else {
            alert('Erro ao adicionar regra: ' + error.message);
        }
        setIsAddingRegra(false);
    };

    const handleRemoverRegra = async (regraId: string) => {
        const { error } = await supabase.from('modulos_regras').delete().eq('id', regraId);
        if (error) alert('Erro ao remover regra: ' + error.message);
        await fetchRegras();
    };

    const handleUpdateDias = async (regraId: string, novosDias: number) => {
        const { error } = await supabase.from('modulos_regras').update({ dias_liberacao: novosDias }).eq('id', regraId);
        if (error) alert('Erro ao atualizar regra: ' + error.message);
        await fetchRegras();
    };

    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingSettings(true);
        const { error } = await supabase.from('ebooks').update({
            title: editTitle,
            description: editDescription,
            cover_url: editCover,
            theme_color: editThemeColor
        }).eq('id', id);

        if (!error) {
            setEbook({ ...ebook, title: editTitle, description: editDescription, cover_url: editCover, theme_color: editThemeColor });
            alert('Configurações atualizadas com sucesso!');
        } else {
            alert('Erro ao salvar as configurações: ' + error.message);
        }
        setIsSavingSettings(false);
    };

    const handleRegenerateCover = async () => {
        try {
            setIsRegeneratingCover(true);
            const { data: userData } = await supabase.auth.getUser();
            const authorName = (userData.user?.user_metadata?.name as string) || userData.user?.email || 'Autor';

            const generatedFile = await generateCoverImageFile(editTitle || ebook?.title || 'Ebook', authorName);
            if (!generatedFile) {
                alert('Não foi possível gerar a capa automaticamente agora.');
                return;
            }

            const uploadedUrl = await uploadCoverToSupabase(generatedFile);
            if (!uploadedUrl) {
                alert('Falha no upload da nova capa.');
                return;
            }

            setEditCover(uploadedUrl);
            setCoverPreviewSettings(uploadedUrl);
            alert('Nova capa gerada com sucesso! Clique em "Salvar Configurações" para confirmar.');
        } catch (err: any) {
            alert('Erro ao regenerar capa: ' + (err?.message || 'erro inesperado'));
        } finally {
            setIsRegeneratingCover(false);
        }
    };

    const updateModuleName = (moduleIndex: number, name: string) => {
        setContentModules((prev) => prev.map((m, i) => i === moduleIndex ? { ...m, module_name: name } : m));
    };

    const updatePageTitle = (moduleIndex: number, pageIndex: number, title: string) => {
        setContentModules((prev) => prev.map((m, i) => {
            if (i !== moduleIndex) return m;
            return {
                ...m,
                pages: m.pages.map((p: any, j: number) => j === pageIndex ? { ...p, title } : p)
            };
        }));
    };

    const updatePageContent = (moduleIndex: number, pageIndex: number, content: string) => {
        setContentModules((prev) => prev.map((m, i) => {
            if (i !== moduleIndex) return m;
            return {
                ...m,
                pages: m.pages.map((p: any, j: number) => j === pageIndex ? { ...p, content } : p)
            };
        }));
    };

    const updateCoverBgUrl = (url: string) => {
        setContentModules((prev) => prev.map((m, i) => {
            if (i !== 0) return m;
            return {
                ...m,
                pages: (m.pages || []).map((p: any, j: number) => j === 0 ? { ...p, cover_bg_url: url } : p)
            };
        }));
    };

    const runEditorCommand = (command: string, value?: string) => {
        if (!editorRef.current) return;
        editorRef.current.focus();
        document.execCommand(command, false, value);
        updatePageContent(
            selectedModuleIndex,
            selectedPageIndex,
            editorRef.current.innerHTML
        );
    };

    useEffect(() => {
        if (isAdvancedMode) return;
        const html = contentModules?.[selectedModuleIndex]?.pages?.[selectedPageIndex]?.content || '';
        if (editorRef.current && editorRef.current.innerHTML !== html) {
            editorRef.current.innerHTML = html;
        }
    }, [contentModules, selectedModuleIndex, selectedPageIndex, isAdvancedMode]);

    const handleSaveContent = async () => {
        if (!id) return;
        setIsSavingContent(true);
        const { error } = await supabase
            .from('ebook_contents')
            .update({ content_json: contentModules, updated_at: new Date().toISOString() })
            .eq('ebook_id', id);

        if (error) {
            alert('Erro ao salvar conteúdo: ' + error.message);
        } else {
            alert('Conteúdo do ebook atualizado com sucesso!');
        }
        setIsSavingContent(false);
    };

    if (loading) return <div className="min-h-screen bg-zinc-900 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;
    if (!ebook) return <div className="p-8 text-white">Ebook não encontrado.</div>;

    return (
        <div className="min-h-screen bg-zinc-900 text-zinc-100 font-sans pb-20">
            {/* Header */}
            <header className="bg-zinc-800/80 border-b border-zinc-700/50 px-6 py-4 sticky top-0 z-10 backdrop-blur-xl">
                <div className="max-w-5xl mx-auto flex items-center gap-4">
                    <Link to="/admin/dashboard" className="p-2 -ml-2 hover:bg-zinc-700/50 rounded-lg text-zinc-400 hover:text-white transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <BookOpen className={`w-8 h-8 text-${ebook.theme_color || 'emerald'}-500`} />
                    <div>
                        <h1 className="font-black text-2xl tracking-tight text-white">{ebook.title}</h1>
                        <p className="text-sm font-semibold text-zinc-500">Gestão de Alunos e Regras</p>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 mt-8">
                {/* Tabs */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-zinc-700/80 mb-8 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('alunos')}
                        className={`pb-4 px-2 font-bold flex items-center justify-center sm:justify-start gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'alunos' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
                    >
                        <Users className="w-5 h-5" />
                        Planilha de Alunos ({alunos.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('regras')}
                        className={`pb-4 px-2 font-bold flex items-center justify-center sm:justify-start gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'regras' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
                    >
                        <Lock className="w-5 h-5" />
                        Regras Drip Content ({regras.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('conteudo')}
                        className={`pb-4 px-2 font-bold flex items-center justify-center sm:justify-start gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'conteudo' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
                    >
                        <BookOpen className="w-5 h-5" />
                        Editor de Conteúdo
                    </button>
                    <button
                        onClick={() => setActiveTab('config')}
                        className={`pb-4 px-2 font-bold flex items-center justify-center sm:justify-start gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'config' ? 'border-amber-500 text-amber-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
                    >
                        <Settings className="w-5 h-5" />
                        Configurações do Ebook
                    </button>
                </div>

                {/* Tab: Alunos */}
                {activeTab === 'alunos' && (
                    <div className="space-y-6">
                        {/* Formulário Novo Aluno */}
                        <div className="bg-zinc-800/40 p-4 sm:p-6 rounded-2xl border border-zinc-700/50">
                            <h3 className="text-lg font-bold text-white mb-4">Adicionar Novo Acesso</h3>
                            <form onSubmit={handleAddAluno} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-zinc-400 mb-1">E-mail do Aluno</label>
                                    <input
                                        type="email" required value={newEmail} onChange={e => setNewEmail(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:ring-emerald-500 focus:border-emerald-500"
                                        placeholder="aluno@email.com"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-zinc-400 mb-1">Senha (Modo Planilha)</label>
                                    <div className="relative">
                                        <input
                                            type="text" required value={newPassword} onChange={e => setNewPassword(e.target.value)}
                                            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 pr-12 text-white focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="Defina uma senha"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleGeneratePassword}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
                                            title="Gerar senha aleatória"
                                        >
                                            <Dices className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <button disabled={isAddingAluno} type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-bold px-6 py-2.5 rounded-xl transition-colors h-[46px] flex items-center justify-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                    {isAddingAluno ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus className="w-5 h-5" /> Adicionar</>}
                                </button>
                            </form>
                        </div>

                        {/* Tabela Alunos */}
                        <div className="bg-zinc-800/20 rounded-2xl border border-zinc-700/30 overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="bg-zinc-800/50 text-zinc-400 text-sm border-b border-zinc-700/50">
                                        <th className="px-6 py-4 font-medium">Email</th>
                                        <th className="px-6 py-4 font-medium">Senha (Exibida)</th>
                                        <th className="px-6 py-4 font-medium">Data da Compra</th>
                                        <th className="px-6 py-4 font-medium text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-700/30">
                                    {alunos.map(aluno => (
                                        <tr key={aluno.id} className="hover:bg-zinc-800/40 transition-colors">
                                            <td className="px-6 py-4 text-white font-medium">{aluno.email}</td>
                                            <td className="px-6 py-4 text-zinc-400 font-mono text-sm">{aluno.password}</td>
                                            <td className="px-6 py-4 text-zinc-500 text-sm">
                                                {new Date(aluno.data_compra).toLocaleDateString('pt-BR')}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleCopyAccess(aluno)}
                                                        className="text-cyan-400 hover:text-cyan-300 p-2 hover:bg-cyan-400/10 rounded-lg transition-colors"
                                                        title="Copiar dados de acesso"
                                                    >
                                                        {copiedAlunoId === aluno.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                                    </button>
                                                    <button
                                                        onClick={() => handleShareAccess(aluno)}
                                                        className="text-emerald-400 hover:text-emerald-300 p-2 hover:bg-emerald-400/10 rounded-lg transition-colors"
                                                        title="Compartilhar acesso por WhatsApp"
                                                    >
                                                        <MessageCircle className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleQuickLogin(aluno)}
                                                        className="text-amber-400 hover:text-amber-300 p-2 hover:bg-amber-400/10 rounded-lg transition-colors"
                                                        title="Abrir ebook logado neste usuário"
                                                    >
                                                        <Lock className="w-5 h-5" />
                                                    </button>
                                                    <button onClick={() => handleRemoverAluno(aluno.id)} className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-lg transition-colors">
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {alunos.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                                                Nenhum aluno cadastrado.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Tab: Regras */}
                {activeTab === 'regras' && (
                    <div className="space-y-6">
                        <div className="mb-2">
                            <h3 className="text-lg font-bold text-white">Controle de Drip Content</h3>
                            <p className="text-sm text-zinc-400">Defina os dias de liberação automáticos para cada módulo após a data da compra.</p>
                        </div>

                        {/* Tabela de Drip (Carregamento Automático baseado no config file) */}
                        <div className="bg-zinc-800/20 rounded-2xl border border-zinc-700/30 overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[500px]">
                                <thead>
                                    <tr className="bg-zinc-800/50 text-zinc-400 text-sm border-b border-zinc-700/50">
                                        <th className="px-6 py-4 font-medium">Nome do Módulo (Código Base)</th>
                                        <th className="px-6 py-4 font-medium">Dias de Liberação (Após compra)</th>
                                        <th className="px-6 py-4 font-medium text-right">Status do Módulo</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-700/30">
                                    {(() => {
                                        const moduleList = EBOOK_MODULES[ebook.slug] || dynamicModuleNames;
                                        if (moduleList.length === 0) {
                                            return (
                                                <tr>
                                                    <td colSpan={3} className="px-6 py-8 text-center text-zinc-500">
                                                        Nenhum módulo configurado para este ebook.
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        return moduleList.map((moduloNome: string) => {
                                            const regraAtual = regras.find(r => r.modulo_nome === moduloNome);
                                            const valorDias = regraAtual ? regraAtual.dias_liberacao : 0;

                                            const handleDiasChange = async (novosDias: number) => {
                                                const dias = Math.max(0, novosDias);
                                                if (regraAtual) {
                                                    await supabase.from('modulos_regras').update({ dias_liberacao: dias }).eq('id', regraAtual.id);
                                                } else {
                                                    await supabase.from('modulos_regras').insert([
                                                        { ebook_id: id, modulo_nome: moduloNome, dias_liberacao: dias }
                                                    ]);
                                                }
                                                await fetchRegras();
                                            };

                                            return (
                                                <tr key={moduloNome} className="hover:bg-zinc-800/40 transition-colors">
                                                    <td className="px-6 py-4 text-white font-medium flex items-center gap-3">
                                                        {valorDias > 0 ? <Lock className="w-4 h-4 text-indigo-400" /> : <BookOpen className="w-4 h-4 text-emerald-400" />}
                                                        {moduloNome}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-1 max-w-[200px]">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDiasChange(valorDias - 1)}
                                                                disabled={valorDias <= 0}
                                                                className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={valorDias}
                                                                onChange={(e) => handleDiasChange(parseInt(e.target.value) || 0)}
                                                                className="w-16 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1.5 text-center text-white focus:ring-indigo-500 focus:border-indigo-500"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDiasChange(valorDias + 1)}
                                                                className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                            <span className="text-zinc-500 text-sm whitespace-nowrap ml-1">dias</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        {valorDias > 0 ? (
                                                            <span className="text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/20">Bloqueado no Dia 0</span>
                                                        ) : (
                                                            <span className="text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">Livre</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        });
                                    })()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Tab: Conteúdo */}
                {activeTab === 'conteudo' && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">Editor de Conteúdo</h3>
                            <p className="text-sm text-zinc-400">Edite módulos, títulos de páginas e o conteúdo completo (HTML) do ebook.</p>
                        </div>

                        {contentModules.length === 0 ? (
                            <div className="text-zinc-500 bg-zinc-800/40 border border-zinc-700/40 rounded-2xl p-6">Nenhum conteúdo carregado para este ebook.</div>
                        ) : (
                            <div className="grid lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-1 bg-zinc-800/40 border border-zinc-700/50 rounded-2xl p-4 space-y-3 max-h-[70vh] overflow-y-auto">
                                    {contentModules.map((mod: any, mIdx: number) => (
                                        <div key={mIdx} className="border border-zinc-700/50 rounded-xl p-3">
                                            <input
                                                value={mod.module_name || ''}
                                                onChange={(e) => updateModuleName(mIdx, e.target.value)}
                                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white mb-2"
                                            />
                                            <div className="space-y-1">
                                                {(mod.pages || []).map((p: any, pIdx: number) => (
                                                    <button
                                                        key={pIdx}
                                                        onClick={() => {
                                                            setSelectedModuleIndex(mIdx);
                                                            setSelectedPageIndex(pIdx);
                                                        }}
                                                        className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${selectedModuleIndex === mIdx && selectedPageIndex === pIdx ? 'bg-cyan-500/20 text-cyan-300' : 'text-zinc-300 hover:bg-zinc-700/40'}`}
                                                    >
                                                        {p.title || `Página ${pIdx + 1}`}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="lg:col-span-2 bg-zinc-800/40 border border-zinc-700/50 rounded-2xl p-4 space-y-4">
                                    <div>
                                        <label className="block text-xs text-zinc-400 mb-1">Título da página</label>
                                        <input
                                            value={contentModules?.[selectedModuleIndex]?.pages?.[selectedPageIndex]?.title || ''}
                                            onChange={(e) => updatePageTitle(selectedModuleIndex, selectedPageIndex, e.target.value)}
                                            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white"
                                        />
                                    </div>

                                    {selectedModuleIndex === 0 && selectedPageIndex === 0 && (
                                        <div>
                                            <label className="block text-xs text-zinc-400 mb-1">Imagem de fundo da capa (URL)</label>
                                            <input
                                                value={contentModules?.[0]?.pages?.[0]?.cover_bg_url || ''}
                                                onChange={(e) => updateCoverBgUrl(e.target.value)}
                                                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white"
                                                placeholder="https://..."
                                            />
                                            <p className="text-[11px] text-zinc-500 mt-1">Salva no JSON da capa para customização visual.</p>
                                        </div>
                                    )}

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-xs text-zinc-400">Conteúdo da página</label>
                                            <button
                                                type="button"
                                                onClick={() => setIsAdvancedMode((v) => !v)}
                                                className="text-xs px-3 py-1 rounded-lg border border-zinc-600 text-zinc-300 hover:bg-zinc-700/40"
                                            >
                                                {isAdvancedMode ? 'Modo simples' : 'Modo avançado (HTML)'}
                                            </button>
                                        </div>

                                        {!isAdvancedMode ? (
                                            <div className="space-y-2">
                                                <div className="flex flex-wrap gap-2">
                                                    <button type="button" onClick={() => runEditorCommand('bold')} className="px-2 py-1 text-xs rounded bg-zinc-700 text-white">Negrito</button>
                                                    <button type="button" onClick={() => runEditorCommand('italic')} className="px-2 py-1 text-xs rounded bg-zinc-700 text-white">Itálico</button>
                                                    <button type="button" onClick={() => runEditorCommand('formatBlock', 'h3')} className="px-2 py-1 text-xs rounded bg-zinc-700 text-white">Título</button>
                                                    <button type="button" onClick={() => runEditorCommand('insertUnorderedList')} className="px-2 py-1 text-xs rounded bg-zinc-700 text-white">Lista</button>
                                                    <button type="button" onClick={() => runEditorCommand('formatBlock', 'blockquote')} className="px-2 py-1 text-xs rounded bg-zinc-700 text-white">Citação</button>
                                                </div>
                                                <div
                                                    ref={editorRef}
                                                    contentEditable
                                                    suppressContentEditableWarning
                                                    onInput={(e) => updatePageContent(selectedModuleIndex, selectedPageIndex, (e.currentTarget as HTMLDivElement).innerHTML)}
                                                    className="w-full min-h-[420px] bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-200 text-sm outline-none"
                                                />
                                            </div>
                                        ) : (
                                            <textarea
                                                value={contentModules?.[selectedModuleIndex]?.pages?.[selectedPageIndex]?.content || ''}
                                                onChange={(e) => updatePageContent(selectedModuleIndex, selectedPageIndex, e.target.value)}
                                                className="w-full h-[420px] bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-200 font-mono text-xs"
                                            />
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleSaveContent}
                                        disabled={isSavingContent}
                                        className="bg-cyan-500 hover:bg-cyan-400 text-zinc-900 font-bold px-6 py-3 rounded-xl inline-flex items-center gap-2 disabled:opacity-60"
                                    >
                                        {isSavingContent ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Salvar conteúdo
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Tab: Configurações */}
                {activeTab === 'config' && (
                    <div className="space-y-6 max-w-2xl">
                        <div className="mb-2">
                            <h3 className="text-lg font-bold text-white">Configurações Gerais</h3>
                            <p className="text-sm text-zinc-400">Edite as informações básicas que aparecem na estante virtual.</p>
                        </div>

                        <div className="bg-zinc-800/40 p-4 sm:p-6 rounded-2xl border border-zinc-700/50">
                            <form onSubmit={handleSaveSettings} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">Título do Ebook</label>
                                    <input
                                        type="text" required value={editTitle} onChange={e => setEditTitle(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="Ex: Método EMP"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">Autor / Descrição Curta</label>
                                    <textarea
                                        rows={3} value={editDescription} onChange={e => setEditDescription(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500 resize-none"
                                        placeholder="Nome do autor ou uma frase de impacto sobre o livro."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">Capa do Ebook</label>

                                    {/* File Upload */}
                                    <label className="block cursor-pointer mb-3">
                                        <div className={`flex items-center justify-center gap-3 border-2 border-dashed rounded-xl p-4 transition-colors ${coverFileSettings ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-zinc-700 hover:border-amber-500'}`}>
                                            {coverPreviewSettings ? (
                                                <img src={coverPreviewSettings} alt="Preview" className="w-16 h-24 object-cover rounded-lg" />
                                            ) : editCover ? (
                                                <img src={editCover} alt="Preview" className="w-16 h-24 object-cover rounded-lg" />
                                            ) : (
                                                <ImagePlus className="w-8 h-8 text-zinc-500" />
                                            )}
                                            <div>
                                                <p className="text-sm font-medium text-zinc-300">{coverFileSettings ? coverFileSettings.name : 'Clique para enviar uma nova capa'}</p>
                                                <p className="text-xs text-zinc-500">PNG, JPG ou WebP</p>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp"
                                            className="hidden"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0] || null;
                                                setCoverFileSettings(file);
                                                if (file) {
                                                    setCoverPreviewSettings(URL.createObjectURL(file));
                                                    setIsUploadingCover(true);
                                                    const url = await uploadCoverToSupabase(file);
                                                    if (url) {
                                                        setEditCover(url);
                                                    }
                                                    setIsUploadingCover(false);
                                                }
                                            }}
                                        />
                                    </label>
                                    {isUploadingCover && (
                                        <div className="flex items-center gap-2 text-sm text-amber-400 mb-3">
                                            <Loader2 className="w-4 h-4 animate-spin" /> Enviando imagem...
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <button
                                            type="button"
                                            onClick={handleRegenerateCover}
                                            disabled={isRegeneratingCover || isUploadingCover}
                                            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                                        >
                                            {isRegeneratingCover ? <><Loader2 className="w-4 h-4 animate-spin" /> Regenerando capa...</> : 'Regenerar capa com IA'}
                                        </button>
                                    </div>

                                    {/* URL Input (manual) */}
                                    <input
                                        type="url" value={editCover} onChange={e => setEditCover(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="Ou cole uma URL diretamente..."
                                    />
                                </div>

                                {/* Color Picker */}
                                <ColorPicker value={editThemeColor} onChange={setEditThemeColor} />

                                <button disabled={isSavingSettings} type="submit" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold px-8 py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                                    {isSavingSettings ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Salvar Configurações</>}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

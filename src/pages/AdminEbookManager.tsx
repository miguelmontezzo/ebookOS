import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Users, Lock, ChevronLeft, Plus, Trash2, Save, Loader2, BookOpen, Settings, Dices } from 'lucide-react';
import { EBOOK_MODULES } from '../config/ebookModules';

export default function AdminEbookManager() {
    const { id } = useParams();
    const [ebook, setEbook] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'alunos' | 'regras' | 'config'>('alunos');
    const [loading, setLoading] = useState(true);

    // Alunos State
    const [alunos, setAlunos] = useState<any[]>([]);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isAddingAluno, setIsAddingAluno] = useState(false);

    // Regras State
    const [regras, setRegras] = useState<any[]>([]);
    const [newModuloNome, setNewModuloNome] = useState('');
    const [newDiasLiberacao, setNewDiasLiberacao] = useState('');
    const [isAddingRegra, setIsAddingRegra] = useState(false);

    // Config State
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editCover, setEditCover] = useState('');
    const [isSavingSettings, setIsSavingSettings] = useState(false);

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

                // Carrega Alunos
                await fetchAlunos();
                // Carrega Regras
                await fetchRegras();
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
            cover_url: editCover
        }).eq('id', id);

        if (!error) {
            setEbook({ ...ebook, title: editTitle, description: editDescription, cover_url: editCover });
            alert('Configurações atualizadas com sucesso!');
        } else {
            alert('Erro ao salvar as configurações: ' + error.message);
        }
        setIsSavingSettings(false);
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
                                        <th className="px-6 py-4 font-medium text-right">Ação</th>
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
                                                <button onClick={() => handleRemoverAluno(aluno.id)} className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-lg transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
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
                                        // Use hardcoded modules from config, OR fallback to regras from database for AI ebooks
                                        const moduleList = EBOOK_MODULES[ebook.slug] || regras.map((r: any) => r.modulo_nome);
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
                                                if (novosDias <= 0 && regraAtual) {
                                                    const { error } = await supabase.from('modulos_regras').delete().eq('id', regraAtual.id);
                                                    if (error) alert("Erro ao salvar Drip: Execute o script SQL para definir a segurança (owner_id).");
                                                    await fetchRegras();
                                                } else if (novosDias > 0) {
                                                    if (regraAtual) {
                                                        const { error } = await supabase.from('modulos_regras').update({ dias_liberacao: novosDias }).eq('id', regraAtual.id);
                                                        if (error) alert("Erro ao salvar Drip: Execute o script SQL para definir a segurança (owner_id).");
                                                    } else {
                                                        const { error } = await supabase.from('modulos_regras').insert([
                                                            { ebook_id: id, modulo_nome: moduloNome, dias_liberacao: novosDias }
                                                        ]);
                                                        if (error) alert("Erro ao salvar Drip: Execute o script SQL para definir a segurança (owner_id).");
                                                    }
                                                    await fetchRegras();
                                                }
                                            };

                                            return (
                                                <tr key={moduloNome} className="hover:bg-zinc-800/40 transition-colors">
                                                    <td className="px-6 py-4 text-white font-medium flex items-center gap-3">
                                                        {valorDias > 0 ? <Lock className="w-4 h-4 text-indigo-400" /> : <BookOpen className="w-4 h-4 text-emerald-400" />}
                                                        {moduloNome}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2 max-w-[160px]">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={valorDias}
                                                                onChange={(e) => handleDiasChange(parseInt(e.target.value) || 0)}
                                                                className="w-20 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-center text-white focus:ring-indigo-500 focus:border-indigo-500"
                                                            />
                                                            <span className="text-zinc-500 text-sm whitespace-nowrap">dias</span>
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
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">URL da Capa (Imagem)</label>
                                    <input
                                        type="url" value={editCover} onChange={e => setEditCover(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                    {editCover && (
                                        <div className="mt-4 shrink-0">
                                            <p className="text-xs text-zinc-500 mb-2">Preview da Capa:</p>
                                            <img src={editCover} alt="Preview" className="w-32 h-44 object-cover rounded-lg border border-zinc-700/50" />
                                        </div>
                                    )}
                                </div>

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

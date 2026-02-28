import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './pages/LandingPage';
import EbookReader from './pages/EbookReader';
import MetodoEMPReader from './pages/MetodoEMPReader';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import ConfirmAccount from './pages/ConfirmAccount';
import AdminAccount from './pages/AdminAccount';
import AdminEbookManager from './pages/AdminEbookManager';
import AdminConnections from './pages/AdminConnections';
import StudentLogin from './pages/StudentLogin';
import AIGenerator from './pages/AIGenerator';
import DynamicEbookReader from './pages/DynamicEbookReader';
import { AuthAdminProvider, useAdminAuth } from './contexts/AuthAdminContext';
import { AuthStudentProvider, useStudentAuth } from './contexts/AuthStudentContext';
import { Loader2 } from 'lucide-react';
import { supabase } from './lib/supabase';

// ---- ADMIN ROUTES ----
function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
    const { session, isLoading } = useAdminAuth();
    if (isLoading) return <div className="min-h-screen bg-zinc-900 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;
    if (!session) return <Navigate to="/admin/login" replace />;
    return <>{children}</>;
}

// ---- STUDENT ROUTES ----
function ProtectedStudentRoute({ children, requiredSlug }: { children: React.ReactNode, requiredSlug?: string }) {
    const { studentUser, isLoadingStudent } = useStudentAuth();
    const { slug } = useParams();
    const checkSlug = requiredSlug || slug;

    const [ebookId, setEbookId] = useState<string | null>(null);
    const [loadingEbook, setLoadingEbook] = useState(true);

    useEffect(() => {
        if (!checkSlug) {
            setLoadingEbook(false);
            return;
        }
        supabase.from('ebooks').select('id').eq('slug', checkSlug).single().then(({ data }) => {
            if (data) setEbookId(data.id);
            setLoadingEbook(false);
        });
    }, [checkSlug]);

    if (isLoadingStudent || loadingEbook) return <div className="min-h-screen bg-zinc-50 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>;

    // Se não tiver slug ou ebook valendo, falha geral
    if (!checkSlug || !ebookId) return <div className="p-8 text-center text-red-500">Página não encontrada.</div>;

    // Se aluno não tá logado, manda pro login DO EBOOK específico
    if (!studentUser) return <Navigate to={`/${checkSlug}/login`} replace />;

    // Se aluno logou mas o ebook_id atual dele não bate com o do checkSlug lido do banco, ele não tem acesso
    if (studentUser.ebook_id !== ebookId) {
        return (
            <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 text-center">
                <h2 className="text-2xl font-bold text-zinc-900 mb-2">Acesso Negado</h2>
                <p className="text-zinc-600 mb-6">Você não possui acesso a este ebook (slug: {checkSlug}).</p>
                <button onClick={() => window.location.href = `/${checkSlug}/login`} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Voltar para Login</button>
            </div>
        );
    }

    return <>{children}</>;
}


function App() {
    return (
        <AuthAdminProvider>
            <AuthStudentProvider>
                <Router>
                    <Routes>
                        {/* ================= ADMIN ================= */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/register" element={<AdminRegister />} />
                        <Route path="/auth/confirm" element={<ConfirmAccount />} />
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/admin/dashboard" element={
                            <ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>
                        } />
                        <Route path="/admin/ai-studio" element={
                            <ProtectedAdminRoute><AIGenerator /></ProtectedAdminRoute>
                        } />
                        <Route path="/admin/ebook/:id" element={
                            <ProtectedAdminRoute><AdminEbookManager /></ProtectedAdminRoute>
                        } />
                        <Route path="/admin/account" element={
                            <ProtectedAdminRoute><AdminAccount /></ProtectedAdminRoute>
                        } />
                        <Route path="/admin/connections" element={
                            <ProtectedAdminRoute><AdminConnections /></ProtectedAdminRoute>
                        } />

                        {/* ================ STUDENT ================ */}
                        {/* The login page for a specific ebook */}
                        <Route path="/:slug/login" element={<StudentLogin />} />

                        {/* Explicit Ebook routes mapping */}
                        <Route path="/metodoEMP" element={
                            <ProtectedStudentRoute requiredSlug="metodoEMP"><MetodoEMPReader /></ProtectedStudentRoute>
                        } />
                        <Route path="/o-metodo" element={
                            <ProtectedStudentRoute requiredSlug="o-metodo"><EbookReader /></ProtectedStudentRoute>
                        } />

                        {/* Fallback pattern for future automated ebooks */}
                        <Route path="/:slug" element={
                            <ProtectedStudentRoute><DynamicEbookReader /></ProtectedStudentRoute>
                        } />
                    </Routes>
                </Router>
            </AuthStudentProvider>
        </AuthAdminProvider>
    );
}

export default App;

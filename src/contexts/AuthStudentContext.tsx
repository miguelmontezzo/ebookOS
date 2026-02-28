import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// ---- STUDENT AUTH CONTEXT ----
// Uses the "Spreadsheet" logic (queries the 'alunos' table explicitly).

export interface AlunoSelecionado {
    id: string;
    email: string;
    ebook_id: string; // Now specific to an ebook
    data_compra: string;
}

interface AuthStudentContextType {
    studentUser: AlunoSelecionado | null;
    loginStudent: (email: string, senha: string, ebookSlug: string) => Promise<{ success: boolean; error?: string }>;
    logoutStudent: () => void;
    isLoadingStudent: boolean;
}

const AuthStudentContext = createContext<AuthStudentContextType | undefined>(undefined);

export function AuthStudentProvider({ children }: { children: React.ReactNode }) {
    const [studentUser, setStudentUser] = useState<AlunoSelecionado | null>(null);
    const [isLoadingStudent, setIsLoadingStudent] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('ebookos_student');
        if (storedUser) {
            try {
                setStudentUser(JSON.parse(storedUser));
            } catch (err) {
                console.error('Failed to parse stored user', err);
                localStorage.removeItem('ebookos_student');
            }
        }
        setIsLoadingStudent(false);
    }, []);

    const loginStudent = async (email: string, senha: string, ebookSlug: string) => {
        setIsLoadingStudent(true);
        try {
            // 1. Get the Ebook ID based on Slug
            const { data: ebookData, error: ebookError } = await supabase
                .from('ebooks')
                .select('id')
                .eq('slug', ebookSlug)
                .single();

            if (ebookError || !ebookData) {
                setIsLoadingStudent(false);
                return { success: false, error: 'Ebook não encontrado na plataforma.' };
            }

            // 2. Spreadsheet-style auth: Check 'alunos' table for this exact ebook
            const { data, error } = await supabase
                .from('alunos')
                .select('*, ebooks(slug)') // Join slightly to confirm things if needed
                .eq('email', email)
                .eq('password', senha)
                .eq('ebook_id', ebookData.id)
                .single();

            if (error || !data) {
                setIsLoadingStudent(false);
                return { success: false, error: 'Email ou senha inválidos para este Ebook.' };
            }

            const alunoObj: AlunoSelecionado = {
                id: data.id,
                email: data.email,
                ebook_id: data.ebook_id,
                data_compra: data.data_compra,
            };

            setStudentUser(alunoObj);
            localStorage.setItem('ebookos_student', JSON.stringify(alunoObj));
            setIsLoadingStudent(false);
            return { success: true };

        } catch (err: any) {
            setIsLoadingStudent(false);
            return { success: false, error: err.message || 'Erro ao fazer login. Tente novamente.' };
        }
    };

    const logoutStudent = () => {
        setStudentUser(null);
        localStorage.removeItem('ebookos_student');
    };

    return (
        <AuthStudentContext.Provider value={{ studentUser, loginStudent, logoutStudent, isLoadingStudent }}>
            {children}
        </AuthStudentContext.Provider>
    );
}

export function useStudentAuth() {
    const context = useContext(AuthStudentContext);
    if (context === undefined) {
        throw new Error('useStudentAuth must be used within an AuthStudentProvider');
    }
    return context;
}

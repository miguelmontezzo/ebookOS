import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

// ---- ADMIN AUTH CONTEXT ----
// Uses native Supabase Auth for managing the platform.

interface AuthAdminContextType {
    session: Session | null;
    user: User | null;
    logout: () => void;
    isLoading: boolean;
}

const AuthAdminContext = createContext<AuthAdminContextType | undefined>(undefined);

export function AuthAdminProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 1. Fetch initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsLoading(false);
        });

        // 2. Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthAdminContext.Provider value={{ session, user, logout, isLoading }}>
            {children}
        </AuthAdminContext.Provider>
    );
}

export function useAdminAuth() {
    const context = useContext(AuthAdminContext);
    if (context === undefined) {
        throw new Error('useAdminAuth must be used within an AuthAdminProvider');
    }
    return context;
}

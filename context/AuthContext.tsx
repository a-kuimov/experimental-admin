'use client';

import React, {createContext, useContext, useEffect, ReactNode, useMemo} from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: { id: number; email: string } | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const {
        user,
        login,
        register,
        logout,
        isLoading: storeIsLoading,
        error,
        checkAuth,
    } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // Пока идёт проверка, не рендерим детей
    if (storeIsLoading) {
        return <div>Loading...</div>;
    }

    return <AuthContext.Provider value={{
        user,
        login,
        register,
        logout,
        isLoading: storeIsLoading,
        error,
    }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
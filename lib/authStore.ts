// lib/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    email: string;
    name: string | null;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    setUser: (user: User, token: string) => void;
    updateToken: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,

            setUser: (user, token) =>
                set({ user, accessToken: token, isAuthenticated: true }),

            updateToken: (token) =>
                set({ accessToken: token }),

            logout: () =>
                set({ user: null, accessToken: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
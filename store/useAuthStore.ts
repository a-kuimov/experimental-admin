import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: number;
    email: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;

    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshTokens: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            isLoading: false,
            error: null,

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const res = await fetch('http://localhost:3001/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include', // для отправки cookies
                        body: JSON.stringify({ email, password }),
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.message || 'Login failed');

                    set({ user: data.user, accessToken: data.accessToken, isLoading: false });
                } catch (err: any) {
                    set({ error: err.message, isLoading: false });
                    throw err;
                }
            },

            register: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    await fetch('http://localhost:3001/auth/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    });
                    await get().login(email, password); // авто-вход
                } catch (err: any) {
                    set({ error: err.message, isLoading: false });
                    throw err;
                }
            },

            logout: async () => {
                await fetch('http://localhost:3001/auth/logout', {
                    method: 'POST',
                    credentials: 'include',
                });
                set({ user: null, accessToken: null });
            },

            refreshTokens: async () => {
                const res = await fetch('http://localhost:3001/auth/refresh', {
                    method: 'POST',
                    credentials: 'include',
                });

                if (!res.ok) throw new Error('Token refresh failed');

                const data = await res.json();
                set({ accessToken: data.accessToken, user: data.user });
            },

            checkAuth: async () => {
                if (!get().accessToken) return;

                const res = await fetch('http://localhost:3001/auth/profile', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${get().accessToken}` },
                    credentials: 'include',
                });

                if (res.ok) {
                    const user = await res.json();
                    set({ user });
                } else {
                    try {
                        await get().refreshTokens();
                    } catch {
                        set({ user: null, accessToken: null });
                    }
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ accessToken: state.accessToken, user: state.user }),
        }
    )
);
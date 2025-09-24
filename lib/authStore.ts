// lib/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
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
    // Добавим метод для проверки сессии
    restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,

            setUser: (user, token) =>
                set({ user, accessToken: token, isAuthenticated: true }),

            updateToken: (token) =>
                set({ accessToken: token }),

            logout: () => {
                fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
                set({ user: null, accessToken: null, isAuthenticated: false });
            },

            restoreSession: async () => {
                console.log('start');
                console.log(get().isAuthenticated);
                if (get().isAuthenticated) return; // Уже авторизован
                console.log('restore session');
                try {
                    // Отправляем запрос к серверу, он проверит куку и выдаст новый accessToken
                    const res = await fetch('/api/auth/refresh', {
                        method: 'GET',
                        credentials: 'include', // ← обязателен!
                    });

                    if (res.ok) {
                        const data = await res.json();
                        set({
                            user: data.user,
                            accessToken: data.accessToken,
                            isAuthenticated: true,
                        });
                    }
                } catch (err) {
                    console.error('Failed to restore session', err);
                    set({ user: null, accessToken: null, isAuthenticated: false });
                }
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
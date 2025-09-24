// lib/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: number;
    email: string;
    name: string | null;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    setUser: (user: User) => void;
    logout: () => void;
    checkSession: () => Promise<boolean>;
    initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: true,

            setUser: (user) =>
                set({ user, isAuthenticated: true, isLoading: false }),

            logout: async () => {
                try {
                    await fetch('/api/auth/logout', {
                        method: 'POST',
                        credentials: 'include' // Важно: отправляем cookies
                    });
                } catch (err) {
                    console.error('Logout failed', err);
                } finally {
                    set({ user: null, isAuthenticated: false, isLoading: false });
                }
            },

            // Проверка сессии через cookies (без передачи токена в headers)
            checkSession: async (): Promise<boolean> => {
                try {
                    const res = await fetch('/api/auth/me', {
                        method: 'GET',
                        credentials: 'include', // Отправляем cookies автоматически
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (res.ok) {
                        console.log('yes')
                        const userData = await res.json();
                        set({ user: userData, isAuthenticated: true });
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error('Session check failed:', error);
                    return false;
                }
            },

            // Инициализация с проверкой сессии через cookies
            initializeAuth: async () => {
                const { checkSession, logout } = get();

                // Всегда проверяем сессию через cookies, независимо от состояния в localStorage
                const isValid = await checkSession();

                if (!isValid) {
                    // Сессия недействительна - очищаем localStorage
                    set({ user: null, isAuthenticated: false, isLoading: false });
                } else {
                    set({ isLoading: false });
                }
            },

            restoreSession: async () => {
                try {
                    const res = await fetch('/api/auth/refresh', {
                        method: 'GET',
                        credentials: 'include', // Cookies отправляются автоматически
                    });

                    if (res.ok) {
                        const data = await res.json();
                        set({
                            user: data.user,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                    } else {
                        set({ user: null, isAuthenticated: false, isLoading: false });
                    }
                } catch (err) {
                    console.error('Failed to restore session', err);
                    set({ user: null, isAuthenticated: false, isLoading: false });
                }
            },
        }),
        {
            name: 'auth-storage',
            onRehydrateStorage: () => async (state) => {
                if (state) {
                    // После гидратации проверяем сессию через cookies
                    await state.initializeAuth();
                }
            },
        }
    )
);
// lib/cookies.ts
import { cookies } from 'next/headers';

const REFRESH_TOKEN_NAME = '__Secure-refresh-token';

// Сделаем функцию асинхронной
export async function setAuthCookies(accessToken: string, refreshToken: string) {
    const store = await cookies(); // ✅ await здесь обязателен
    store.set(REFRESH_TOKEN_NAME, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api', // или '/' — зависит от структуры API
        maxAge: 60 * 60 * 24 * 7, // 7 дней
    });
}

export async function getRefreshToken(): Promise<string | undefined> {
    const store = await cookies();
    return store.get(REFRESH_TOKEN_NAME)?.value;
}

export async function clearRefreshCookie() {
    const store = await cookies();
    store.delete(REFRESH_TOKEN_NAME);
}
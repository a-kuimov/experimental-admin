// lib/cookies.ts
import { cookies } from 'next/headers';

const REFRESH_TOKEN_NAME = '__Secure-refresh-token';

export function setAuthCookies(accessToken: string, refreshToken: string) {
    cookies().set(REFRESH_TOKEN_NAME, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api',
        maxAge: 60 * 60 * 24 * 7,
    });
}

export function getRefreshToken(): string | undefined {
    return cookies().get(REFRESH_TOKEN_NAME)?.value;
}

export function clearRefreshCookie() {
    cookies().delete(REFRESH_TOKEN_NAME);
}
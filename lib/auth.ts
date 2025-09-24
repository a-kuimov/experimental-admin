// lib/auth.ts
import jwt from 'jsonwebtoken';
import {NextRequest} from "next/server";
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from "@/lib/cookies";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export function createAccessToken(userId: string, email: string) {
    return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '15m' });
}

export function createRefreshToken(userId: string, email: string) {
    return jwt.sign({ userId, email }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

export function verifyAccessToken(token: string): { userId: string; email: string } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    } catch {
        return null;
    }
}

export function verifyRefreshToken(token: string): { userId: string; email: string } | null {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string; email: string };
    } catch {
        return null;
    }
}

export async function verifyTokenFromCookie(request: NextRequest) {
    try {
        // Извлекаем токен из cookies
        const token = request.cookies.get(REFRESH_TOKEN_NAME)?.value;
        console.log('token', token);
        if (!token) {
            return null;
        }

        // Проверяем токен (замените на вашу логику верификации)
        try {
            return jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string; email: string };
        } catch {
            return null;
        }
    } catch (error) {
        return null;
    }
}
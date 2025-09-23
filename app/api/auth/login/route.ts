// POST /api/users/login
import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation';
import { createAccessToken, createRefreshToken } from '@/lib/auth';
import { setAuthCookies } from '@/lib/cookies';

const EXTERNAL_LOGIN_URL = process.env.EXTERNAL_AUTH_API!;
// ⚠️ Временное отключение проверки SSL (только для dev!)
if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function POST(request: NextRequest) {
    console.log(EXTERNAL_LOGIN_URL);
    try {
        const body = await request.json();
        const parsed = loginSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Неверные данные', details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const { email, password } = parsed.data;

        // Вызов внешнего API
        const externalRes = await fetch(EXTERNAL_LOGIN_URL, {
            method: 'POST',
            body: JSON.stringify({ username: email, password }),
            // При необходимости добавь Authorization: Bearer secret-key
        });

        const userData = await externalRes.json();
        console.log(externalRes);
        if (!externalRes.ok) {
            return NextResponse.json(
                { error: userData.error || 'Ошибка авторизации' },
                { status: externalRes.status }
            );
        }

        // Предположим, внешний API вернул:
        // { user: { id: "123", email: "user@com", name: "John" } }

        const { id: userId, email: userEmail, name } = userData.user;

        // Генерируем свои токены
        const accessToken = createAccessToken(userId, userEmail);
        const refreshToken = createRefreshToken(userId, userEmail);

        // Сохраняем refresh token в HTTP-only cookie
        setAuthCookies(accessToken, refreshToken);

        // Отправляем клиенту
        return NextResponse.json({
            user: { id: userId, email: userEmail, name },
            accessToken,
        });
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ error: 'Ошибка сети' }, { status: 500 });
    }
}
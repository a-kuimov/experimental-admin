// GET /api/users/refresh
import { NextRequest, NextResponse } from 'next/server';
import { createRefreshToken, verifyRefreshToken, createAccessToken } from '@/lib/auth';
import { getRefreshToken, setAuthCookies } from '@/lib/cookies';

// Опционально: если нужно проверить существование пользователя
const EXTERNAL_USER_API = 'https://api.myusers.com/user/profile';

export async function GET(request: NextRequest) {
    const token = getRefreshToken();
    if (!token) {
        return NextResponse.json({ error: 'Требуется рефреш-токен' }, { status: 401 });
    }

    const payload = verifyRefreshToken(token);
    if (!payload) {
        return NextResponse.json({ error: 'Неверный рефреш-токен' }, { status: 401 });
    }

    // (Опционально) Проверим, существует ли пользователь
    const userCheck = await fetch(`${EXTERNAL_USER_API}/${payload.userId}`, {
        headers: { 'Authorization': `Bearer ${token}` } // если нужно
    }).then(r => r.ok ? r.json() : null).catch(() => null);

    if (!userCheck) {
        return NextResponse.json({ error: 'Пользователь не найден' }, { status: 401 });
    }

    const newAccessToken = createAccessToken(payload.userId, payload.email);
    const newRefreshToken = createRefreshToken(payload.userId, payload.email);

    setAuthCookies(newAccessToken, newRefreshToken);

    return NextResponse.json({ accessToken: newAccessToken });
}
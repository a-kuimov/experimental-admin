import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenFromCookie } from '@/lib/auth'; // Функция для проверки токена из cookie

export async function GET(request: NextRequest) {
    try {
        // Токен автоматически берется из cookies благодаря credentials: 'include'
        const user = await verifyTokenFromCookie(request);
        console.log(user);
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid or expired session' },
                { status: 401 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: 'Session check failed' },
            { status: 500 }
        );
    }
}
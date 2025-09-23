// POST /api/users/logout
import { NextRequest, NextResponse } from 'next/server';
import { clearRefreshCookie } from '@/lib/cookies';

export async function POST() {
    clearRefreshCookie();
    return NextResponse.json({ success: true });
}
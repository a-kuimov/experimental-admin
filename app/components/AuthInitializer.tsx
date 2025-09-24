// components/AuthInitializer.tsx
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/authStore';

export function AuthInitializer() {
    const restoreSession = useAuthStore((state) => state.restoreSession);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {

        restoreSession();
    }, [restoreSession]);

    return null;
}
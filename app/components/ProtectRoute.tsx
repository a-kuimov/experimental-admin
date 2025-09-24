// components/ProtectedRoute.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';

interface ProtectedRouteProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                                  children,
                                                                  fallback = <div>Checking session...</div>
                                                              }) => {
    const router = useRouter();
    const { isAuthenticated, isLoading, checkSession } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const verifySession = async () => {
            if (!isLoading) {
                // Всегда проверяем сессию через cookies, даже если в сторе isAuthenticated: true
                const isValid = await checkSession();

                if (!isValid) {
                    router.push('/');
                    return;
                }

                setIsChecking(false);
            }
        };

        verifySession();
    }, [isLoading, checkSession, router]);

    // Показываем загрузку во время проверки сессии
    if (isLoading || isChecking) {
        return <>{fallback}</>;
    }

    // Если не аутентифицирован после проверки
    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};
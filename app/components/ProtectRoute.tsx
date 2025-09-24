'use client';

import { useAuthStore } from '@/lib/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isAuthenticated && pathname !== '/') {
            router.push('/');
        }
    }, [isAuthenticated, router, pathname]);

    if (!isAuthenticated) return <p>Загрузка...</p>;

    return <>{children}</>;
}
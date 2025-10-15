'use client';

import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/my-components/dashboard/app-sidebar";


import { useRouter } from 'next/navigation';
import {useAuth} from "@/context/AuthContext";
import {useEffect} from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log('user', user);
        if (isLoading || isLoading === undefined) return;
        if (!user) {
            router.push('/login');
        }
    }, [user, isLoading]);
    if (isLoading) return <div>Loading...</div>;
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Layout;
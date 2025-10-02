'use client';

import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/ui/my-components/app-sidebar";


import { useRouter } from 'next/navigation';
import {useAuth} from "@/context/AuthContext";
import {useEffect} from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();


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
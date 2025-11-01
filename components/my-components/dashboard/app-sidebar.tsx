'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image";
import {MonitorSpeaker} from "lucide-react";
import {usePathname} from "next/navigation";

const items = [
    {
        title: "Терминалы",
        url: 'dashboard/terminals',
        icon: <MonitorSpeaker />,
    }
];
export function AppSidebar() {
    const pathname = usePathname();
    console.log(pathname)
    return (
        <Sidebar>
            <SidebarHeader className='items-center justify-center h-16'>
                <Image
                    src="https://unitsys.ru/files/images/new/logo.svg"
                    alt="Логотип"
                    width={150}
                    height={20}
                />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="flex flex-col gap-2">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton tooltip={item.title} isActive={item.url === pathname.split('/').filter(Boolean).pop()}>
                                        {item.icon && item.icon}
                                        <a href={item.url}>{item.title}</a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
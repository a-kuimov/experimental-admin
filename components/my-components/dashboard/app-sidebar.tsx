import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image";

export function AppSidebar() {
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
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
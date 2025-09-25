import {ProtectedRoute} from "@/app/components/ProtectRoute";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/ui/my-components/app-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (<ProtectedRoute>
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    </ProtectedRoute>)
}

export default Layout;
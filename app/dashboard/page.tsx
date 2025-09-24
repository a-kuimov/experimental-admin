'use client';
import {ProtectedRoute} from "@/app/components/ProtectRoute";
import {useAuthStore} from "@/lib/authStore";

const Page = () =>{
    const { user } = useAuthStore();
    console.log(user);
    return (<ProtectedRoute>
        Привет {user?.name}
    </ProtectedRoute>)
}
export default Page;
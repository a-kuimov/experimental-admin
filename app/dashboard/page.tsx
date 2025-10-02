'use client';

import {MultiSelect, Option} from "@/components/ui/my-components/multi-select";
import {useState} from "react";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {useAuth} from "@/context/AuthContext";
const OPTIONS = [
    { value: 'nextjs', label: 'Next.js' },
    { value: 'react', label: 'React' },
    { value: 'tailwind', label: 'Tailwind CSS' },
    { value: 'zustand', label: 'Zustand' },
    { value: 'prisma', label: 'Prisma' },
];
const Page = () =>{
    const { user } = useAuth();
    const [selected, setSelected] = useState<Option[]>([]);

    return ( <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
            />
            {/*<Breadcrumb>*/}
            {/*    <BreadcrumbList>*/}
            {/*        <BreadcrumbItem className="hidden md:block">*/}
            {/*            <BreadcrumbLink href="#">*/}
            {/*                Building Your Application*/}
            {/*            </BreadcrumbLink>*/}
            {/*        </BreadcrumbItem>*/}
            {/*        <BreadcrumbSeparator className="hidden md:block" />*/}
            {/*        <BreadcrumbItem>*/}
            {/*            <BreadcrumbPage>Data Fetching</BreadcrumbPage>*/}
            {/*        </BreadcrumbItem>*/}
            {/*    </BreadcrumbList>*/}
            {/*</Breadcrumb>*/}
        </div>
    </header>)
}
export default Page;
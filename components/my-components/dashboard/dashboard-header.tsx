import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import React from "react";

export interface BreadcrumbItem {
    text: string;
    href?: string;
}

export interface BreadcrumbItems {
    items: BreadcrumbItem[];
}

const DashboardHeader = ({items}: BreadcrumbItems) => {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                    <BreadcrumbList>
                        {items.map((item, index) => (
                            <React.Fragment key={index}>
                            <BreadcrumbItem  className={index !== items.length - 1 ? "hidden md:block" : ''}>
                                {index !== items.length - 1 ?
                                    (<BreadcrumbLink href={item.href}>
                                        {item.text}
                                    </BreadcrumbLink>) :
                                    (<BreadcrumbPage>{item.text}</BreadcrumbPage>)
                                }
                            </BreadcrumbItem>
                            {index !== items.length - 1 &&  <BreadcrumbSeparator className="hidden md:block" />}
                            </React.Fragment>
                        ))}

                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
export default DashboardHeader;
'use client';

import {MultiSelect, Option} from "@/components/ui/my-components/multi-select";
import {useState} from "react";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {useAuth} from "@/context/AuthContext";
import TerminalHardwareTable from "@/components/ui/my-components/terminal-hardware-table";
import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {RussianRuble} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@/components/ui/input-group";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Field, FieldLabel} from "@/components/ui/field";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
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

    return (<> <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
    </header>
        <div className="flex flex-1 flex-col px-4">
            <div className="@container/main gap-2">
                <h1 className="scroll-m-20 text-2xl font-bold tracking-tight text-balance">UTS Fly W 55/65/75</h1>
            </div>
            <div className="@container/main flex flex-1 flex-row gap-3">
                <div className="flex flex-col flex-1 gap-4 py-4 md:gap-6 md:py-6">
                    <TerminalHardwareTable />
                </div>
                <Card className="w-full max-w-[450px]">
                    <CardHeader>
                        <CardTitle className="flex gap-2 items-end text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">144 375 <span>&#8381;</span></CardTitle>
                        <CardAction>
                            <h2 className="text-xl">Итоговая цена</h2>
                            <CardDescription>коэффициент - 1</CardDescription>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <InputGroup>
                            <InputGroupAddon>
                                &#8381;
                            </InputGroupAddon>
                            <InputGroupInput placeholder="255 564"  />
                            <InputGroupAddon align="inline-end">
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor="airplane-mode">Фиксированная цена</Label>
                                    <Switch id="airplane-mode" />
                                </div>
                            </InputGroupAddon>
                        </InputGroup>

                        <Field orientation="horizontal">
                            <FieldLabel>Плательщик НДС:</FieldLabel>
                            <Select>
                                <SelectTrigger className="w-full md:w-1/2">
                                    <SelectValue  />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="engineering">ООО "УТС"</SelectItem>
                                    <SelectItem value="design">ИП Куимов</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <div className="flex items-center">
                            <p className="flex-1">В том числе НДС 5%</p>
                            <p className="text-right text-xl">6 875 &#8381;</p>
                        </div>
                        <div className="flex items-center">
                            <p className="flex-1">Цена для клиента</p>
                            <p className="text-right text-xl">137 500 &#8381;</p>
                        </div>
                        <div className="flex items-center">
                            <p className="flex-1">Цена без округления</p>
                            <p className="text-right text-xl">137 500 &#8381;</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </>)
}
export default Page;
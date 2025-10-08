'use client';

import {MultiSelect, Option} from "@/components/ui/my-components/multi-select";
import {useState} from "react";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {useAuth} from "@/context/AuthContext";
import TerminalHardwareTable from "@/components/ui/my-components/terminal-hardware-table";
import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {ChevronDown, RussianRuble, Trash2, X} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@/components/ui/input-group";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Field, FieldLabel} from "@/components/ui/field";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import Image from "next/image"
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import {PopoverContent} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {ExtraImages} from "@/components/ui/my-components/extra-images";
import TinyMCEEditor from "@/components/ui/my-components/tinymce-editor";
const OPTIONS = [
    { value: 'nextjs', label: 'Next.js' },
    { value: 'react', label: 'React' },
    { value: 'tailwind', label: 'Tailwind CSS' },
    { value: 'zustand', label: 'Zustand' },
    { value: 'prisma', label: 'Prisma' },
];

export interface Artwork {
    artist: string
    art: string
}
const works: Artwork[] = [
    {
        artist: "Ornella Binni",
        art: "https://unitsys.ru/userfiles/images/new_pages/partners/wall.jpg",
    },
    {
        artist: "Tom Byrom",
        art: "https://unitsys.ru/userfiles/images/new_pages/partners/wall.jpg",
    },
    {
        artist: "Vladimir Malyavko",
        art: "https://unitsys.ru/userfiles/images/new_pages/partners/wall.jpg",
    },
    {
        artist: "Vladimir Malyavko",
        art: "https://unitsys.ru/userfiles/images/new_pages/partners/wall.jpg",
    },
    {
        artist: "Vladimir Malyavko",
        art: "https://unitsys.ru/userfiles/images/new_pages/partners/wall.jpg",
    },
    {
        artist: "Vladimir Malyavko",
        art: "https://unitsys.ru/userfiles/images/new_pages/partners/wall.jpg",
    },
    {
        artist: "Vladimir Malyavko",
        art: "https://unitsys.ru/userfiles/images/new_pages/partners/wall.jpg",
    },
    {
        artist: "Vladimir Malyavko",
        art: "https://unitsys.ru/userfiles/images/new_pages/partners/wall.jpg",
    },
]

const Page = () =>{
    const { user } = useAuth();
    const [selected, setSelected] = useState<Option[]>([]);
    const [content, setContent] = useState('<p>Начните писать здесь...</p>');

    // @ts-ignore
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
            <div className="@container/main flex flex-row gap-3">
                <div className="flex flex-col items-center w-30 gap-3">
                    <ExtraImages works={works} />
                </div>
                <div className="flex flex-col items-center w-100 ">
                    <Card className="rounded-sm w-full flex-1 bg-[url(https://unitsys.ru/upload/images/12234567.png)] bg-no-repeat bg-center bg-cover relative">
                        <Button variant="destructive" size="icon-sm" className="absolute right-3 top-3 rounded-full p-0"><X size={10} /></Button>
                    </Card>
                </div>
                <div className="flex flex-col gap-3">
                    {/*Вот здесь будет форма, которая сохраняет данные статьи (Главная кнопка "Сохранить")*/}
                    <h1 className="scroll-m-20 text-2xl font-bold tracking-tight text-balance">UTS Fly W 55/65/75</h1>

                </div>

            </div>
            <div className="@container/main flex flex-1 flex-row gap-3">
                <div className="flex flex-col flex-1 gap-4 py-4 md:gap-6 md:py-6">
                    <TerminalHardwareTable />
                </div>
                <div className="w-full max-w-[450px] py-4 md:gap-6 md:py-6">
                    <Card className="">
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
                        <CardContent>
                            <Separator />
                        </CardContent>
                        <CardContent className="flex flex-col gap-3">
                            <div className="flex items-center">
                                <p className="flex-1">Себестоимость комплектующих</p>
                                <p className="text-right text-xl">6 875 &#8381;</p>
                            </div>
                            <div className="flex items-center">
                                <p className="flex-1">Себестоимость корпуса</p>
                                <p className="text-right text-xl">22 568 &#8381;</p>
                            </div>
                            <div className="flex items-center">
                                <p className="flex-1">Себестоимость терминала</p>
                                <p className="text-right text-xl">156 231 &#8381;</p>
                            </div>
                        </CardContent>
                        <CardContent>
                            <div className="flex gap-2">
                                <div className="flex-1 grid items-center gap-3">
                                    <Label>Накрутка с железа</Label>
                                    <p className="text-xl h-[36px]">22 568</p>
                                </div>
                                <div className="grid w-6/24 items-center gap-3">
                                    <Label htmlFor="picture">MIN маржа</Label>
                                    <Input id="picture" type="text" value="25 658" />
                                </div>
                                <div className="grid w-6/24 items-center gap-3">
                                    <Label htmlFor="picture">MAX маржа</Label>
                                    <Input id="picture" type="text" value="25 658" />
                                </div>
                            </div>
                        </CardContent>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline">Дополнительные расходы <ChevronDown /></Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="grid gap-4">
                                            <MultiSelect options={[{value: 'Установка за 2000', label: 'Установка за 2000'}]} selected={selected} onChange={setSelected} />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                <p className="text-right text-xl">156 231 &#8381;</p>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-between">
                                <p className="flex-1 font-bold">Прибыль</p>
                                <p className="text-right text-xl font-bold">156 231 &#8381;</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    </>)
}
export default Page;
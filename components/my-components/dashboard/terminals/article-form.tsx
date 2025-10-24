"use client"

import {useForm} from "react-hook-form";
import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@/components/ui/input-group";
import {BookText, CirclePlay, File, RefreshCw} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent} from "@/components/ui/card";
import {Switch} from "@/components/ui/switch";
import {MultiSelect, Option} from "@/components/my-components/multi-select";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger, DialogTitle} from "@/components/ui/dialog";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Название должно содержать минимум 2 символа",
    }).max(50),
    url: z.string(),
    description: z.string(),
    isVisible: z.boolean(),
    usePriceIndex: z.boolean(),
    isVisibleCost: z.boolean(),
    isVisibleInCalculator: z.boolean(),
    inMinpromtorg: z.boolean(),
    categories: z.array(z.object({ value: z.string(), label: z.string() })),
    width: z.number(),
    height: z.number(),
    depth: z.number(),
    volume: z.number(),
    weight: z.number(),
})

const options: Option[] = [
    { value: "option1", label: "В реестре Минпромторга" },
    { value: "option2", label: "Патриотическое воспитание" },
    { value: "option3", label: "Сенсорные столы и парты" },
    { value: "option4", label: "Интерактивные стены и полы" },
    { value: "option5", label: "Интерактивные трибуны" },
];

const ArticleForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            url: "",
            description: "",
            isVisible: true,
            usePriceIndex: false,
            isVisibleCost: false,
            isVisibleInCalculator: true,
            inMinpromtorg: false,
            categories: []
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const copyToClipboard = () => {
        const value = "unitsys.ru";
        form.setValue("url", value); // Устанавливаем значение в поле url

    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="flex gap-3 w-full">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Название терминала</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ссылка:&nbsp;
                                    <a href="https://unitsys.ru/products/isandbox-standart" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                                        https://unitsys.ru/products/isandbox-standart
                                    </a>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" form="form-rhf-demo" className="mt-[22px]">
                        Сохранить
                    </Button>

                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col flex-1 gap-4">
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Сегмент пути</FormLabel>
                                    <FormControl>
                                        <InputGroup>
                                            <InputGroupInput placeholder="https://x.com/shadcn" {...field} />
                                            <InputGroupAddon align="inline-end">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <InputGroupButton
                                                            size="icon-xs"
                                                            onClick={() => {
                                                                copyToClipboard()
                                                            }}
                                                        >
                                                            <RefreshCw />
                                                        </InputGroupButton>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Сгенерировать путь из заголовка</p>
                                                    </TooltipContent>
                                                </Tooltip>

                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Описание</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Type your message here." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4 items-end">
                            <div className="w-1/3 grid items-center gap-3">
                                <FormField
                                    control={form.control}
                                    name="width"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ширина (м)</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid w-1/3 items-center gap-3">
                                <FormField
                                    control={form.control}
                                    name="height"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Высота (м)</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid w-1/3 items-center gap-3">
                                <FormField
                                    control={form.control}
                                    name="depth"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Глубина (м)</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid w-1/3 items-center gap-3">
                                <FormField
                                    control={form.control}
                                    name="volume"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block">Объем (м<sup>3</sup>)</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid w-1/3 items-center gap-3">
                                <FormField
                                    control={form.control}
                                    name="weight"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Вес (кг)</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Dialog>
                                <DialogTrigger asChild><Button type="button" variant="secondary">Основной текст (простой редактор)</Button></DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger asChild><Button type="button" variant="secondary">Основной текст (продвинутый редактор)</Button></DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Основной текст (продвинутый редактор)</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger asChild><Button type="button" variant="secondary">Описание КП/ТЗ</Button></DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Описание КП/ТЗ</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger asChild><Button type="button" variant="secondary">Описание для прайса</Button></DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Описание для прайса</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button type="button" variant="secondary" title="Видео"><CirclePlay /></Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Видео</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button type="button" variant="secondary" title="Руководство пользователя"><BookText /></Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Руководство пользователя</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button type="button" variant="secondary" title="Документация"><File /></Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Документация</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>

                        </div>

                    </div>
                    <div className="flex flex-col gap-4 w-full max-w-[450px]">
                        <Card>
                            <CardContent className="flex flex-col gap-3">
                                <FormField
                                    control={form.control}
                                    name="isVisible"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center space-x-2">
                                                    <Switch name={field.name}
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange} id="isVisible" />
                                                    <Label htmlFor="isVisible">Показывать?</Label>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="usePriceIndex"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center space-x-2">
                                                    <Switch name={field.name}
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange} id="usePriceIndex" />
                                                    <Label htmlFor="usePriceIndex">Применять коэффициент изменения цены?</Label>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isVisibleCost"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center space-x-2">
                                                    <Switch name={field.name}
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange} id="isVisibleCost" />
                                                    <Label htmlFor="isVisibleCost">Показывать цену?</Label>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isVisibleInCalculator"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center space-x-2">
                                                    <Switch name={field.name}
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange} id="isVisibleInCalculator" />
                                                    <Label htmlFor="isVisibleInCalculator">Показывать в калькуляторе?</Label>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="inMinpromtorg"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center space-x-2">
                                                    <Switch name={field.name}
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange} id="inMinpromtorg" />
                                                    <Label htmlFor="inMinpromtorg">В реестре минпромторга</Label>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <FormField
                            control={form.control}
                            name="categories"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Категории</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            options={options}
                                            selected={field.value} // передаём текущее значение
                                            onChange={field.onChange} // передаём функцию изменения
                                            placeholder="Выберите теги..."
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </form>
        </Form>
    );
}
export default ArticleForm;
"use client"

import {useForm} from "react-hook-form";
import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@/components/ui/input-group";
import {RefreshCw} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent} from "@/components/ui/card";
import {Switch} from "@/components/ui/switch";
import {MultiSelect, Option} from "@/components/my-components/multi-select";

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
    categories: z.array(z.object({ value: z.string(), label: z.string() }))
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
                    <div className="flex flex-col flex-1 gap-3">
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
                    </div>
                    <div className="flex flex-col gap-3 w-full max-w-[450px]">
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
                        <Card>
                            <CardContent className='flex flex-col gap-3'>
                                <div className="flex gap-2">
                                    <div className="flex-1 w-1/3 grid items-center gap-3">
                                        <Label>Ширина</Label>
                                        <Input id="picture" type="text" value="25 658" />
                                    </div>
                                    <div className="grid w-1/3 items-center gap-3">
                                        <Label htmlFor="picture">Высона</Label>
                                        <Input id="picture" type="text" value="25 658" />
                                    </div>
                                    <div className="grid w-1/3 items-center gap-3">
                                        <Label htmlFor="picture">Глубина</Label>
                                        <Input id="picture" type="text" value="25 658" />
                                    </div>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="categories"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
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
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </Form>
    );
}
export default ArticleForm;
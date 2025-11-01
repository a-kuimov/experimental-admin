"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { BookText, CirclePlay, File, RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
// import { MultiSelect, Option } from "@/components/my-components/multi-select"; // Убедитесь в правильности импорта
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog";
import type { ProductWithRelated } from "@/store/types/product";
import { useEffect, useState } from "react";
import { useProductsStore } from "@/store/useProductStore"; // Импорт хранилища
// import { toast } from "@/components/ui/sonner"; // Импорт toast
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFieldArray } from "react-hook-form";
import {toast} from "sonner";

// --- Определение схемы Zod ---
// Проверьте имена полей, особенно isVisibleCoast vs isVisibleCost
const formSchema = z.object({
    title: z.string().min(2, {
        message: "Название должно содержать минимум 2 символа",
    }).max(50),
    url: z.string(),
    description: z.string(), // Предполагается, что это поле есть в product.article
    isVisible: z.boolean(),
    usePriceIndex: z.boolean(),
    isVisibleCost: z.boolean(), // Проверьте правильность имени поля (isVisibleCoast?)
    isVisibleInCalculator: z.boolean(),
    inMinpromtorg: z.boolean(),
    // categories: z.array(z.object({ value: z.string(), label: z.string() })).optional(), // Если используете MultiSelect
    width: z.number(),
    height: z.number(),
    depth: z.number(),
    volume: z.number(),
    weight: z.number(),
});

// --- Типы ---
type FormValues = z.infer<typeof formSchema>;
// type Option = { value: string; label: string }; // Определите тип, если используете MultiSelect

// --- Опции для MultiSelect (если используется) ---
/*
const options: Option[] = [
  { value: "option1", label: "В реестре Минпромторга" },
  { value: "option2", label: "Патриотическое воспитание" },
  { value: "option3", label: "Сенсорные столы и парты" },
  { value: "option4", label: "Интерактивные стены и полы" },
  { value: "option5", label: "Интерактивные трибуны" },
];
*/

interface ArticleFormProps {
    // Передаем product напрямую или productId
    product?: ProductWithRelated | null; // Используем ? для необязательного пропса
    productId?: number | null; // Опционально, если хотите загружать внутри
    loading?: boolean; // Опционально, если передаете статус загрузки
}

const ArticleForm = ({ product: externalProduct, productId, loading }: ArticleFormProps) => {
    // Если передан productId, используем хранилище для загрузки
    const {
        currentProduct: storeProduct,
        fetchProductById,
        updateProduct,
        updateLoading,
        error: storeError,
        clearError,
    } = useProductsStore();

    // Определяем, какой продукт использовать: внешний или из хранилища
    const effectiveProduct = externalProduct !== undefined ? externalProduct : storeProduct;
    const isFormLoading = loading !== undefined ? loading : updateLoading;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            url: '',
            description: '',
            isVisible: false,
            usePriceIndex: false,
            isVisibleCost: false,
            isVisibleInCalculator: false,
            inMinpromtorg: false,
            // categories: [],
            width: 0,
            height: 0,
            depth: 0,
            volume: 0,
            weight: 0,
        },
        mode: "onChange", // Позволяет валидировать по мере ввода
    });

    // --- Загрузка данных продукта при изменении productId (если используется) ---
    useEffect(() => {
        const loadProduct = async () => {
            if (productId !== undefined && productId !== null) {
                if (storeError) clearError();
                await fetchProductById(productId);
                // После fetchProductById, storeProduct должен обновиться
            }
        };

        loadProduct();
    }, [productId, fetchProductById, storeError, clearError]);

    // --- Синхронизация формы с effectiveProduct ---
    useEffect(() => {
        if (effectiveProduct) {
            const initialValues: FormValues = {
                title: effectiveProduct.article?.title || '',
                url: effectiveProduct.article?.url || '',
                description: effectiveProduct.article?.html || '', // Предполагаем, что описание тут
                isVisible: effectiveProduct.visibility?.isVisible ?? false,
                usePriceIndex: effectiveProduct.usePriceIndex ?? false,
                isVisibleCost: effectiveProduct.visibility?.isVisibleCoast ?? false, // Проверьте имя поля
                isVisibleInCalculator: effectiveProduct.visibility?.isVisibleInCalculator ?? false,
                inMinpromtorg: effectiveProduct.inMinpromtorg ?? false,
                // categories: [], // Заполните, если есть
                width: Number(effectiveProduct.dimensions?.width) || 0,
                height: Number(effectiveProduct.dimensions?.height) || 0,
                depth: Number(effectiveProduct.dimensions?.depth) || 0,
                volume: Number(effectiveProduct.dimensions?.volume) || 0,
                weight: Number(effectiveProduct.dimensions?.weight) || 0,
            };
            form.reset(initialValues); // Сбрасываем форму с новыми значениями
        } else if (effectiveProduct === null) {
            // Если продукт null, сбросить форму
            form.reset({
                title: '',
                url: '',
                description: '',
                isVisible: false,
                usePriceIndex: false,
                isVisibleCost: false,
                isVisibleInCalculator: false,
                inMinpromtorg: false,
                // categories: [],
                width: 0,
                height: 0,
                depth: 0,
                volume: 0,
                weight: 0,
            });
        }
    }, [effectiveProduct, form]);

    // --- Функция onSubmit ---
    const onSubmit = async (values: FormValues) => {
        if (!effectiveProduct) {
            toast.error("Нет продукта для обновления.");
            return;
        }

        // Подготавливаем данные для обновления
        // Это может быть частичный объект UpdateProductInput
        // Убедитесь, что структура соответствует ожидаемой API
        const updateData: any = {
            article: {
                title: values.title,
                url: values.url,
                html: values.description, // Предполагаем
            },
            usePriceIndex: values.usePriceIndex,
            inMinpromtorg: values.inMinpromtorg,
            visibility: {
                isVisible: values.isVisible,
                isVisibleCoast: values.isVisibleCost, // Проверьте имя поля
                isVisibleInCalculator: values.isVisibleInCalculator,
            },
            dimensions: {
                width: values.width,
                height: values.height,
                depth: values.depth,
                volume: values.volume,
                weight: values.weight,
            }
            // Добавьте другие поля, которые нужно обновить
        };

        try {
            // Вызываем функцию обновления из хранилища
            await updateProduct(effectiveProduct.id, updateData);
            toast.success("Продукт успешно обновлён!");
        } catch (err) {
            // Ошибка будет обработана внутри updateProduct и записана в store.error
            console.error("Ошибка обновления продукта (в компоненте):", err);
            // toast.error уже показан в хранилище
        }
    };


    const copyToClipboard = () => {
        const value = "unitsys.ru"; // Или логика генерации из title
        form.setValue("url", value);
    };

    // Отображение ошибки из хранилища, если она есть
    useEffect(() => {
        if (storeError) {
            toast.error(storeError);
            clearError(); // Очищаем ошибку в хранилище после показа
        }
    }, [storeError, clearError]);

    if (isFormLoading) {
        return <div className="flex justify-center items-center h-64">Загрузка...</div>;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="flex gap-3 w-full">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field, fieldState }) => (
                            <FormItem className="flex-1" data-invalid={fieldState.invalid}>
                                <FormLabel htmlFor="title">Название терминала</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="title"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="title"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Ссылка:&nbsp;
                                    <a href={`https://unitsys.ru/products/${encodeURIComponent(field.value || '')}`} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                                        {`https://unitsys.ru/products/${encodeURIComponent(field.value || '')}`}
                                    </a>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isFormLoading || !form.formState.isDirty || !form.formState.isValid}
                        className="mt-[22px]"
                    >
                        {isFormLoading ? "Сохранение..." : "Сохранить"}
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
                                                            onClick={copyToClipboard}
                                                            type="button" // Важно: чтобы не сабмитила форму
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
                                        <Textarea placeholder="Введите описание..." {...field} />
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
                                                {/* Используем Input с типом number и правильной обработкой значения */}
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    {...field}
                                                    value={field.value || ''} // Обрабатываем 0 и пустое значение
                                                    onChange={(e) => field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                                />
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
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    {...field}
                                                    value={field.value || ''}
                                                    onChange={(e) => field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                                />
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
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    {...field}
                                                    value={field.value || ''}
                                                    onChange={(e) => field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                                />
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
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    {...field}
                                                    value={field.value || ''}
                                                    onChange={(e) => field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                                />
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
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    {...field}
                                                    value={field.value || ''}
                                                    onChange={(e) => field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                                />
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
                                        <DialogTitle>Основной текст (простой редактор)</DialogTitle>
                                        <DialogDescription>
                                            Функционал редактора текста.
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
                                            Функционал продвинутого редактора текста.
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
                                            Функционал для описания коммерческих предложений и технических заданий.
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
                                            Функционал для описания продукта в прайс-листах.
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
                                            Управление видео контентом.
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
                                            Прикрепление и управление руководствами пользователя.
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
                                            Прикрепление и управление технической документацией.
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
                                                    <Switch
                                                        name={field.name}
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        id="isVisible"
                                                    />
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
                                                    <Switch
                                                        name={field.name}
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        id="usePriceIndex"
                                                    />
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
                                                    <Switch
                                                        name={field.name}
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        id="isVisibleCost"
                                                    />
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
                                                    <Switch
                                                        name={field.name}
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        id="isVisibleInCalculator"
                                                    />
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
                                                    <Switch
                                                        name={field.name}
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        id="inMinpromtorg"
                                                    />
                                                    <Label htmlFor="inMinpromtorg">В реестре минпромторга</Label>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        {/* Если используете MultiSelect */}
                        {/*
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Категории</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={options}
                      selected={field.value}
                      onChange={field.onChange}
                      placeholder="Выберите теги..."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            */}
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default ArticleForm;
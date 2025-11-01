"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, {useCallback} from "react";
import {UpdateProductInput} from "@/store/types/update-product";
import {toast} from "sonner";
import {useProductsStore} from "@/store/useProductStore";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    title: z
        .string()
})

const AddProductDialog = () => {
    const createProduct = useProductsStore((state) => state.createProduct);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    const onSubmit = useCallback(async (data: z.infer<typeof formSchema>) => {
        try {
            // Дожидаемся завершения обновления
            const id = await createProduct({article: data});

            router.push(`/dashboard/terminals/${id?.id}`);

        } catch (err) {
            // Если updateProduct выбросил ошибку, она будет поймана здесь
            console.error("Ошибка в handleEdit:", err);

            // Получаем сообщение об ошибке
            const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка при обновлении продукта';

            // Показываем уведомление об ошибке
            toast.error(`Ошибка: ${errorMessage}`);
        }
    }, [createProduct]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Добавить терминал</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="mb-4">
                    <DialogTitle>Добавить новый терминал</DialogTitle>
                </DialogHeader>

                    <form id="form-add-product" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="title"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-add-product-title">
                                            Название терминала
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-add-product-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="ISandBox Standart"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>

                <DialogFooter className="sm:justify-end mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Отмена
                        </Button>
                    </DialogClose>
                    <Button type="submit" color="primary" form="form-add-product">
                        Добавить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(AddProductDialog);
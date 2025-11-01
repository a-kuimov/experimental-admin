'use client'

import DashboardHeader from "@/components/my-components/dashboard/dashboard-header";
import {H3} from "@/components/my-components/typography";
import {useProductsStore, useUpdateProduct} from "@/store/useProductStore";
import {useCallback, useEffect} from "react";
import {ProductWithRelated} from "@/store/types/product";
import {DataTable} from "@/components/my-components/dashboard/terminals/product-table";
import {UpdateProductInput} from "@/store/types/update-product";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import AddProductDialog from "@/components/my-components/dashboard/terminals/add-product-dialog";

// Преобразование ProductWithRelated в формат, подходящий для таблицы


const Page = () => {
    const products = useProductsStore((state) => state.products);
    const loading = useProductsStore((state) => state.loading);
    const updateLoading = useProductsStore((state) => state.updateLoading);
    const error = useProductsStore((state) => state.error);
    const fetchProducts = useProductsStore((state) => state.fetchProducts);
    const updateProduct = useUpdateProduct();

    useEffect(() => {
        fetchProducts(); // Загрузить продукты при монтировании компонента
    }, [fetchProducts]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        } else {
            toast.success("Product updated!");
        }
    }, [error]);

    const handleEdit = useCallback(async (id: number, data: UpdateProductInput) => {
        // Опционально: Сбросить предыдущую ошибку перед новой попыткой
        // useProductsStore.getState().clearError();

        try {
            // Дожидаемся завершения обновления
            await updateProduct(id, data);

            // Если updateProduct завершился успешно (не выбросил ошибку),
            // показываем уведомление об успехе
            toast.success("Продукт успешно обновлён!");

        } catch (err) {
            // Если updateProduct выбросил ошибку, она будет поймана здесь
            console.error("Ошибка в handleEdit:", err);

            // Получаем сообщение об ошибке
            const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка при обновлении продукта';

            // Показываем уведомление об ошибке
            toast.error(`Ошибка: ${errorMessage}`);
        }
    }, [updateProduct]); // Зависимость от updateProduct
    if (loading) return <div>Loading...</div>;
   // if (error) return <div>Error: {error}</div>;

    // Преобразуем данные для таблицы



    const handleDelete = (id: number) => {
        console.log("Удалить продукт с ID:", id);
        // Здесь логика подтверждения и удаления
    };

    return (
        <>
            <DashboardHeader items={[{text: "Главная", href: "/dashboard"}, {text: "Терминалы"}]}/>
            <div className="flex flex-1 flex-col px-4 mt-10 gap-6">
                <div className="flex gap-4">
                    <H3>
                        Список терминалов
                    </H3>
                    <AddProductDialog />
                </div>

                <DataTable
                    data={products}
                    onEdit={handleEdit}
                />
            </div>
        </>
    )
}

export default Page;
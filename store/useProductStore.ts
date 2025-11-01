import { create } from 'zustand';
import type { ProductWithRelated } from './types/product'; // Убедитесь, что тип импортирован или определён
import type { CreateProductInput } from './types/create-product'; // Убедитесь, что тип импортирован
import type { UpdateProductInput } from './types/update-product'; // Убедитесь, что тип импортирован

// Типизация состояния store
interface ProductsState {
    products: ProductWithRelated[]; // Список всех продуктов
    currentProduct: ProductWithRelated | null; // Данные текущего продукта (например, для страницы деталей)
    loading: boolean; // Флаг загрузки
    updateLoading: boolean;
    error: string | null; // Сообщение об ошибке
    currentProductId: number | null; // ID текущего продукта (опционально, для отслеживания)

    // Actions
    fetchProducts: () => Promise<void>;
    fetchProductById: (id: number) => Promise<void>;
    createProduct: (productData: CreateProductInput) => Promise<ProductWithRelated | undefined>;
    updateProduct: (id: number, productData: UpdateProductInput) => Promise<ProductWithRelated>;
    setCurrentProduct: (product: ProductWithRelated | null) => void;
    setCurrentProductId: (id: number | null) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
}

// Базовый URL API (может быть вынесен в .env)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'; // Пример

export const useProductsStore = create<ProductsState>((set, get) => ({
    products: [],
    currentProduct: null,
    loading: false,
    updateLoading: false,
    error: null,
    currentProductId: null,

    // Получить все продукты
    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`${API_BASE_URL}/products`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products: ProductWithRelated[] = await response.json();
            set({ products, loading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
            set({ error: errorMessage, loading: false });
            console.error('Fetch products error:', error);
        }
    },

    // Получить продукт по ID
    fetchProductById: async (id: number) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`${API_BASE_URL}/products/${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Product with ID ${id} not found`);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const product: ProductWithRelated = await response.json();
            set({ currentProduct: product, currentProductId: id, loading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product';
            set({ error: errorMessage, loading: false });
            console.error(`Fetch product error (ID: ${id}):`, error);
        }
    },

    // Создать продукт
    createProduct: async (productData: CreateProductInput) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`${API_BASE_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Error creating product' }));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const newProduct: ProductWithRelated = await response.json();

            // Опционально: обновить локальный список, добавив новый продукт
            set((state) => ({
                products: [...state.products, newProduct],
                loading: false,
            }));

            // Опционально: установить новый продукт как текущий
            // set({ currentProduct: newProduct, currentProductId: newProduct.id });
            return newProduct;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to create product';
            set({ error: errorMessage, loading: false });
            console.error('Create product error:', error);
        }
    },

    // Обновить продукт
    updateProduct: async (id: number, productData: UpdateProductInput) => {
        set({ updateLoading: true, error: null }); // Сброс ошибки перед началом
        try {
            const response = await fetch(`${API_BASE_URL}/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Error updating product' }));
                // ВАЖНО: Выбрасываем ошибку, чтобы она "выплыла" до handleEdit
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const updatedProduct: ProductWithRelated = await response.json();

            // Обновить продукт в локальном списке
            set((state) => ({
                products: state.products.map(p => p.id === id ? updatedProduct : p),
                updateLoading: false,
                // Не устанавливаем error в null здесь, так как он уже сброшен выше
            }));

            // Если обновляется текущий продукт, обновить и его
            if (get().currentProductId === id) {
                set({ currentProduct: updatedProduct });
            }

            // Не возвращаем ничего, если успех - вызывающая функция может считать это успехом
            // Либо можно вернуть true или сам updatedProduct, если нужно
            return updatedProduct; // Возвращаем обновлённый продукт

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update product';
            set({ error: errorMessage, updateLoading: false });
            console.error(`Update product error (ID: ${id}):`, error);

            // ВАЖНО: Повторно выбрасываем ошибку, чтобы handleEdit мог её поймать
            throw error;
        }
    },

    clearError: () => set({ error: null }),
    // Установить текущий продукт (например, из другого источника)
    setCurrentProduct: (product) => set({ currentProduct: product }),

    // Установить ID текущего продукта
    setCurrentProductId: (id) => set({ currentProductId: id }),

    // Установить флаг загрузки
    setLoading: (isLoading) => set({ loading: isLoading }),

    // Установить ошибку
    setError: (error) => set({ error: error }),
}));

export const useUpdateProduct = () => useProductsStore((state) => state.updateProduct);
// Типы, соответствующие моделям Prisma
export type Article = {
    id: number;
    title: string;
    url: string | null;
    html: string | null;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    // mainImage будет включён через include
};

export type Image = {
    id: number;
    src: string | null;
    alt: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type MainImage = {
    imageId: number;
    articleId: number;
    createdAt: Date;
    updatedAt: Date;
    image: Image | null; // Может быть null, если изображение удалено, но связь осталась
};

export type Product = {
    id: number;
    articleId: number;
    usePriceIndex: boolean;
    priceIndex: number;
    inMinpromtorg: boolean;
    cpDesc: string | null;
    priceDesc: string | null;
    sortOrder: number | null;
    createdAt: Date;
    updatedAt: Date;
    // article, visibility, dimensions, additionalData будут включены через include
};

export type ProductVisibility = {
    productId: number;
    isVisibleInCalculator: boolean;
    isVisible: boolean;
    isVisibleCoast: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type ProductDimensions = {
    productId: number;
    width: number; // Используем Decimal
    height: number;
    depth: number;
    volume: number;
    weight: number;
    createdAt: Date;
    updatedAt: Date;
};

export type ProductAdditionalData = {
    productId: number;
    video: string | null;
    manual: string | null;
    documentation: string | null;
    createdAt: Date;
    updatedAt: Date;
};

// Комбинированный тип для продукта со связями
export type ProductWithRelated = Product & {
    article: Article | null; // Может быть null, если article был удалён каскадом
    visibility: ProductVisibility | null;
    dimensions: ProductDimensions | null;
    additionalData: ProductAdditionalData | null;
    mainImage: (MainImage & { image: Image | null }) | null; // mainImage, включая связанное изображение
};
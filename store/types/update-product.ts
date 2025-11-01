
export interface UpdateProductInput {
    id: number; // ID продукта для обновления
    article?: {
        title?: string;
        url?: string;
        html?: string;
        isPublished?: boolean;
    };
    image?: {
        src?: string;
        alt?: string;
    };
    visibility?: {
        isVisibleInCalculator?: boolean;
        isVisible?: boolean;
        isVisibleCoast?: boolean;
    };
    dimensions?: {
        width?: number;
        height?: number;
        depth?: number;
        volume?: number;
        weight?: number;
    };
    additionalData?: {
        video?: string;
        manual?: string;
        documentation?: string;
    };
    usePriceIndex?: boolean;
    priceIndex?: number;
    inMinpromtorg?: boolean;
    cpDesc?: string;
    priceDesc?: string;
    sortOrder?: number;
}
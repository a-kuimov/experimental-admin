
export interface CreateProductInput {
    article: {
        title: string;
        url?: string;
        html?: string;
        isPublished?: boolean;
    };
    image?: {
        src: string;
        alt?: string;
    };
    visibility?: {
        isVisibleInCalculator?: boolean;
        isVisible?: boolean;
        isVisibleCoast?: boolean;
    };
    dimensions?: {
        width?: number; // Можно передавать как number, Prisma сам конвертирует
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
    inMinpromtorg?: boolean;
    cpDesc?: string;
    priceDesc?: string;
    sortOrder?: number;
}
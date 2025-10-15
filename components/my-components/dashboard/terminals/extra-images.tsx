'use client';

import {useMemo, useState, useCallback} from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {Button} from "@/components/ui/button";
import {X} from "lucide-react"; // убедитесь, что путь верный

// Тип для элемента галереи
interface Artwork {
    artist: string;
    art: string; // URL изображения
}

interface ExtraImagesProps {
    works: Artwork[];
}

export function ExtraImages({ works }: ExtraImagesProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Форматируем данные для lightbox: массив объектов со свойством `src`
    const slides = useMemo(() => works.map((item) => ({
        src: item.art,
        alt: `Photo by ${item.artist}`,
    })), [works]);

    const handleOpenIndex = useCallback((index: number) => {
        setOpenIndex(index);
    }, [setOpenIndex])

    const handleCloseIndex = useCallback(() => {
        setOpenIndex(null);
    }, [setOpenIndex]);

    return (
        <div className="flex flex-col items-center w-30 gap-3 h-full">
            <ScrollArea className="w-30 h-100 rounded-md border">
                <div className="flex flex-col gap-2 p-1 w-full">
                    {works.map((artwork, index) => (
                        <figure key={index} className="cursor-pointer">
                            <div className="overflow-hidden rounded-md border relative">
                                <Image
                                    src={artwork.art}
                                    alt={`Photo by ${artwork.artist}`}
                                    className="aspect-square h-fit w-full object-cover"
                                    width={100}
                                    height={100}
                                    onClick={() => handleOpenIndex(index)}
                                />
                                <Button variant="destructive" className="absolute right-1 top-1 rounded-full p-0 w-2 h-6"><X size={8}/></Button>
                            </div>
                        </figure>
                    ))}
                </div>
                <ScrollBar orientation="vertical" />
            </ScrollArea>
            <Button variant="secondary">+ Добавить</Button>
            {/* Lightbox */}
            {openIndex !== null && (
                <Lightbox
                    open={true}
                    close={handleCloseIndex}
                    index={openIndex}
                    slides={slides}
                    // Опционально: можно добавить плагины
                    // plugins={[Counter]}
                />
            )}
        </div>
    );
}
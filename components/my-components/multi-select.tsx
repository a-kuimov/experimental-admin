// components/ui/multi-select.tsx
'use client';

import { useState } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import {Check, ChevronDown, X} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export interface Option {
    value: string;
    label: string;
}

interface MultiSelectProps {
    options: Option[];
    selected: Option[];
    onChange: (selected: Option[]) => void;
    placeholder?: string;
    disabled?: boolean;
}

// components/ui/multi-select.tsx
export function MultiSelect({
                                options,
                                selected,
                                onChange,
                                placeholder = 'Выберите опции...',
                                disabled = false,
                            }: MultiSelectProps) {
    const [open, setOpen] = useState(false);

    // Гарантируем, что selected — массив
    const selectedArray = Array.isArray(selected) ? selected : [];

    const handleUnselect = (option: Option) => {
        onChange(selectedArray.filter((s) => s.value !== option.value));
    };

    const handleSelect = (option: Option) => {
        if (selectedArray.some((s) => s.value === option.value)) {
            handleUnselect(option);
        } else {
            onChange([...selectedArray, option]);
        }
    };

    // ...

    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild disabled={disabled}>
                <div
                    className={cn(
                        'flex min-h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                        disabled && 'cursor-not-allowed opacity-50'
                    )}
                >
                    <div className="flex flex-wrap gap-1 flex-1">
                        {selectedArray.length > 0 ? (
                            selectedArray.map((option) => (
                                <Badge
                                    key={option.value}
                                    variant="secondary"
                                    className="data-[disabled]:opacity-50 group"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (!disabled) handleUnselect(option);
                                    }}
                                >
                                    {option.label}
                                    {!disabled && (
                                        <X className="ml-1 h-3 w-3 group-hover:opacity-100 opacity-0" />
                                    )}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-muted-foreground">{placeholder}</span>
                        )}
                    </div>
                    <span className="text-muted-foreground">
                        <ChevronDown />
                    </span>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <Command shouldFilter={false}>
                    <CommandInput placeholder="Поиск..."/>
                    <CommandEmpty>Не найдено.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                        {options.map((option) => {
                            const isSelected = selectedArray.some((s) => s.value === option.value);
                            return (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => handleSelect(option)}
                                    className={cn(
                                        'flex items-center gap-2 cursor-pointer',
                                        isSelected && 'bg-accent'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                            isSelected && 'bg-primary text-primary-foreground'
                                        )}
                                    >
                                        {isSelected && <Check className="h-3 w-3" />}
                                    </div>
                                    {option.label}
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
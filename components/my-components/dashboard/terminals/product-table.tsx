// components/DataTable.tsx
"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"; // Убедитесь, что компонент Switch есть
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UpdateProductInput } from "@/store/types/update-product"; // Убедитесь, что тип определён
import type { ProductWithRelated } from "@/store/types/product";
import {memo} from "react"; // Убедитесь, что тип определён

// --- Определение типа данных для строки таблицы ---
// Этот тип должен соответствовать тем полям ProductWithRelated, которые вы хотите отображать/редактировать
interface DataTableRowData {
    id: number;
    title: string;
    usePriceIndex: boolean;
    priceIndex: number;
    inMinpromtorg: boolean;
    // Предполагаем, что эти поля могут быть null, если связь не создана
    isVisible: boolean | null;
    isVisibleInCalculator: boolean | null;
    isVisibleCoast: boolean | null;
    // Добавьте другие поля, которые хотите отображать
}

// --- Определение колонок ---
const createColumns = (
    onFieldChange: (id: number, field: keyof UpdateProductInput, value: any) => void
): ColumnDef<DataTableRowData>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Название
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const product = row.original;
            return (
                <Input
                    defaultValue={product.title}
                    onBlur={(e) => onFieldChange(product.id, "article", { title: e.target.value })}
                    className="h-8"
                    // Можно добавить onKeyDown для Enter, если нужно
                />
            );
        },
    },
    {
        accessorKey: "priceIndex",
        header: ({ column }) => {
            return (
                <div className="truncate text-center">
                    Коэффициент
                </div>
            );
        },
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div className="truncate text-center">
                    <Input
                        defaultValue={product.priceIndex}
                        onBlur={(e) => onFieldChange(product.id, "priceIndex", { priceIndex: e.target.value })}
                        className="h-8 w-12 "
                        // Можно добавить onKeyDown для Enter, если нужно
                    />
                </div>
            );
        },

    },
    {
        accessorKey: "usePriceIndex",
        header: () => {
            return (
                <p className='text-center'>Применить коэффициент</p>
            )
        },
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div className="flex justify-center">
                    <Switch
                        id={`usePriceIndex-${product.id}`}
                        defaultChecked={product.usePriceIndex}
                        onCheckedChange={(checked) => onFieldChange(product.id, "usePriceIndex", checked)}
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "inMinpromtorg",
        header: () => {
            return (
                <p className='text-center'>В реестре МПТ</p>
            )
        },
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div className="flex justify-center">
                    <Switch
                        id={`inMinpromtorg-${product.id}`}
                        defaultChecked={product.inMinpromtorg}
                        onCheckedChange={(checked) => onFieldChange(product.id, "inMinpromtorg", checked)}
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "isVisible",
        header: () => {
            return (
                <p className='text-center'>Показ. на сайте</p>
            )
        },
        cell: ({ row }) => {
            const product = row.original;
            // Обрабатываем случай, если isVisible может быть null
            const isChecked = product.isVisible ?? false;
            return (
                <div className="flex justify-center">
                    <Switch
                        id={`isVisible-${product.id}`}
                        defaultChecked={isChecked}
                        onCheckedChange={(checked) => {
                            // Обновляем вложенный объект visibility
                            onFieldChange(product.id, "visibility", {
                                ...(product as any).visibility, // Сохраняем другие поля visibility, если они есть
                                isVisible: checked,
                            });
                        }}
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "isVisibleInCalculator",
        header: () => {
            return (
                <p className='text-center'>Показ. в калькуляторе</p>
            )
        },
        cell: ({ row }) => {
            const product = row.original;
            const isChecked = product.isVisibleInCalculator ?? false;
            return (
                <div className="flex justify-center">
                    <Switch
                        id={`isVisibleInCalculator-${product.id}`}
                        defaultChecked={isChecked}
                        onCheckedChange={(checked) => {
                            onFieldChange(product.id, "visibility", {
                                ...(product as any).visibility,
                                isVisibleInCalculator: checked,
                            });
                        }}
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "isVisibleCoast",
        header: () => {
            return (
                <p className='text-center'>Показ. цену</p>
            )
        },
        cell: ({ row }) => {
            const product = row.original;
            const isChecked = product.isVisibleCoast ?? false;
            return (
                <div className="flex justify-center">
                    <Switch
                        id={`isVisibleCoast-${product.id}`}
                        defaultChecked={isChecked}
                        onCheckedChange={(checked) => {
                            onFieldChange(product.id, "visibility", {
                                ...(product as any).visibility,
                                isVisibleCoast: checked,
                            });
                        }}
                    />
                </div>
            );
        },
    },
    // Колонка действий (если нужны отдельные кнопки "Редактировать", "Удалить")
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Открыть меню</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        {/* Пример действия, если нужно */}
                        {/* <DropdownMenuItem onClick={() => console.log("View details", product.id)}>
              Просмотр
            </DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        {/* Предполагается, что onDelete передается отдельно, если нужен */}
                        {/* <DropdownMenuItem onClick={() => onDelete && onDelete(product.id)}>
              Удалить
            </DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

// --- Основной компонент таблицы ---
interface DataTableProps {
    data: ProductWithRelated[]; // Используем оригинальный тип, преобразование будет внутри
    onEdit: (id: number, data: UpdateProductInput) => void; // Обработчик для сохранения изменений одного поля
    // onDelete?: (id: number) => void; // Опциональный обработчик удаления
}

export const DataTable = memo(({ data, onEdit }: DataTableProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    // Преобразование ProductWithRelated[] в DataTableRowData[]
    const transformedData = React.useMemo(() => {

        return data.map(product => ({
            id: product.id,
            title: product.article?.title || 'Без названия',
            usePriceIndex: product.usePriceIndex,
            priceIndex: product.priceIndex,
            inMinpromtorg: product.inMinpromtorg,
            isVisible: product.visibility?.isVisible ?? null,
            isVisibleInCalculator: product.visibility?.isVisibleInCalculator ?? null,
            isVisibleCoast: product.visibility?.isVisibleCoast ?? null,
            // Добавьте другие поля по необходимости
        }));
    }, [data]);

    // Обработчик изменения поля
    const handleFieldChange = React.useCallback((
        id: number,
        field: keyof UpdateProductInput,
        value: any
    ) => {
        // Создаем объект с минимально необходимыми данными для обновления
        const updateData: UpdateProductInput = {
            id, // ID всегда требуется
        } as UpdateProductInput; // Приведение типа, так как мы добавим поле динамически

        // Динамически добавляем измененное поле в объект обновления
        // @ts-ignore - игнорируем ошибку TS для динамического добавления свойства
        updateData[field] = value;

        onEdit(id, updateData);
    }, [onEdit]);

    const columns = React.useMemo(() => createColumns(handleFieldChange), [handleFieldChange]);

    const table = useReactTable({
        data: transformedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Фильтр по названию..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Колонки <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className=""
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {/* Локализация названий колонок */}
                                        {column.id === 'select' ? 'Выбрать' :
                                            column.id === 'actions' ? 'Действия' :
                                                column.id === 'title' ? 'Название' :
                                                column.id === 'priceIndex' ? 'Коэффициент' :
                                                    column.id === 'usePriceIndex' ? 'Применить коэффициент' :
                                                        column.id === 'inMinpromtorg' ? 'В реестре МПТ' :
                                                            column.id === 'isVisible' ? 'Показывать на сайте' :
                                                                column.id === 'isVisibleInCalculator' ? 'Показывать в калькуляторе' :
                                                                    column.id === 'isVisibleCoast' ? 'Показ. цену' :
                                                                        column.id.charAt(0).toUpperCase() + column.id.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Нет результатов.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex-1 text-sm text-muted-foreground py-4">
                {table.getFilteredSelectedRowModel().rows.length} из{" "}
                {table.getFilteredRowModel().rows.length} строк(-и) выбрано.
            </div>
        </div>
    );
})
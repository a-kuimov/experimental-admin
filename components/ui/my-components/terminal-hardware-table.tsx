import {GripVertical, Trash2} from "lucide-react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "../table";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

const TerminalHardwareTable = () => {
    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead className="w-[20px]"></TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Внутреннее название</TableHead>
                        <TableHead>Основное</TableHead>
                        <TableHead>Опция</TableHead>
                        <TableHead>Цена</TableHead>
                        <TableHead>Итого (руб)</TableHead>
                        <TableHead>Прибыль</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell><GripVertical color="grey" size={14}/></TableCell>
                        <TableCell>LCD LED 55" (139,7 см.) 3840x2160 (4K)</TableCell>
                        <TableCell>AMD Ryzen 5 с видеоядром АМ4</TableCell>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell>
                            <RadioGroup
                                className="flex flex-col"
                            >
                                <RadioGroupItem value="all" />
                            </RadioGroup>
                        </TableCell>
                        <TableCell>54999</TableCell>
                        <TableCell>65998.80</TableCell>
                        <TableCell>10999.80</TableCell>
                        <TableCell>
                            <Button variant="secondary" size="icon" className="size-8">
                                <Trash2 />
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default TerminalHardwareTable;
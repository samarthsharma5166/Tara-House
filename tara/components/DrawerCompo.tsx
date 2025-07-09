"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { FilterIcon } from "lucide-react";

interface ListItem {
    name: string;
    id: number;
}

interface Props {
    heading: string;
    list: ListItem[];
}

const DrawerCompo = ({ heading, list }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFilter = (id: number) => {
        const params = new URLSearchParams(searchParams.toString());

        if (heading.toLowerCase() === "company") {
            params.set("companyId", id.toString());
        } else if (heading.toLowerCase() === "category") {
            params.set("categoryId", id.toString());
        }

        params.set("page", "1");

        router.push(`?${params.toString()}`);
    };

    const handleClearFilter = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (heading.toLowerCase() === "company") {
            params.delete("companyId");
        } else if (heading.toLowerCase() === "category") {
            params.delete("categoryId");
        }

        params.set("page", "1");

        router.push(`?${params.toString()}`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                    <FilterIcon className="mr-2 h-4 w-4" />
                    {heading}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
                <DropdownMenuLabel>{heading}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleClearFilter} className="text-red-500">
                    Clear Filter
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {list.map((item) => (
                    <DropdownMenuItem key={item.id} onClick={() => handleFilter(item.id)}>
                        {item.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DrawerCompo;

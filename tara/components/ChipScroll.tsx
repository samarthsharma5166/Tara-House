"use client"

import { Button } from "@/components/ui/button"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const ChipScroll = () => {
    const chips = [
        "All", "Plates", "Bowls", "Cups", "Dinner Sets",
        "Glassware", "Serveware", "Gift Packs", "New Arrivals", "Best Sellers"
    ]

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = (chip: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (chip === "All") {
            params.delete("category")
        } else {
            params.set("category", chip)
        }
        router.push(`${pathname}?${params.toString()}`,{scroll:false})
    }

    return (
        <div className="w-full overflow-x-auto no-scrollbar">
            <div className="flex gap-2 min-w-max px-2 py-2">
                {chips.map((chip, idx) => (
                    <Button
                        key={idx}
                        variant="outline"
                        onClick={() => handleClick(chip)}
                        className="rounded-full hover:bg-black hover:text-white text-[16px] px-4 whitespace-nowrap workSansMedium"
                    >
                        {chip}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default ChipScroll

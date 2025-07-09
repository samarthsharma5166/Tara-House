'use client'
import React, { useState, useMemo } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import axiosInstance from '@/helper/axiosInstance'
import { Product } from '@/lib/type'
import Image from 'next/image'
import Link from 'next/link'

function SearchCompo() {
    const [searchQuery, setSearchQuery] = useState('')
    const [product, setProduct] = useState<Product[]>([])

    function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
        let timer: ReturnType<typeof setTimeout>
        return (...args: Parameters<T>) => {
            clearTimeout(timer)
            timer = setTimeout(() => func(...args), delay)
        }
    }

    async function getApiData(query: string) {
        try {
            const response = await axiosInstance.get(`/product/search?search=${query}`)
            setProduct(response.data.products || [])
        } catch (error) {
            console.error('Search error:', error)
        }
    }

    const debouncedSearch = useMemo(() =>
        debounce((query: string) => {
            getApiData(query)
        }, 500)
        , [])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)
        debouncedSearch(value)
    }

    return (
        <div className="flex flex-col relative w-full max-w-md">
            <div className="flex flex-row relative">
                <input
                    // onBlur={()=>{setProduct([]); setSearchQuery('')}}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 bg-gray-100/20 placeholder:text-gray-500 placeholder:text-sm"
                    placeholder="What are you looking for..."
                />
                <Button className="bg-black rounded-full absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3">
                    <Search className="text-white" />
                </Button>
            </div>

            {product.length > 0 && (
                <div className="absolute z-50 top-12 w-full bg-white shadow-md rounded-md max-h-60 overflow-y-scroll">
                    {product.map((product) => (
                        <Link href={`/product/${product.id}`} key={product.id} className="flex items-center gap-2 p-2 border-b hover:bg-gray-50 transition">
                            <Image
                                src={
                                    
                                        JSON.parse( product.images[0])?.secure_url
                                }
                                alt={product.name}
                                width={40}
                                height={40}
                                className="rounded object-cover"
                            />
                            <span className="text-sm font-medium text-gray-800">{product.name}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchCompo

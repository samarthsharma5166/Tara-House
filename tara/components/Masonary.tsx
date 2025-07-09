import React from 'react'
import axiosInstance from '@/helper/axiosInstance'
import ProductCard2 from './ProductCard2';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    isFeatured: boolean;
    tags: string[];
    images: string[];
    category: {
        id: number;
        name: string;
    };
    company: {
        id: number;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
}


const Masonary = async() => {
    const product:Product[] = (await axiosInstance.get("/product?page=0&limit=10")).data.products;
    return (
        <div className='p-5 w-full flex justify-center'>
            <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 lg:gap-8 overflow-hidden'>
                {product.map((src, idx) => (
                    <ProductCard2 key={idx} product={src} />
                ))}
            </div>
        </div>
    )
}

export default Masonary

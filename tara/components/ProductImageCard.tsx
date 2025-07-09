"use client"

import Image from "next/image"
import { useState } from "react";
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    isFeatured: boolean;
    tags: string[];
    images: string[];
    category: {
        name: string
    };
    company: {
        name: string
    };
    createdAt: string;
    updatedAt: string;
}
function ProductImageCard({product}:{product:Product}) {
    const [index,setIndex] = useState(0);
  return (
     <div className="space-y-4">
                <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    src={JSON.parse(product.images[index]).secure_url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all`}
                    >
                      <Image src={JSON.parse(image).secure_url} alt={`${product.name} ${index + 1}`} width={100} height={100} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
    </div>
  )
}

export default ProductImageCard
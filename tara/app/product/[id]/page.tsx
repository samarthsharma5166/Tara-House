import React from 'react';
import {  ShoppingCart, Award } from 'lucide-react';
import BackButton from '@/components/BackButton';
import axiosInstance from '@/helper/axiosInstance';
import ProductImageCard from '@/components/ProductImageCard';


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
    name:string
  };
  company: {
    name:string
  };
  createdAt: string;
  updatedAt: string;
}


const ProductPage = async ({ params }: {
  params: { id: string }
}) => {
  // Mock product data based on your schema

  // const product: Product = {
  //   id: 1,
  //   name: "Royal Bone China Dinner Set",
  //   description: "Elegant 24-piece bone china dinner set featuring delicate floral patterns and gold rim detailing. Perfect for special occasions and everyday dining. Each piece is meticulously crafted to provide durability while maintaining sophisticated aesthetics.",
  //   price: 299.99,
  //   stock: 15,
  //   isFeatured: true,
  //   tags: ["Fine China", "24-Piece Set", "Dishwasher Safe", "Gold Rim", "Floral Pattern"],
  //   images: [
  //     "/hero.png",
  //     "/hero1.jpg",
  //   ],
  //   category: {
  //     name: "Dinner Sets",
  //     slug: "dinner-sets"
  //   },
  //   company: {
  //     name: "Royal Ceramics",
  //     slug: "royal-ceramics"
  //   }
  // };
  const id = await params.id;
  const product:Product = (await axiosInstance.get(`/product/${id}`)).data.product;
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <BackButton/>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Product ID: #{product.id}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
         <ProductImageCard product={product}/>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {product.category.name}
                </span>
                {product.isFeatured && (
                  <span className="text-sm font-medium text-black bg-black/10 px-3 py-1 rounded-full flex items-center gap-1">
                    <Award size={14} />
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-black mb-3">{product.name}</h1>
              <p className="text-gray-600 h-fit break-words text-lg leading-relaxed w-full">{product.description}</p>
            </div>

            {/* Company */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>by</span>
              <span className="font-semibold text-black">{product.company.name}</span>
            </div>

            {/* Price */}
            <div className="py-4">
              <div className="text-4xl font-bold text-black">Rs.{product.price}</div>
              {/* <div className="text-sm text-gray-500 mt-1">Free shipping on orders over $199</div> */}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                    disabled={24 <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{24}</span>
                  <button
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                    disabled={24 >= product.stock}
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {product.stock} available
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={`https://wa.me/918077989856?text=${encodeURIComponent(
                    `Hello, I'm interested in the product "${product.name}" (ID: ${product.id}).\nHere is the product link: http://localhost:3001/product/${product.id}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-black text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Connect to us on WhatsApp
                </a>
                
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-black">Product Details</h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>Material</span>
                  <span className="font-medium text-black">Fine Bone China</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>Set Includes</span>
                  <span className="font-medium text-black">24 Pieces</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>Dishwasher Safe</span>
                  <span className="font-medium text-black">Yes</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>Microwave Safe</span>
                  <span className="font-medium text-black">Yes</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>Origin</span>
                  <span className="font-medium text-black">United Kingdom</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;
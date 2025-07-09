import { Product } from '@/lib/type'
import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ShoppingCart, Star } from 'lucide-react'
import ImageViewer from './ImageViwer'
import Link from 'next/link'

function ProductCard2({ product }: {
  product: Product
}) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className='w-[320px] bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden group'>
      {/* Image Section */}
      <div className='relative bg-gray-50 p-4'>
        <ImageViewer images={product.images} />

        {/* Company Badge */}
        <div className='absolute top-3 left-3'>
          <Badge variant="secondary" className="workSansRegular text-xs bg-black text-white">
            {product.company.name}
          </Badge>
        </div>

        {/* Stock Status */}
        {!product.stock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
            <Badge variant="destructive" className="workSansMedium">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className='p-5 space-y-2'>
        {/* Product Name */}
        <div className='text-center'>
          <h3 className='alegreya-sans-bold text-xl font-bold text-gray-900 leading-tight line-clamp-2 min-h-[3.5rem] flex items-center justify-center'>
            {product.name}
          </h3>
        </div>

        {/* Company Info */}
        <div className='text-center'>
          <p className='workSansMedium text-sm text-gray-600'>
            by <span className='font-semibold text-gray-800'>{product.company.name}</span>
          </p>
        </div>

        {/* Description */}
        <div className='text-center'>
          <p className='workSansRegular text-sm text-gray-600 break-words line-clamp-3 leading-relaxed'>
            {product.description}
          </p>
        </div>

        {/* Rating Section */}
        { (
          <div className='flex items-center justify-center gap-2'>
            <div className='flex items-center'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(4)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                    }`}
                />
              ))}
            </div>
            <span className='workSansRegular text-sm text-gray-600'>
              ({4})
            </span>
          </div>
        )}

        {/* Price Section */}
        <div className='text-center py-2'>
          <p className='alegreya-sans-extrabold text-3xl font-extrabold text-gray-900'>
            {formatPrice(product.price)}
          </p>
        </div>

        {/* Action Button */}
        <div className='pt-2'>
          <Link href={`/product/${product.id}`}>
            <Button
              className='w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl workSansMedium font-medium transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-gray-900'
              disabled={!product.stock}
            >
              <ShoppingCart className="h-4 w-4" />
              {product.stock ? 'View Details' : 'Unavailable'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard2
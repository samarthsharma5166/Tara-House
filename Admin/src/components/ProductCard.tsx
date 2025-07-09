import type { Product } from "@/types/types";
import { useState } from "react";
import { Edit3, Trash2, Tag, Package, Star, Calendar } from 'lucide-react';
interface ProductCardProps {
  item: Product;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

function ProductCard({ item, onEdit, onDelete }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Parse the first image URL from the JSON string
  const getImageUrl = (imageString: string) => {
    try {
      return JSON.parse(imageString).secure_url;
    } catch {
      return '';
    }
  };

  const images = item.images.map(img => getImageUrl(img)).filter(Boolean);
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  return (
    <div
      className="group relative bg-foreground  rounded-2xl shadow-lg hover:shadow-2xl mx-auto min-w-sm max-w-sm transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border shadow-cyan-300 border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {item.isFeatured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
          <Star className="w-3 h-3 fill-current" />
          Featured
        </div>
      )}

      {/* Action Buttons */}
      <div className={`absolute top-4 right-4 z-10 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <button
          onClick={() => onEdit?.(item.id)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
          title="Edit Product"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete?.(item.id)}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
          title="Delete Product"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        {images.length > 0 && (
          <>
            <img
              src={images[currentImageIndex]}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Image Navigation Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
                      }`}
                  />
                ))}
              </div>
            )}

            {/* Stock Status Overlay */}
            <div className="absolute bottom-3 right-3">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${item.stock > 50
                  ? 'bg-green-100 text-green-700'
                  : item.stock > 10
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                <Package className="w-3 h-3 inline mr-1" />
                {item.stock} left
              </div>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {item.name}
          </h3>
          <div className="text-right ml-4">
            <p className="text-2xl font-bold text-blue-600">{formatPrice(item.price)}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
          {item.description}
        </p>

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                +{item.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Added {formatDate(item.createdAt)}
          </div>
          <div className="text-right">
            ID: #{item.id}
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
    </div>
  );
}

export default ProductCard;
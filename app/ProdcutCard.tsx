"use client";

import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/components/types/product";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useWishlistStore } from '@/store/wishlistStore';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void; // Burada problem həll olundu
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        {/* Optimized Image */}
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-gray-900 truncate">{product.name}</h3>
          <p className="text-gray-900 font-semibold">${product.price.toFixed(2)}</p>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

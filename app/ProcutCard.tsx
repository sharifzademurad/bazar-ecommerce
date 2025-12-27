"use client";

import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/components/types/product";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    // Optional: Toast notification
    // toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
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
          onClick={handleAddToCart}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
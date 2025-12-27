// components/navbar.tsx - NAVBAR (cart badge ilə)
"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { CartSidebar } from "./CartSidebar";

export function Navbar() {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Bazar</h1>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
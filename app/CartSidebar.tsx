// components/CartSidebar.tsx - SƏBƏT SIDEBAR
"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <p className="text-sm text-gray-500">{totalItems} items</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <button 
              onClick={onClose}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="w-20 h-20 flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-6 space-y-4">
              <button
                onClick={clearCart}
                className="w-full text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Clear Cart
              </button>
              
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
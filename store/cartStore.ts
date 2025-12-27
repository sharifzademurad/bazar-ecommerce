import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/components/types/product'

interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  isInCart: (id: string) => boolean
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (product) => set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id)
        
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        }
        
        return {
          items: [...state.items, { ...product, quantity: 1 }],
        }
      }),
      
      removeFromCart: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),
      
      updateQuantity: (id, quantity) => set((state) => {
        if (quantity <= 0) {
          return {
            items: state.items.filter((item) => item.id !== id),
          }
        }
        
        return {
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }
      }),
      
      clearCart: () => set({ items: [] }),
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
      
      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0
        )
      },
      
      isInCart: (id) => {
        return get().items.some((item) => item.id === id)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
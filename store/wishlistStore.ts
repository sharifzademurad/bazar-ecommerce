import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistStore {
  wishlist: string[]
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  toggleWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      
      addToWishlist: (productId) => set((state) => {
        if (state.wishlist.includes(productId)) {
          return state
        }
        return {
          wishlist: [...state.wishlist, productId],
        }
      }),
      
      removeFromWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.filter((id) => id !== productId),
      })),
      
      toggleWishlist: (productId) => set((state) => {
        if (state.wishlist.includes(productId)) {
          return {
            wishlist: state.wishlist.filter((id) => id !== productId),
          }
        }
        return {
          wishlist: [...state.wishlist, productId],
        }
      }),
      
      isInWishlist: (productId) => {
        return get().wishlist.includes(productId)
      },
      
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
)
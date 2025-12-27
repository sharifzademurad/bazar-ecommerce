import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface UserStore {
  user: User | null
  isLoggedIn: boolean
  login: (user: User) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      
      login: (user) => set({ user, isLoggedIn: true }),
      
      logout: () => set({ user: null, isLoggedIn: false }),
      
      updateUser: (userData) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null,
      })),
    }),
    {
      name: 'user-storage',
    }
  )
)
// stores/useUserStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'

interface User {
  id: number
  username: string
  email: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
  logout: () => void
}

export const authStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      logout: () => {
        // Clear user data in Zustand
        set({ user: null });

        // Clear cookies
        Cookies.remove('role'); // You can remove any other cookies related to user

        // Clear localStorage
        localStorage.clear();

        // Optional: redirect to login or home page
        window.location.replace('/login'); // Uncomment this if you want to redirect
      }
    }),
    {
      name: 'user-storage',
      skipHydration: true,
    }
  )
)

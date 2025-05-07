// stores/useUserStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
}

export const authStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      skipHydration: true,
    }
  )
)

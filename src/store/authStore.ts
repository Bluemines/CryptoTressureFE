// stores/useUserStore.ts
import { create } from 'zustand'
import Cookies from 'js-cookie'

interface User {
  id: number
  username: string
  email: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
  profile: string | null
  points: number
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  logout: () => void;
  setPoints: (points: number) => void; // Accept points as a number
}

export const authStore = create<UserStore>((set) => ({
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
  },
  setPoints: (points: number) => {
    set((state) => {
      if (!state.user) return state; // Avoid setting points if user is null
      return {
        user: {
          ...state.user,
          points,
        },
      };
    });
  },
}))

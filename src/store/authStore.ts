// stores/useUserStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface User {
  id: number;
  username: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profile: string | null;
  points: number;
}

interface UserStore {
  user: User | null;
  expiresAt: number | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  logout: () => void;
  setPoints: (points: number) => void;
}

const EXPIRY_HOURS = 6;

export const authStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      expiresAt: null,
      setUser: (user: User) => {
        const expiresAt = Date.now() + EXPIRY_HOURS * 60 * 60 * 1000;
        set({ user, expiresAt });
      },
      clearUser: () => set({ user: null, expiresAt: null }),
      logout: () => {
        set({ user: null, expiresAt: null });
        Cookies.remove('role');
        localStorage.clear();
        window.location.replace('/login');
      },
      setPoints: (points: number) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              points,
            },
          };
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState, version) => {
        const state = persistedState as UserStore;
        if (state.expiresAt && Date.now() > state.expiresAt) {
          return { ...state, user: null, expiresAt: null };
        }
        return state;
      },
    }
  )
);

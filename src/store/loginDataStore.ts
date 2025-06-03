import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TrialFundTimeLeft {
  days: number
  hours: number
  mins: number
  secs: number
  isExpired: boolean
}

interface LoginData {
  access_token: string
  sub: number
  email: string
  role: string
  points: number
  trialFundTimeLeft: TrialFundTimeLeft
  trialFundAmount: string   
}

interface LoginDataStore {
  loginData: LoginData | null
  setLoginData: (data: LoginData) => void
  clearLoginData: () => void
}

export const loginDataStore = create<LoginDataStore>()(
  persist(
    (set) => ({
      loginData: null,
      setLoginData: (data) => set({ loginData: data }),
      clearLoginData: () => set({ loginData: null }),
    }),
    {
      name: "login-data-storage",
    }
  )
)

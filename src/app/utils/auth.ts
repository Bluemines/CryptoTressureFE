// import { authStore } from "@/store/authStore"

export const auth = {
  logout: async () => {
    // const email =   localStorage.getItem('userEmail');
    // console.log(email, 'emailemail');
    // const lastOnboardingDate =   localStorage.getItem('lastOnboardingDate');
    localStorage.clear()
    // if (lastOnboardingDate) {
    //       localStorage.setItem('lastOnboardingDate', lastOnboardingDate);
    // }
    // if (email) {
    //       localStorage.setItem('userEmail', email);
    // }
  },
  delete: async () => {
    localStorage.clear()
  },
  accessToken: async () => {
    return localStorage.getItem("accessToken")
  },
  setToken: async (token: string) => {
    return localStorage.setItem("accessToken", token)
  },
  // setPoints: (points: number) => {
  //   const { setPoints } = authStore()
  //   setPoints(points)
  // },
  setRole: async (role: string) => {
    return localStorage.setItem("role", role)
  },
  refreshToken: async () => {
    return localStorage.getItem("refreshToken")
  },
  platform: async () => {
    return localStorage.getItem("platform")
  },
  setUser: async (userId: string) => {
    localStorage.setItem("userId", userId)
  },
  user: async () => {
    return localStorage.getItem("userId")
  },
  updateTokens: async (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
  },
}

export default auth

import { apiClient } from "@/app/utils/axios"

export const resetPassword = async (email: string, code: string, newPassword: string, confirmPassword: string) => {
  const { data } = await apiClient.post('auth/reset-password', { email, code, newPassword, confirmPassword })
  return data
}
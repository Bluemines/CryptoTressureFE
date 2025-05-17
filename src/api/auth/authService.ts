import { apiClient } from "@/app/utils/axios"

export const getCurrentUser = async () => {
  const { data } = await apiClient.get('auth/me')
  return data.data
}

export const updateUser = async (form: FormData) => {
  const { data } = await apiClient.patch("user/update", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return data
}

export const updatePassword = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
  const { data } = await apiClient.patch('auth/password', { currentPassword, newPassword, confirmPassword })
  return data
}
import { apiClient } from "@/app/utils/axios"

export const getCurrentUser = async () => {
  const { data } = await apiClient.get('auth/me')
  return data.data
}

export const updateUser = async (id: number, username: string, phone: string) => {
  const { data } = await apiClient.patch('user/update', { id, username, phone })
  return data
}
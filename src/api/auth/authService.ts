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
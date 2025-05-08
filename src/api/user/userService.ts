import { apiClient } from "@/app/utils/axios"

export const getPopularProducts = async () => {
  const { data } = await apiClient.get('products/popular')
  return data.data
}

export const getMyMachines = async (id: number) => {
  const { data } = await apiClient.get(`products/by-user/${id}`)
  return data.data
}

export const getProductById = async (id: number) => {
  const { data } = await apiClient.get(`products/${id}`)
  return data.data
}

export const referralHistory = async () => {
  const { data } = await apiClient.get(`referral/history`)
  return data
}

export const buyProduct = async (id: number) => {
  const { data } = await apiClient.post(`products/${id}/buy`)
  return data.data
}
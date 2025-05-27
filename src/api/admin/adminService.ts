import { apiClient } from "@/app/utils/axios"

export const getChartData = async () => {
  const { data } = await apiClient.get('dashboard/revenue-stats')
  return data
}

export const getProducts = async () => {
  const { data } = await apiClient.get('products')
  return data.data
}

export const getAllWallets = async () => {
  const { data } = await apiClient.get('wallet')
  return data.data
}

export const suspendProduct = async (id: any) => {
  const { data } = await apiClient.delete(`/products/${id}`)
  return data
}

export const AddDepositforUser = async (amount:number, email:string) => {
  const { data } = await apiClient.post(`deposit/admin`,{amount,email} )
  return data
}

export const ListAdminDepositsforUser = async () => {
  const { data } = await apiClient.get(`deposit/admin` )
  return data
}
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

export const getReferralsData = async () => {
  const { data } = await apiClient.get('referral/admin/listing')
  return data
}

export const getReferralDataById = async (id: number) => {
  const { data } = await apiClient.get(`referral/admin/tree/${id}`)
  return data
} 

export const ListUserTransaction = async () => {
  const { data } = await apiClient.get(`/transactions/admin` )
  return data
}

export const GetAgreement = async () => {
  const { data } = await apiClient.get(`agreements/getAgreements` )
  return data
}

export const AdminAllWallets = async () => {
  const { data } = await apiClient.get(`wallet/admin-allWallets` )
  return data
}
import { apiClient } from "@/app/utils/axios"

export const getWalletStats = async () => {
  const { data } = await apiClient.get('wallet/me')

  return data.data
}

export const postWalletWithdraw = async (cnic: string, amount: number) => {
  const { data } = await apiClient.post('withdraw', { cnic, amount })
  return data.data
}

export const getPendingWallets = async () => {
  const { data } = await apiClient.get('withdraw/admin/pending')
  return data.data
}

export const getWalletHistory = async () => {
  const { data } = await apiClient.get('withdraw/history')
  return data.data
}

export const rejectWithdrawl = async (id: number) => {
  const { data } = await apiClient.patch(`withdraw/admin/${id}/reject`)
  return data.data
}
export const approveWithdrawl = async (id: number) => {
  const { data } = await apiClient.patch(`withdraw/admin/${id}/approve`)
  return data.data
}

export const withdrawHistory = async () =>{
  const {data} = await apiClient.get('withdraw/user-history')
  return data.data
}
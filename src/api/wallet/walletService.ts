import { apiClient } from "@/app/utils/axios"

export const getWalletStats = async () => {
  const { data } = await apiClient.get('wallet/me')

  return data.data
}
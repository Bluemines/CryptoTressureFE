import { queryFn } from "@/app/utils/axios";
import { Wallet } from "@/store/walletStore";
import { useQuery } from "@tanstack/react-query";
import { getWalletStats } from "./walletService";

interface ApiResponse {
    data: {
      items: Wallet[];  // Add items array inside data
      // Add other properties if needed
    };
    status: string;
    message: string;
  }
export const getWalletsApi = () => ({
  queryKey: ["wallets"],
  queryFn: () => queryFn(`wallet`) as Promise<ApiResponse>,
});

export const useGetWalletStats = () => {
  return useQuery({
    queryKey: ['wallet_stats'],
    queryFn: getWalletStats
  })
}
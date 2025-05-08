import { queryFn } from "@/app/utils/axios";
import { Wallet } from "@/store/walletStore";

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

import { queryFn } from "@/app/utils/axios";
import { Wallet } from "@/store/walletStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { approveWithdrawl, getPendingWallets, getWalletHistory, getWalletStats, postWalletWithdraw, rejectWithdrawl, withdrawHistory } from "./walletService";
import { IAxiosError } from "@/lib/axiosError";

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

export const usePostWalletWithdraw = () => {
  return useMutation<any, IAxiosError, { cnic: string, amount: number }>({
    mutationFn: (payload) => postWalletWithdraw(payload.cnic, payload.amount)
  })
}

export const useGetPendingWallets = () => {
  return useQuery({
    queryKey: ['pending_wallets'],
    queryFn: getPendingWallets
  })
}

export const useGetWalletHistory = () => {
  return useQuery({
    queryKey: ['admin_wallet_history'],
    queryFn: getWalletHistory
  })
}

export const useRejectWithdrawl = () => {
  const queryClient = useQueryClient();

  return useMutation<any, IAxiosError, { id: number }>({
    mutationFn: (payload) => rejectWithdrawl(payload.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending_wallets'] });
      queryClient.invalidateQueries({ queryKey: ['admin_wallet_history'] });
    },
  });
};

export const useApproveWithdrawl = () => {
  const queryClient = useQueryClient();

  return useMutation<any, IAxiosError, { id: number }>({
    mutationFn: (payload) => approveWithdrawl(payload.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending_wallets'] });
      queryClient.invalidateQueries({ queryKey: ['admin_wallet_history'] });
    },
  });
};

export const useGetWithdrawHistory = () => {
  return useQuery({
    queryKey: ['withdraw_history'],
    queryFn: withdrawHistory
  })
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IAxiosError } from "@/lib/axiosError"
import { 
  AddDepositforUser, 
  getAllWallets, 
  getChartData, 
  getProducts, 
  getUserWithdrawHistory,
  suspendProduct, 
  ListAdminDepositsforUser, getReferralsData, getReferralDataById, 
  ListUserTransaction,
  GetAgreement,
  AdminAllWallets,
  rejectWithdraw,
 approveWithdraw
} from "./adminService"
import toast from "react-hot-toast"

export const useGetProducts = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ["products"],
    queryFn: getProducts,
  })
}

export const useGetWallets = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ["wallets"],
    queryFn: getAllWallets,
  })
}

export const useGetChartData = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ["chart_data"],
    queryFn: getChartData,
  })
}

export const useSuspendProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<any, IAxiosError, { id: any }>({
    mutationFn: ({ id }) => suspendProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message)
    }
  });
};


export const useAddDepositforUser = () => {

  return useMutation<any, IAxiosError, { amount:number, email:string }>({
    mutationFn: (payload) => AddDepositforUser(payload.amount, payload.email),
    onError: (error: any) => {
      toast.error(error.response?.data?.message)
    }
  });
};


export const useListAdminDepositsforUser = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ["ListAdminDepositsforUser"],
    queryFn: ListAdminDepositsforUser,
  })
}

export const useListUserTransaction = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ["ListUserTransaction"],
    queryFn: ListUserTransaction,
  })
}

export const useGetAgreement = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ["GetAgreement"],
    queryFn: GetAgreement,
  })
}

export const useAdminAllWallets = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ["AdminAllWallets"],
    queryFn: AdminAllWallets,
  })
}


export const useReferralsData = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ['get_admin_referrals_data'],
    queryFn: getReferralsData
  })
}

export const useReferralDataById = (id: number) => {
  return useQuery<any, IAxiosError>({
    queryKey: ['get_admin_referral_data', id],
    queryFn: () => getReferralDataById(id),
    enabled: !!id,
  });
};


export const usegetUserWithdrawHistory = (id: number) => {
  return useQuery<any, IAxiosError>({
    queryKey: ['get_user_withdraw_history', id],
    queryFn: () => getUserWithdrawHistory(id),
    enabled: !!id,
  });
};

export const useApproveWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation<any, IAxiosError, { id: number }>({
    mutationFn: ({ id }) => approveWithdraw(id),
    onSuccess: () => {
      toast.success("Withdrawal approved successfully");
      queryClient.invalidateQueries({ queryKey: ["get_user_withdraw_history"] }); // Refetch
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to approve withdrawal");
    },
  });
};

export const useRejectWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation<any, IAxiosError, { id: number }>({
    mutationFn: ({ id }) => rejectWithdraw(id),
    onSuccess: () => {
      toast.success("Withdrawal rejected successfully");
      queryClient.invalidateQueries({ queryKey: ["get_user_withdraw_history"] }); // Refetch
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to reject withdrawal");
    },
  });
};

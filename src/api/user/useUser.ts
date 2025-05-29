import { useMutation, useQuery } from "@tanstack/react-query"
import { IAxiosError } from "@/lib/axiosError"
import {
  buyProduct,
  convertCurrency,
  getMyMachines,
  getPopularProducts,
  getProductById,
  getReferralTree,
  referralHistory,
  referralLink,
  initDeposit,
  postWebhook
} from "./userService"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

export const useGetPopularProducts = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ["get_products"],
    queryFn: getPopularProducts,
  })
}

export const useGetMyMachines = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ["get_my_machines"],
    queryFn: getMyMachines,
  })
}

export const useGetReferralTree = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ['get_referral_tree'],
    queryFn: getReferralTree
  })
}

export const useGetProductById = (id?: number) => {
  return useQuery<any, IAxiosError>({
    queryKey: ["get_product_by_id", id],
    queryFn: ({ queryKey }) => getProductById(queryKey[1] as number),
    enabled: !!id,
  })
}

export const useGetReferralHistory = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ["referral_history"],
    queryFn: referralHistory,
  })
}

export const useGetReferralLink = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ["referral_link"],
    queryFn: referralLink,
  })
}

export const useBuyProduct = () => {
  return useMutation<any, IAxiosError, { id: number }>({
    mutationFn: (payload) => buyProduct(payload.id),
    onSuccess: (data) => {
      toast.success(data.message || 'Purchased')
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>
      toast.error(err.response?.data?.message || "Something went wrong")
    },
  })
}


export const useinitDeposit = () => {
  return useMutation<any, AxiosError, { amount: number }>({
    mutationFn: (payload) => initDeposit( payload.amount), // Pass amount here
    onSuccess: (data) => {
      toast.success(data.message || 'Success');
      // Data contains `reference`, you can handle it here or in the component
      return data.data.reference;
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });
};

export const usePostWebhook = () => {
  return useMutation<any, AxiosError, { reference: string; amount: number; transactionId: string }>({
    mutationFn: (data) => postWebhook(data),
    onSuccess: () => {
      toast.success("Webhook posted successfully");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Error posting webhook");
    },
  });
};

export const useGetCurrencyValue = () => {
  return useQuery({
    queryKey: ['currency_value'],
    queryFn: convertCurrency
  })
}
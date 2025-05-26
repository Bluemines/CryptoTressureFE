import { useMutation, useQuery } from "@tanstack/react-query"
import { IAxiosError } from "@/lib/axiosError"
import {
  buyProduct,
  convertCurrency,
  getMyMachines,
  getPopularProducts,
  getProductById,
  referralHistory,
  referralLink,
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

export const useGetCurrencyValue = () => {
  return useQuery({
    queryKey: ['currency_value'],
    queryFn: convertCurrency
  })
}
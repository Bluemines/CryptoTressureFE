import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IAxiosError } from "@/lib/axiosError"
import { getAllWallets, getChartData, getProducts, suspendProduct } from "./adminService"
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
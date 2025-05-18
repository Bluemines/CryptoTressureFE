import { useQuery } from "@tanstack/react-query"
import { IAxiosError } from "@/lib/axiosError"
import { getAllWallets, getChartData, getProducts } from "./adminService"

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
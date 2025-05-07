import { useQuery } from "@tanstack/react-query"
import { IAxiosError } from "@/lib/axiosError"
import { getAllWallets, getProducts } from "./adminService"

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
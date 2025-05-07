import { useMutation, useQuery } from "@tanstack/react-query"
import { IAxiosError } from "@/lib/axiosError"
import {
  buyProduct,
  getMyMachines,
  getPopularProducts,
  getProductById,
} from "./userService"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

export const useGetPopularProducts = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ["get_products"],
    queryFn: getPopularProducts,
  })
}

export const useGetMyMachines = (id?: number) => {
  return useQuery<any, IAxiosError>({
    queryKey: ["get_my_machines", id],
    queryFn: ({ queryKey }) => getMyMachines(queryKey[1] as number),
    enabled: !!id,
  })
}

export const useGetProductById = (id?: number) => {
  return useQuery<any, IAxiosError>({
    queryKey: ["get_product_by_id", id],
    queryFn: ({ queryKey }) => getProductById(queryKey[1] as number),
    enabled: !!id,
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

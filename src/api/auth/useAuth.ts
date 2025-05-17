import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { getCurrentUser, updateUser } from "./authService"
import { IAxiosError } from "@/lib/axiosError"
import queryClient from "@/app/utils/queryClient"

export const useGetCurrentUser = (options?: UseQueryOptions<any, IAxiosError>) => {
  return useQuery<any, IAxiosError, any>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    ...options,
  })
}

export const useUpdateUser = () => {
  return useMutation<any, IAxiosError, FormData>({
    mutationFn: (form) => updateUser(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })
}
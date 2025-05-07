import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { getCurrentUser, updateUser } from "./authService"
import { IAxiosError } from "@/lib/axiosError"
import queryClient from "@/app/utils/queryClient"

type updateUserPayload = {
  id: number,
  username: string
  phone: string
}

export const useGetCurrentUser = (options?: UseQueryOptions<any, IAxiosError>) => {
  return useQuery<any, IAxiosError>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    ...options,
  })
}

export const useUpdateUser = () => {
  return useMutation<any, IAxiosError, updateUserPayload>({
    mutationFn: (payload) => updateUser(payload.id, payload.username, payload.phone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })
}
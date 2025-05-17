import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { getCurrentUser, updatePassword, updateUser } from "./authService"
import { IAxiosError } from "@/lib/axiosError"
import queryClient from "@/app/utils/queryClient"
import toast from 'react-hot-toast'

export const useGetCurrentUser = (
  options?: UseQueryOptions<any, IAxiosError>
) => {
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

export const useUpdatePassword = () => {
  return useMutation<
    any,
    IAxiosError,
    { confirmPassword: string; newPassword: string; currentPassword: string }
  >({
    mutationFn: (payload) => updatePassword(payload.currentPassword, payload.newPassword, payload.confirmPassword),
    onSuccess: (data) => {
      toast.success(data.message || 'password updated')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}

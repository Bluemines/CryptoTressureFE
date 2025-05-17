import { IAxiosError } from "@/lib/axiosError"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getNotifications, getNotificationsCount, patchReadNotifications } from "./notificationsService"

export const useGetNotifications = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ["get_notifications"],
    queryFn: getNotifications,
    refetchInterval: 60000,
  })
}

export const useGetNotificationsCount = () => {
  return useQuery<any, IAxiosError>({
    queryKey: ["get_notifications_count"],
    queryFn: getNotificationsCount,
    refetchInterval: 60000,
  })
}

export const useReadNotifications = () => {
  const queryClient = useQueryClient()
  return useMutation<any, IAxiosError, { id: number }>({
    mutationFn: (payload) => patchReadNotifications(payload.id),
     onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_notifications"] })
      queryClient.invalidateQueries({ queryKey: ["get_notifications_count"] })
    },
  })
}
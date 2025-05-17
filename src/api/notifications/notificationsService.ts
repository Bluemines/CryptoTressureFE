import { apiClient } from "@/app/utils/axios"

export const getNotifications = async () => {
  const { data } = await apiClient.get('notifications/me')
  return data
}

export const getNotificationsCount = async () => {
  const { data } = await apiClient.get('notifications/unread/count')
  return data
}

export const patchReadNotifications = async (id: number) => {
  const { data } = await apiClient.patch(`notifications/${id}/read`)
  return data
}
"use client"
import { Avatar, Badge, Popover } from "antd"
import { BellOutlined, SearchOutlined } from "@ant-design/icons"
import { Input } from "@mui/material"
import Link from "next/link"
import {
  useGetNotifications,
  useGetNotificationsCount,
  useReadNotifications,
} from "@/api/notifications/useNotifications"
import toast from "react-hot-toast"
import { authStore } from "@/store/authStore"
import { base_image_url } from "../constants/keys"

const Header = () => {
  const { data: notifications } = useGetNotifications()
  const { data: notificationsCount } = useGetNotificationsCount()
  const { mutate: postReadNotifications } = useReadNotifications()

  const role = localStorage.getItem("role") === "USER" ? "user" : "admin"

  const { user } = authStore()


  const handleReadNotifications = (id: number) => {
    postReadNotifications({ id}, {
      onSuccess: (data) => {
        // toast.success('notification read')
      },
      onError: () => {
        toast.error('failed')
      }
    })
  }

  const notificationContent = (
    <div className='w-64 bg-[#1f1f1f] text-white rounded-md'>
      <h3 className='text-sm font-semibold mb-2'>Notifications</h3>
      <ul className='space-y-2 max-h-64 overflow-y-auto'>
        {(notifications || []).map((notification: any) => (
          <li
            key={notification.id}
            className={`text-sm px-3 py-2 rounded-md cursor-pointer ${
              notification.isRead
                ? "text-gray-400 bg-[#2c2c2c]"
                : "text-white bg-[#3a3a3a] font-medium"
            }`}
            onClick={() => handleReadNotifications(notification.id)}
          >
            <div className="text-xs text-gray-500 mb-1">
              {new Date(notification.createdAt).toLocaleString()}
            </div>
            <div>{notification.message}</div>
          </li>
        ))}
        {(!notifications || notifications.length === 0) && (
          <li className='text-sm text-gray-400 px-3 py-2'>No notifications</li>
        )}
      </ul>
    </div>
  )

  return (
    <header className='flex items-center gap-4 z-50'>
      <div className='relative w-full'>
        {/* <Input
          placeholder='Search here'
          disableUnderline
          className='bg-[#161616] px-4 py-2 rounded-md w-full ps-10'
        />
        <div className='absolute left-4 top-[50%] -translate-y-[50%]'>
          <SearchOutlined className='!text-[#6f6b7d]' />
        </div> */}
      </div>

      <Popover
        content={notificationContent}
        placement='bottomRight'
        trigger='click'
      >
        <Badge
          count={notificationsCount}
          size='small'
          offset={[-10, 10]}
          className='!text-[#737373] cursor-pointer'
        >
          <BellOutlined className='text-3xl text-gray-400' />
        </Badge>
      </Popover>

      <div className='relative inline-block'>
        <Link href={`/${role}/settings`}>
          <Avatar
            size={38}
            src={user?.profile ? `${base_image_url}${user.profile}` : 'https://i.pravatar.cc/300'}
            className='border-2 border-white'
          />
        </Link>
        <span className='absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-green-500' />
      </div>
    </header>
  )
}

export default Header

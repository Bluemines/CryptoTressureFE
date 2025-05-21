"use client"

import { usePathname } from "next/navigation"
import { Layout, Menu } from "antd"
import {
  DashboardOutlined,
  CompassOutlined,
  AppstoreOutlined,
  WalletOutlined,
  DownloadOutlined,
  UploadOutlined,
  ShareAltOutlined,
  DollarOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import Link from "next/link"
import { authStore } from "@/store/authStore"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { CloseOutlined } from "@mui/icons-material"

const { Sider } = Layout
type MenuItem = Required<MenuProps>["items"][number]

const routeMap = {
  dashboard: "/admin/dashboard",
  usersManagement: "/admin/usersManagement",
  machineManagement: "/admin/machineManagement",
  agreementManagement: "/admin/agreement-management",
  rewardsDistribution: "/admin/rewards-distribution",
  referalSystemManagement: "/admin/referral-system-management",
  walletManagement: "/admin/wallet-management",
  settings: "/admin/settings",
  faqs: "/faqs",
  termsAndConditions: "/contact",
  contactInformation: "/contact",
}

const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: <Link href={routeMap.dashboard}>Dashboard</Link>,
  },
  {
    key: "usersManagement",
    icon: <CompassOutlined />,
    label: <Link href={routeMap.usersManagement}>Users Management</Link>,
  },
  {
    key: "machineManagement",
    icon: <AppstoreOutlined />,
    label: <Link href={routeMap.machineManagement}>Machine Management</Link>,
  },
  {
    key: "agreementManagement",
    icon: <WalletOutlined />,
    label: (
      <Link href={routeMap.agreementManagement}>Agreement Management</Link>
    ),
  },
  {
    key: "rewardsDistribution",
    icon: <DownloadOutlined />,
    label: (
      <Link href={routeMap.rewardsDistribution}>Rewards Distribution</Link>
    ),
  },
  {
    key: "referalSystemManagement",
    icon: <UploadOutlined />,
    label: (
      <Link href={routeMap.referalSystemManagement}>
        Referals System Management
      </Link>
    ),
  },
  {
    key: "walletManagement",
    icon: <ShareAltOutlined />,
    label: <Link href={routeMap.walletManagement}>Wallet Management</Link>,
  },
  {
    key: "settings",
    icon: <DollarOutlined />,
    label: <Link href={routeMap.settings}>Settings</Link>,
  },
  // {
  //   type: "group",
  //   label: "Links",
  //   children: [
  //     {
  //       key: "faqs",
  //       icon: <InfoCircleOutlined />,
  //       label: <Link href={routeMap.faqs}>FAQs</Link>,
  //     },
  //     {
  //       key: "termsAndConditions",
  //       icon: <TeamOutlined />,
  //       label: (
  //         <Link href={routeMap.termsAndConditions}>Terms and Conditions</Link>
  //       ),
  //     },
  //     {
  //       key: "contact",
  //       icon: <TeamOutlined />,
  //       label: (
  //         <Link href={routeMap.contactInformation}>Contact Information</Link>
  //       ),
  //     },
  //   ],
  // },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: <span>Logout</span>,
  },
]

const AdminSidebar = () => {
  const pathname = usePathname()
  const { logout } = authStore()
  const [collapsed, setCollapsed] = useState(true)

  const selectedKey =
    Object.entries(routeMap).find(([, path]) =>
      pathname.startsWith(path)
    )?.[0] || "dashboard"

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      logout()
      toast.loading("Loggin Out!")
    }
    setCollapsed(true)
  }

  useEffect(() => {
    if (!collapsed) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [collapsed])

  return (
    <>
      {!collapsed && (
        <div
          className='fixed inset-0 bg-black/60 z-30 md:hidden'
          onClick={() => setCollapsed(true)}
        />
      )}
      {/* Mobile Toggle Button */}
      <button
        className='md:hidden fixed top-6 left-6 z-50 bg-[#161616] text-white p-2 rounded'
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <CloseOutlined />}
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-[220px] bg-[#161616] z-40 transition-transform duration-300 md:hidden
          ${collapsed ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        <div className='h-16 grid place-items-center text-white font-bold border-b border-gray-700'>
          <img src='/logo.jpg' alt="logo" className="w-16 h-16" />
        </div>
        <div className='overflow-y-auto h-[calc(100vh-64px)] scrollbar-hide'>
          <Menu
            mode='inline'
            selectedKeys={[selectedKey]}
            theme='dark'
            items={menuItems}
            className='!bg-[#161616]'
            onClick={handleClick}
          />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className='hidden md:block sticky top-0 h-screen w-[220px]'>
        <Sider
          theme='dark'
          className='!bg-[#161616] h-screen overflow-hidden'
          width={220}
        >
          <div className='h-16 grid place-items-center text-white font-bold border-b border-gray-700'>
            <img src='/logo.jpg' alt="logo" className="w-16 h-16" />
          </div>
          <div className='overflow-y-auto h-[calc(100vh-64px)] scrollbar-hide'>
            <Menu
              mode='inline'
              selectedKeys={[selectedKey]}
              theme='dark'
              items={menuItems}
              className='!bg-[#161616]'
              onClick={handleClick}
            />
          </div>
        </Sider>
      </div>
    </>
  )
}

export default AdminSidebar

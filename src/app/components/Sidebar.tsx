"use client"
import { useState } from "react"
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
  SettingOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  PhoneOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import Link from "next/link"
import { authStore } from "@/store/authStore"
import toast from "react-hot-toast"

const { Sider } = Layout
type MenuItem = Required<MenuProps>["items"][number]

const routeMap = {
  dashboard: "/user/dashboard",
  explore: "/user/explore",
  collection: "/user/collection",
  wallet: "/user/wallet",
  deposit: "/user/deposit",
  withdraw: "/user/withdraw",
  referral: "/user/referral",
  commission: "/user/commission",
  settings: "/user/settings",
  about: "/about",
  team: "/team",
  faqs: "/faqs",
  contact: "/contact",
}

const menuItems: MenuItem[] = [
  { key: "dashboard", icon: <DashboardOutlined />, label: <Link href={routeMap.dashboard}>Dashboard</Link> },
  { key: "explore", icon: <CompassOutlined />, label: <Link href={routeMap.explore}>Explore</Link> },
  { key: "collection", icon: <AppstoreOutlined />, label: <Link href={routeMap.collection}>My Collection</Link> },
  { key: "wallet", icon: <WalletOutlined />, label: <Link href={routeMap.wallet}>Wallet</Link> },
  { key: "deposit", icon: <DownloadOutlined />, label: <Link href={routeMap.deposit}>Deposit</Link> },
  { key: "withdraw", icon: <UploadOutlined />, label: <Link href={routeMap.withdraw}>Withdraw</Link> },
  { key: "referral", icon: <ShareAltOutlined />, label: <Link href={routeMap.referral}>Referral</Link> },
  { key: "commission", icon: <DollarOutlined />, label: <Link href={routeMap.commission}>Referral Commission</Link> },
  { key: "settings", icon: <SettingOutlined />, label: <Link href={routeMap.settings}>Settings</Link> },
  {
    type: "group", label: "MORE", children: [
      { key: "about", icon: <InfoCircleOutlined />, label: <Link href={routeMap.about}>About Us</Link> },
      { key: "team", icon: <TeamOutlined />, label: <Link href={routeMap.team}>Team</Link> },
    ],
  },
  {
    type: "group", label: "Links", children: [
      { key: "faqs", icon: <QuestionCircleOutlined />, label: <Link href={routeMap.faqs}>FAQs</Link> },
      { key: "contact", icon: <PhoneOutlined />, label: <Link href={routeMap.contact}>Contact Info</Link> },
    ],
  },
  { key: "logout", icon: <LogoutOutlined />, label: <span>Logout</span> },
]

const Sidebar = () => {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(true)
  const { logout } = authStore()

  const selectedKey =
    Object.entries(routeMap).find(([, path]) => pathname.startsWith(path))?.[0] || "dashboard"

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      logout()
      toast.loading('Loggin Out!')
    }
    setCollapsed(true)
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-6 left-6 z-50 bg-[#161616] text-white p-2 rounded"
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
        <div className="h-16 grid place-items-center text-white font-bold border-b border-gray-700">
          LOGO
        </div>
        <div className="overflow-y-auto h-[calc(100vh-64px)] scrollbar-hide">
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            theme="dark"
            items={menuItems}
            className="!bg-[#161616]"
            onClick={handleClick}
          />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block sticky top-0 h-screen w-[220px]">
        <Sider
          theme="dark"
          className="!bg-[#161616] h-screen overflow-hidden"
          width={220}
        >
          <div className="h-16 grid place-items-center text-white font-bold border-b border-gray-700">
            LOGO
          </div>
          <div className="overflow-y-auto h-[calc(100vh-64px)] scrollbar-hide">
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              theme="dark"
              items={menuItems}
              className="!bg-[#161616]"
              onClick={handleClick}
            />
          </div>
        </Sider>
      </div>
    </>
  )
}

export default Sidebar

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
  SettingOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  PhoneOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import Link from "next/link"

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
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: <Link href={routeMap.dashboard}>Dashboard</Link>,
  },
  {
    key: "explore",
    icon: <CompassOutlined />,
    label: <Link href={routeMap.explore}>Explore</Link>,
  },
  {
    key: "collection",
    icon: <AppstoreOutlined />,
    label: <Link href={routeMap.collection}>My Collection</Link>,
  },
  {
    key: "wallet",
    icon: <WalletOutlined />,
    label: <Link href={routeMap.wallet}>Wallet</Link>,
  },
  {
    key: "deposit",
    icon: <DownloadOutlined />,
    label: <Link href={routeMap.deposit}>Deposit</Link>,
  },
  {
    key: "withdraw",
    icon: <UploadOutlined />,
    label: <Link href={routeMap.withdraw}>Withdraw</Link>,
  },
  {
    key: "referral",
    icon: <ShareAltOutlined />,
    label: <Link href={routeMap.referral}>Referral</Link>,
  },
  {
    key: "commission",
    icon: <DollarOutlined />,
    label: <Link href={routeMap.commission}>Referral Commission</Link>,
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: <Link href={routeMap.settings}>Settings</Link>,
  },
  {
    type: "group",
    label: "MORE",
    children: [
      {
        key: "about",
        icon: <InfoCircleOutlined />,
        label: <Link href={routeMap.about}>About Us</Link>,
      },
      {
        key: "team",
        icon: <TeamOutlined />,
        label: <Link href={routeMap.team}>Team</Link>,
      },
    ],
  },
  {
    type: "group",
    label: "Links",
    children: [
      {
        key: "faqs",
        icon: <QuestionCircleOutlined />,
        label: <Link href={routeMap.faqs}>FAQs</Link>,
      },
      {
        key: "contact",
        icon: <PhoneOutlined />,
        label: <Link href={routeMap.contact}>Contact Information</Link>,
      },
    ],
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: <span>Logout</span>,
  },
]

const Sidebar = () => {
  const pathname = usePathname()

  const selectedKey =
    Object.entries(routeMap).find(([, path]) => pathname.startsWith(path))?.[0] || "dashboard"

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      // handle logout logic
    }
  }

  return (
    <Sider
      theme="dark"
      className="!bg-[#161616] h-screen max-h-screen overflow-hidden !sticky !top-0"
    >
      <div className="h-16 text-gray-300 font-bold text-lg grid place-items-center">
        LOGO
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-64px)] scrollbar-hide">
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
  )
}

export default Sidebar

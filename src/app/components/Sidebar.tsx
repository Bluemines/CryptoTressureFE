"use client"
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
const { Sider } = Layout

type MenuItem = Required<MenuProps>["items"][number]

import Link from "next/link"

const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: <Link href='/user/dashboard'>Dashboard</Link>,
  },
  {
    key: "explore",
    icon: <CompassOutlined />,
    label: <Link href='/user/explore'>Explore</Link>,
  },
  {
    key: "collection",
    icon: <AppstoreOutlined />,
    label: <Link href='/user/collection'>My Collection</Link>,
  },
  {
    key: "wallet",
    icon: <WalletOutlined />,
    label: <Link href='/user/wallet'>Wallet</Link>,
  },
  {
    key: "deposit",
    icon: <DownloadOutlined />,
    label: <Link href='/user/deposit'>Deposit</Link>,
  },
  {
    key: "withdraw",
    icon: <UploadOutlined />,
    label: <Link href='/user/withdraw'>Withdraw</Link>,
  },
  {
    key: "referral",
    icon: <ShareAltOutlined />,
    label: <Link href='/user/referral'>Referral</Link>,
  },
  {
    key: "commission",
    icon: <DollarOutlined />,
    label: <Link href='/user/commission'>Referral Commission</Link>,
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: <Link href='/user/settings'>Settings</Link>,
  },
  {
    type: "group",
    label: "MORE",
    children: [
      {
        key: "about",
        icon: <InfoCircleOutlined />,
        label: <Link href='/about'>About Us</Link>,
      },
      {
        key: "team",
        icon: <TeamOutlined />,
        label: <Link href='/team'>Team</Link>,
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
        label: <Link href='/faqs'>FAQs</Link>,
      },
      {
        key: "contact",
        icon: <PhoneOutlined />,
        label: <Link href='/contact'>Contact Information</Link>,
      },
    ],
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: <span>Logout</span>, // Handle manually in onClick
  },
]

const Sidebar = () => {
  const handleClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      return
    }
  }

  return (
    <Sider
      theme='dark'
      className='!bg-[#161616] h-screen max-h-screen overflow-hidden'
    >
      <div className='h-16 text-gray-300 font-bold text-lg grid place-items-center'>
        LOGO
      </div>
      <div className='overflow-y-auto max-h-[calc(100vh-64px)] scrollbar-hide'>
        <Menu
          mode='inline'
          defaultSelectedKeys={["dashboard"]}
          theme='dark'
          items={menuItems}
          className='!bg-[#161616]'
          onClick={handleClick}
        />
      </div>
    </Sider>
  )
}

export default Sidebar

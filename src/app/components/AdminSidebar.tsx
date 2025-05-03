"use client";

import { usePathname } from "next/navigation";
import { Layout, Menu } from "antd";
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
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

const routeMap = {
  dashboard: "/admin/dashboard",
  usersManagement: "/admin/usersManagement",
  machineManagement: "/admin/machineManagement",
  agreementManagement: "/admin/collection",
  rewardsDistribution: "/admin/wallet",
  referalSystemManagement: "/user/deposit",
  walletManagement: "/user/withdraw",
  settings: "/user/settings",
  faqs: "/faqs",
  termsAndConditions: "/contact",
  contactInformation: "/contact",
};

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
  {
    type: "group",
    label: "Links",
    children: [
      {
        key: "faqs",
        icon: <InfoCircleOutlined />,
        label: <Link href={routeMap.faqs}>FAQs</Link>,
      },
      {
        key: "termsAndConditions",
        icon: <TeamOutlined />,
        label: (
          <Link href={routeMap.termsAndConditions}>Terms and Conditions</Link>
        ),
      },
      {
        key: "contact",
        icon: <TeamOutlined />,
        label: (
          <Link href={routeMap.contactInformation}>Contact Information</Link>
        ),
      },
    ],
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: <span>Logout</span>,
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  const selectedKey =
    Object.entries(routeMap).find(([, path]) =>
      pathname.startsWith(path)
    )?.[0] || "dashboard";

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      // handle logout logic
    }
  };

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
  );
};

export default AdminSidebar;

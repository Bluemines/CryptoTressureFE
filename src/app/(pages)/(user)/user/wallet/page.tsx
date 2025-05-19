"use client"
import PrimaryButton from "@/app/components/ui/PrimaryButton"
import StatsCard from "@/app/components/ui/StatsCard"
import { useRouter } from "next/navigation"
import DataTable from "@/app/components/DataTable/DataTable"
import { TableColumn } from "react-data-table-component"
import StatusBadge from "@/app/components/ui/StatusBadge"
import { useGetWalletStats } from "@/api/wallet"
import StatsCardSkeleton from "@/loaders/StatsCardSkeleton"

const Wallet = () => {

  const { data: walletStats, isLoading } = useGetWalletStats();

  const statsData = [
    { label: "Available Balance", value: walletStats?.available + "$", bgColor: "bg-[#6F4FF2]" },
    { label: "Reserved Balance", value: walletStats?.reserved+ "$", bgColor: "bg-[#50BB25]" },
    { label: "Total Balance", value: walletStats?.total+ "$", bgColor: "bg-[#F9D62C]" },
  ];
  type Data = {
    sr: number
    date: string
    amount: string
    fee: string
    netPayout: string
    method: string
    status: string
  }
  const dataSource = [
    {
      sr: 1,
      date: "1 min ago",
      amount: "Rs 1332",
      fee: "Rs 5",
      netPayout: "Rs 1327",
      method: "Easypaisa",
      status: 'Approved'
    },
    {
      sr: 2,
      date: "1 min ago",
      amount: "Rs 1332",
      fee: "Rs 5",
      netPayout: "Rs 1327",
      method: "Easypaisa",
      status: 'Pending'
    },
    {
      sr: 3,
      date: "1 min ago",
      amount: "Rs 1332",
      fee: "Rs 5",
      netPayout: "Rs 1327",
      method: "Easypaisa",
      status: 'Rejected'
    },
  ]

  const columns: TableColumn<Data>[] = [
    {
      name: "ID",
      selector: (row) => row.sr,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Fee",
      selector: (row) => row.fee,
    },
    {
      name: "Net Payout",
      selector: (row) => row.netPayout,
    },
    {
      name: "Method",
      selector: (row) => row.method,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => <StatusBadge status={row.status} />,
    },
  ]

  const tabs = ["Credit", "Debit"]
  const router = useRouter()

  return (
    <div className='text-white py-5'>
      <div className='flex flex-col md:flex-row md:items-center justify-between'>
        <div className='text-xl mb-4 md:mb-0'>P2P Wallet</div>
        <div className='flex flex-col md:flex-row gap-2 md:items-center'>
          <div className='bg-[#2B2B2B] py-2 px-4 rounded'>
            Easypaisa account *******1234 is connected
          </div>
          <div>
            <PrimaryButton
              onClick={() => router.push("/user/wallet/add-new-wallet")}
              bgColor='#7367F0'
              className='!text-white !border-none !font-medium'
            >
              Add new Wallet
            </PrimaryButton>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-4 my-4'>
        {isLoading
      ? Array(3).fill(0).map((_, i) => <StatsCardSkeleton key={i} />)
      : statsData.map((stat, index) => (
          <StatsCard
            key={index}
            label={stat.label}
            value={stat.value ?? "N/A"}
            bgColor={stat.bgColor}
          />
        ))}
      </div>

      <DataTable data={dataSource} columns={columns} themeStyle='gray' />
    </div>
  )
}

export default Wallet

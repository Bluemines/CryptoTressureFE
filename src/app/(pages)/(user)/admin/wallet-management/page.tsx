"use client"
import { useGetWallets } from "@/api/admin/useAdmin"
import { StatsCard } from "@/app/components/cards/StatsCard"
import PrimaryButton from "@/app/components/ui/PrimaryButton"
import AdminTable from "@/app/components/ui/tables/AdminTable"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"

const page = () => {

  const { data: walletsData } = useGetWallets()
  console.log("wallets data: ", walletsData)

  const router = useRouter()

  const statsData = [
    {
      value: "4,235",
      label: "Total Users",
      color: "bg-[#7C3AED]",
      //   image: Image,
    },
    {
      value: "3,312",
      label: "Verified Users",
      color: "bg-[#50BB25]",
      //   image: Image,
    },
    {
      value: "20",
      label: "Suspended Users",
      color: "bg-[#EC1E2D]",
      //   image: Image,
    },
  ]

  const columns = [
    { id: "user", label: "User" },
    { id: "amount", label: "Amount" },
    { id: "date", label: "Date" },
    { id: "paymentMethod", label: "Payment Method" },
    { id: "status", label: "Status" },
  ]

  const formattedPendingWithdrawals = walletsData?.items?.map((item: any) => ({
    id: item.id,
    user: item.user.username,
    amount: `$${item.balance}`,
    date: formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }),
    paymentMethod: "Easypaisa",
    status: "Pending",
  })) || []

  const data = [
    {
      id: 1,
      user: "John Bushmill",
      amount: "$50",
      date: "1 min ago",
      paymentMethod: "Easypaisa",
      status: "Pending",
    },
    {
      id: 2,
      user: "John Bushmill",
      amount: "$50",
      date: "1 min ago",
      paymentMethod: "Easypaisa",
      status: "Pending",
    },
    {
      id: 3,
      user: "John Bushmill",
      amount: "$50",
      date: "1 min ago",
      paymentMethod: "Easypaisa",
      status: "Pending",
    },
    // Add more entries...
  ]

  const walletHistoryColumns = [
    { id: "user", label: "User" },
    { id: "balance", label: "Balance" },
    { id: "totalWithdrawn", label: "Total Withdrawn" },
    { id: 'lastActivity', label: 'Last Activity'}
  ]

  const walletHistoryData = [
    {
      id: 1,
      user: "John Bushmill",
      balance: "$1000",
      totalWithdrawn: "$50",
      lastActivity: 'Withdraw $10'
    },
    {
      id: 2,
      user: "John Bushmill",
      balance: "$1000",
      totalWithdrawn: "$50",
      lastActivity: 'Withdraw $10'
    },
    {
      id: 3,
      user: "John Bushmill",
      balance: "$1000",
      totalWithdrawn: "$50",
      lastActivity: 'Withdraw $10'
    },
  ]
  return (
    <div>
      <div className='flex items-center justify-between mt-4'>
        <div className='text-xl'>Wallet Management</div>
        <div className='flex gap-2 items-center'>
          <div className='bg-[#2B2B2B] py-2 px-4 rounded'>
            Easypaisa account *******1234 is connected
          </div>
          <div>
            <PrimaryButton
              onClick={() => router.push("/admin/wallet-management/add-new-wallet")}
              bgColor='#7367F0'
              className='!text-white !border-none !font-medium'
            >
              Add new Wallet
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4'>
        {statsData.map((stat, index) => (
          <StatsCard
            //   image={stat.image}
            key={index}
            value={stat.value}
            label={stat.label}
            color={stat.color}
          />
        ))}
      </div>
      <div className='font-semibold text-xl my-3'>Pending Withdrawal</div>
      <AdminTable data={formattedPendingWithdrawals} columns={columns} actions={true} showHeader={true} icon2={false} showButton={false} />
      <div className='font-semibold text-xl my-3'>Wallet History</div>
      <AdminTable data={walletHistoryData} columns={walletHistoryColumns} actions={false} showHeader={true} showButton={false} />
    </div>
  )
}

export default page

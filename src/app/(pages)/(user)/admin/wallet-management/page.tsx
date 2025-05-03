"use client"
import { StatsCard } from "@/app/components/cards/StatsCard"
import PrimaryButton from "@/app/components/ui/PrimaryButton"
import AdminTable from "@/app/components/ui/tables/AdminTable"

const page = () => {
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
    { id: "name", label: "User" },
    { id: "email", label: "Email" },
    { id: "level", label: "Level" },
    { id: "date", label: "Date" },
    { id: "rewardAmount", label: "Reward Amount" },
    { id: "status", label: "Status" },
  ]

  const data = [
    {
      id: 1,
      name: "John Bushmill",
      email: "Johnb@mail.com",
      level: 2,
      date: "1 min ago",
      rewardAmount: "$1000",
      status: "Failed",
    },
    {
      id: 2,
      name: "John Bushmill",
      email: "Johnb@mail.com",
      level: 2,
      date: "1 min ago",
      rewardAmount: "$1000",
      status: "Success",
    },
    {
      id: 3,
      name: "John Bushmill",
      email: "Johnb@mail.com",
      level: 2,
      date: "1 min ago",
      rewardAmount: "$1000",
      status: "Success",
    },

    // Add more entries...
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
              // onClick={() => router.push("/user/wallet/add-new-wallet")}
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
      <AdminTable data={data} columns={columns} actions={false} showHeader={true} />
      <div className='font-semibold text-xl my-3'>Wallet History</div>
      <AdminTable data={data} columns={columns} actions={false} showHeader={true} />
    </div>
  )
}

export default page

"use client"

import { useGetMyMachines, useGetPopularProducts } from "@/api/user/useUser"
import { NFTCard } from "@/app/components/cards/NFTCard"
import { StatsCard } from "@/app/components/cards/StatsCard"
import CardLoader from "@/loaders/CardLoader"
import { authStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import useUserDashboard from "./hooks";

const page = () => {
  const { user } = authStore()
  const { data, isLoading } = useGetPopularProducts();
  const {
    data: myMachinesData,
    isLoading: isMachinesLoading,
  } = useGetMyMachines(user?.id);

  const router = useRouter()


  const { stats, formatCurrency } = useUserDashboard();

  const statsData = [
    {
      value: stats ? formatCurrency(stats.currentDeposit) : "Loading...",
      label: "Current Deposit",
      color: "bg-[#7C3AED]",
    },
    {
      value: stats ? formatCurrency(stats.currentBalance) : "Loading...",
      label: "Current Balance",
      color: "bg-[#22C55E]",
    },
    {
      value: stats ? formatCurrency(stats.totalWithdraw) : "Loading...",
      label: "Total Withdraw",
      color: "bg-[#EAB308]",
    },
    {
      value: stats ? formatCurrency(stats.totalReferralBonus) : "Loading...",
      label: "Total Referral Bonus",
      color: "bg-[#F97316]",
    },
  ];

  const nftData = [
    {
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      title: "Distant Galaxy",
      price: 1000,
      dailyIncome: 2,
      fee: 1,
      days: 10,
      level: "Lv1-Lv3",
    },
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      title: "Distant Galaxy",
      price: 1000,
      dailyIncome: 2,
      fee: 1,
      days: 10,
      level: "Lv1-Lv3",
    },
    {
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      title: "Distant Galaxy",
      price: 1000,
      dailyIncome: 2,
      fee: 1,
      days: 10,
      level: "Lv1-Lv3",
    },
    {
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      title: "Distant Galaxy",
      price: 1000,
      dailyIncome: 2,
      fee: 1,
      days: 10,
      level: "Lv1-Lv3",
    },
  ];

  return (
    <div className='min-h-screen bg-black p-4 md:p-8'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Stats Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              value={stat.value}
              label={stat.label}
              color={stat.color}
            />
          ))}
        </div>

        {/* Popular Machines */}
        <div>
          <h2 className='text-2xl font-bold text-white mb-4'>
            Popular Machines
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {isLoading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <CardLoader key={idx} />
                ))
              : data?.map((nft: any, index: number) => (
                  <NFTCard
                    key={index}
                    image={nft.image}
                    title={nft.title}
                    price={+nft.price}
                    dailyIncome={+nft.dailyIncome}
                    fee={+nft.fee}
                    days={nft.rentalDays}
                    level='Lv1-Lv3'
                    action='Buy'
                    onClick={() => router.push(`/user/explore/NFTdetails?id=${nft?.id}`)}
                  />
                ))}
          </div>
        </div>

        {/* My Machines */}
        <div>
          <h2 className='text-2xl font-bold text-white mb-4'>My Machines</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {isMachinesLoading
              ? Array.from({ length: 4 }).map((_, idx) => <CardLoader key={idx} />)
              : myMachinesData?.map((nft: any, index: number) => (
                  <NFTCard
                    key={index}
                    image={nft.image}
                    title={nft.title}
                    price={+nft.price}
                    dailyIncome={+nft.dailyIncome}
                    fee={+nft.fee}
                    days={nft.rentalDays}
                    level='Lv1-Lv3'
                    action='Sell'
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page

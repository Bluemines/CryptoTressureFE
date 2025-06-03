"use client"

import { Modal, Box, Typography, Button } from "@mui/material"
import { useGetMyMachines, useGetPopularProducts } from "@/api/user/useUser"
import { NFTCard } from "@/app/components/cards/NFTCard"
import { StatsCard } from "@/app/components/cards/StatsCard"
import CardLoader from "@/loaders/CardLoader"
import { authStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import useUserDashboard from "./hooks"
import StatsCardSkeleton from "@/loaders/StatsCardSkeleton"
import { useEffect, useState } from "react"
import { loginDataStore } from "@/store/loginDataStore"
import CountdownTimer from "@/app/components/CountdownTimer"

const page = () => {
  const { user } = authStore()
  // const points = localStorage.getItem("points")
  const [openProfileModal, setOpenProfileModal] = useState(false)

  useEffect(() => {
    if (user && !user.profile) {
      setOpenProfileModal(true)
    }
  }, [user])

  const { loginData } = loginDataStore()

  const { data, isLoading } = useGetPopularProducts()
  const popularProducts = data ?? []

  const { data: myMachinesData, isLoading: isMachinesLoading } = useGetMyMachines()
  const router = useRouter()

  const {
    stats,
    formatCurrency,
    isLoading: isStatsLoading,
  } = useUserDashboard()

  const statsData = [
    {
      // @ts-ignore
      value: stats ? formatCurrency(stats.data.currentDeposit) : "Loading...",
      label: "Current Deposit",
      color: "bg-[#7C3AED]",
    },
    {
      // @ts-ignore
      value: stats ? formatCurrency(stats.data.currentBalance) : "Loading...",
      label: "Current Balance",
      color: "bg-[#22C55E]",
    },
    {
      // @ts-ignore
      value: stats ? formatCurrency(stats.data.totalWithdraw) : "Loading...",
      label: "Total Withdraw",
      color: "bg-[#EAB308]",
    },
    {
      // @ts-ignore
      value: stats ? formatCurrency(stats.data.totalReferralBonus) : "Loading...",
      label: "Total Referral Bonus",
      color: "bg-[#F97316]",
    },
  ]

  return (
    <div className='min-h-screen bg-black py-4 md:p-8'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Stats Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {isStatsLoading
            ? Array(4).fill(0).map((_, index) => <StatsCardSkeleton key={index} />)
            : statsData.map((stat, index) => (
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
          <div className='flex flex-col md:flex-row items-center justify-between'>
            <h2 className='text-2xl font-bold text-white mb-4'>Popular Machines</h2>

            {loginData && !loginData?.trialFundTimeLeft.isExpired && (
              <div className='flex items-center justify-between flex-col md:flex-row w-full md:w-auto gap-2 md:gap-4 bg-[#7367F0] p-2 my-4'>
                <span>Trial Fund Expiry</span>
                <CountdownTimer
                  timeLeft={loginData.trialFundTimeLeft}
                  onExpire={() => console.log("Trial fund expired")}
                />
              </div>
            )}

            {loginData && (
              <div className='flex items-center justify-between flex-col md:flex-row w-full md:w-auto gap-2 md:gap-4 bg-[#7367F0] p-2 my-4 text-white font-medium'>
                <span>Trial Amount</span>
                <span>$200</span>
              </div>
            )}
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {!isLoading && popularProducts.length > 0 ? (
              popularProducts.map((product: any, index: number) => (
                <NFTCard
                  key={index}
                  image={product.image}
                  title={product.title}
                  price={+product.price}
                  dailyIncome={+product.dailyIncome}
                  fee={0}
                  days={product.rentalDays}
                  level={product.level}
                  action='Buy'
                  countdownTimeLeft={undefined} // ✅ avoids TS error
                />
              ))
            ) : (
              <div className='col-span-full text-center text-gray-400 py-10'>
                {isLoading ? "Loading popular products..." : "No popular machines found."}
              </div>
            )}
          </div>
        </div>

        {/* My Machines */}
        <div>
          <h2 className='text-2xl font-bold text-white mb-4'>My Machines</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {isMachinesLoading ? (
              Array.from({ length: 4 }).map((_, idx) => <CardLoader key={idx} />)
            ) : myMachinesData && myMachinesData.length > 0 ? (
              myMachinesData.map((nft: any, index: number) => (
                <NFTCard
                  key={index}
                  image={nft.image}
                  title={nft.title}
                  price={+nft.price}
                  dailyIncome={+nft.dailyIncome}
                  fee={+nft.fee}
                  days={nft.rentalDays}
                  level={nft.level}
                  action='Sell'
                  countdownTimeLeft={nft.remaining ?? undefined}
                />
              ))
            ) : (
              <div className='col-span-full text-center text-gray-400 py-10'>
                You haven't bought any machines.
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={openProfileModal}
        onClose={() => setOpenProfileModal(false)}
        aria-labelledby='profile-modal-title'
        aria-describedby='profile-modal-description'
      >
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography id='profile-modal-title' variant='h6' component='h2'>
            Complete Your Profile
          </Typography>
          <Typography id='profile-modal-description' sx={{ mt: 2 }}>
            Please upload a profile picture to complete your profile.
          </Typography>
          <Button
            variant='contained'
            color='primary'
            href='/user/settings'
            sx={{ mt: 3 }}
          >
            Go to Settings
          </Button>
        </Box>
      </Modal>

      {/* {points && +points > 0 && (

        <div className='mt-8 text-center text-white rounded-lg py-4 px-6'>
          🎉 You have received <span className='font-bold'>{points}</span> reward points!
        </div>
      )} */}
    </div>
  )
}

export default page

"use client"
import { NFTCard } from "@/app/components/cards/NFTCard"
import NFTModal from "@/app/components/modals/NFTModal"
import { useState } from "react"
// import Image from "../../../../assets/Images/exploreImg.png"
import { useGetMyMachines } from "@/api/user/useUser"
import { authStore } from "@/store/authStore"
import CardLoader from "@/loaders/CardLoader"
export default function Collection() {
  const { user } = authStore()
  const { data: myMachinesData, isLoading: isMachinesLoading } = useGetMyMachines()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState<any>(null)
  return (
    <div className='min-h-screen bg-black p-4 md:p-8'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* My NFTs */}
        <div>
          <h2 className='text-2xl font-bold text-white mb-4'>My Machines</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {isMachinesLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <CardLoader key={idx} />
              ))
            ) : myMachinesData?.length > 0 ? (
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
                  action='Rented'
                  countdownTimeLeft={nft.remaining}
                  onClick={() => {
                    setSelectedNFT(nft)
                    setIsModalOpen(true)
                  }}
                />
              ))
            ) : (
              <div className='col-span-full text-white text-center py-10'>
                You have not purchased any machines.
              </div>
            )}
          </div>
        </div>
      </div>
      <NFTModal
        id={selectedNFT?.id}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={selectedNFT?.title}
        price={selectedNFT?.price}
        fee={selectedNFT?.fee}
        image={selectedNFT?.image}
        type='sell'
      />
    </div>
  )
}

"use client"

import ExploreNFTCard from "@/app/components/cards/ExploreNftCard"
import { NFTCard } from "@/app/components/cards/NFTCard"
import NFTModal from "@/app/components/modals/NFTModal"
import { useState } from "react"
// import Image from "../../../../../assets/Images/exploreImg.png"
import { useRouter, useSearchParams } from "next/navigation"
import { useGetPopularProducts, useGetProductById } from "@/api/user/useUser"
import SkeletonExploreNFTCard from "@/loaders/SkeletonExploreNFTCard"
import CardLoader from "@/loaders/CardLoader"

export default function NFTdetails() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("id")
  const userId = productId ? Number(productId) : undefined

  const router = useRouter()

  const { data: popularNFTsData, isLoading: isPopularProductsLoading } = useGetPopularProducts()
  const popularProducts = popularNFTsData?.items

  const { data, isLoading } = useGetProductById(userId)

  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className='min-h-screen bg-[#0A0A0B] text-white p-4 md:p-8'>
      <div className='max-w-7xl mx-auto space-y-12'>
        {/* Hero NFT */}
        {isLoading ? (
          <SkeletonExploreNFTCard isHero={true} />
        ) : data ? (
          <ExploreNFTCard
            title={data.title}
            image={data.image}
            price={+data.price}
            dailyIncome={+data.dailyIncome}
            fee={+data.fee}
            days={data.rentalDays}
            level='Lv1-Lv3'
            description={data.description}
            isHero={true}
            onClick={() => setIsModalOpen(true)}
          />
        ) : null}

        {/* Popular NFTs */}
        <div>
          <h2 className='text-2xl font-bold mb-6'>Popular NFTS</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {isPopularProductsLoading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <CardLoader key={idx} />
                ))
              : popularProducts?.map((nft: any, index: number) => (
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
      </div>
      <NFTModal
        id={data?.id}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={data?.title}
        price={data?.price}
        fee={data?.fee}
        image={data?.image}
        type='buy'
      />
    </div>
  )
}

"use client";

import { useGetPopularProducts } from "@/api/user/useUser";
import { NFTCard } from "@/app/components/cards/NFTCard";
import CardLoader from "@/loaders/CardLoader";
// import { authStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
// import usePopProducts from "./hooks";

export default function Explore() {

  const { data, isLoading } = useGetPopularProducts();
  const popularProducts = data?.items
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Popular Machines</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {isLoading
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
                    level={nft.level}
                    action='Buy'
                    onClick={() => router.push(`/user/explore/NFTdetails?id=${nft?.id}`)}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { usegetAllProducts } from "@/api/user/useUser";
import { NFTCard } from "@/app/components/cards/NFTCard";
import CardLoader from "@/loaders/CardLoader";
import { useRouter } from "next/navigation";

export default function Explore() {
  const { data, isLoading } = usegetAllProducts();
  const products = data?.items ?? [];
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Explore Machines</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => <CardLoader key={idx} />)
            ) : products.length > 0 ? (
              products.map((nft: any, index: number) => (
                <NFTCard
                  key={index}
                  image={nft.image}
                  title={nft.title}
                  price={+nft.price}
                  dailyIncome={+nft.dailyIncome}
                  fee={0}
                  days={nft.rentalDays}
                  level={nft.level}
                  action="Buy"
                  onClick={() => router.push(`/user/explore/NFTdetails?id=${nft.id}`)}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-10">
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

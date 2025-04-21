"use client";

import { NFTCard } from "@/app/components/cards/NFTCard";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
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
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Popular NFTS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nftData.map((nft, index) => (
              <NFTCard
                key={index}
                {...nft}
                action="Buy"
                onClick={() => router.push("explore/NFTdetails")}
              />
            ))}
          </div>
        </div>

        {/* My NFTs */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Popular NFTS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nftData.map((nft, index) => (
              <NFTCard
                key={index}
                {...nft}
                action="Buy"
                onClick={() => router.push("explore/NFTdetails")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import ExploreNFTCard from "@/app/components/cards/ExploreNftCard";
import { NFTCard } from "@/app/components/cards/NFTCard";
import NFTModal from "@/app/components/modals/NFTModal";
import { useState } from "react";

export default function NFTdetails() {
  const heroNFT = {
    title: "NFT Name",
    image: "/lovable-uploads/7180623f-7d17-46b5-98bf-e265afdfac15.png",
    price: 10,
    dailyIncome: 2,
    fee: 1,
    days: 10,
    level: "Lv1-Lv3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };

  const popularNFTs = [
    {
      title: "Distant Galaxy",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      price: 1000,
      dailyIncome: 2,
      fee: 1,
      days: 10,
      level: "Lv1-Lv3",
    },
    {
      title: "Distant Galaxy",
      image: "/lovable-uploads/7180623f-7d17-46b5-98bf-e265afdfac15.png",
      price: 1000,
      dailyIncome: 2,
      fee: 1,
      days: 10,
      level: "Lv1-Lv3",
    },
    {
      title: "Distant Galaxy",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      price: 1000,
      dailyIncome: 2,
      fee: 1,
      days: 10,
      level: "Lv1-Lv3",
    },
    {
      title: "Distant Galaxy",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      price: 1000,
      dailyIncome: 2,
      fee: 1,
      days: 10,
      level: "Lv1-Lv3",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero NFT */}
        <ExploreNFTCard
          {...heroNFT}
          isHero={true}
          onClick={() => setIsModalOpen(true)}
        />

        {/* Popular NFTs */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Popular NFTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularNFTs.map((nft, index) => (
              <NFTCard
                key={index}
                {...nft}
                action="Buy"
                onClick={() => setIsModalOpen(true)}
              />
            ))}
          </div>
        </div>
      </div>
      <NFTModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="NFT Title"
        image={require("../../../../../assets/Images/exploreImg.png")}
        type="buy"
      />
    </div>
  );
}

"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface SellNFTModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  image: string;
  type: string;
}

export default function NFTModal({
  open,
  onOpenChange,
  title,
  image,
  type,
}: SellNFTModalProps) {
  const [price, setPrice] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);
  const total = Number(price) + 1; // Adding $1 fee

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onOpenChange]);

  const handleSell = () => {
    console.log(`Selling NFT for $${price}`);
    onOpenChange(false);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        ref={modalRef}
        className="relative z-50 w-full max-w-[425px] rounded-lg bg-[#1A1A1D] border border-gray-800 p-6 shadow-xl animate-in fade-in-0 zoom-in-95"
      >
        {/* Header */}
        <div className="relative mb-6">
          <h2 className="text-xl text-white font-semibold">{title}</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-0 top-0 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Image */}
          <div className="rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title}
              className="w-full h-48 object-cover"
            />
          </div>
          {type === "sell" && (
            <div className="space-y-4">
              {/* Price Input */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter your price"
                  className="w-full h-10 px-3 py-2 bg-[rgba(32,32,36,0.5)] border border-purple-500 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                />
              </div>

              {/* Total */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>

              {/* Sell Button */}
              <button
                onClick={handleSell}
                disabled={!price}
                className="w-full h-10 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
              >
                Sell for ${Number(price).toFixed(2)}
              </button>
            </div>
          )}
          {type === "buy" && (
            <div>
              <div className="bg-[#1A1F2C] p-5 ">
                <div className="flex flex-row justify-between">
                  <label className="block text-sm font-medium text-white mb-1">
                    Price
                  </label>
                  <div className="block text-sm font-medium text-white mb-1">
                    $10
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b border-gray-500 pb-2">
                  <label className="block text-sm font-medium text-white mb-1">
                    Service Fee
                  </label>
                  <div className="block text-sm font-medium text-white mb-1">
                    $1
                  </div>
                </div>
                <div className="flex flex-row justify-between mt-2">
                  <label className="block text-sm font-medium text-white mb-1">
                    Total
                  </label>
                  <div className="block text-sm font-medium text-white mb-1">
                    $11
                  </div>
                </div>
                <button
                  onClick={handleSell}
                  // disabled={!price}
                  className="w-full h-10 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
                >
                  Buy for ${Number(price).toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

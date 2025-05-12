"use client";

import { base_image_url } from "@/app/constants/keys";
import { ArrowRight } from "lucide-react";
import React from "react";

interface NFTCardProps {
  image: string;
  title: string;
  price: number;
  dailyIncome: number;
  fee: number;
  days: number;
  level: string;
  action: "Buy" | "Sell" | "Rented";
  onClick?: () => void;
}

// Internal Card component
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`rounded-lg shadow-sm ${className}`}>{children}</div>;
};

// Internal CardContent component
const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

// Internal Button component
const Button = ({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export function NFTCard({
  image,
  title,
  price,
  dailyIncome,
  fee,
  days,
  level,
  action,
  onClick,
}: NFTCardProps) {
  return (
    <Card className="bg-[#1A1F2C] border-none overflow-hidden">
      <div className="relative aspect-square">
        <img src={`${base_image_url}${image}`} alt={title} className="object-fit w-full h-full" />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price</span>
            <span className="text-white">${price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Daily Income</span>
            <span className="text-white">{dailyIncome}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Fee</span>
            <span className="text-white">{fee}%</span>
          </div>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <div>
            <span className="text-gray-400">Days: </span>
            <span className="text-white">{days}</span>
          </div>
          <div>
            <span className="text-gray-400">Level: </span>
            <span className="text-white">{level}</span>
          </div>
        </div>
        <Button
          className={`w-full py-2 ${
            action === "Buy" || "Rented"
              ? "bg-[#7C3AED] hover:bg-[#6D28D9]"
              : "bg-[#6366F1] hover:bg-[#4F46E5]"
          }`}
          onClick={onClick}
        >
          {action}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

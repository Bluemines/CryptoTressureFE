import React from "react";
import { base_image_url } from "@/app/constants/keys";
interface NFTCardProps {
  title: string;
  image: string;
  price: number;
  dailyIncome: number;
  fee: number;
  days: number;
  level: string;
  isHero?: boolean;
  description?: string;
  onClick?: () => void;
}
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`rounded-lg shadow-sm ${className}`}>{children}</div>;
};
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
const ExploreNFTCard: React.FC<NFTCardProps> = ({
  title,
  image,
  price,
  dailyIncome,
  fee,
  days,
  level,
  isHero = false,
  description,
  onClick,
}) => {
  return (
    <Card
      className={`overflow-hidden bg-[rgba(32,32,36,0.5)] border-gray-800 backdrop-blur-sm transition-transform hover:scale-[1.02] ${
        isHero ? "lg:flex gap-8 w-full" : ""
      }`}
    >
      <div className={`p-6 ${isHero ? "lg:w-1/2" : ""}`}>
        {isHero && (
          <>
            <h1 className="text-3xl font-bold mb-2 text-white">{title}</h1>
            <div className="text-2xl font-bold text-purple-400 mb-4">
              ${price}
            </div>
            {description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-white">
                  Description
                </h2>
                <p className="text-gray-400">{description}</p>
              </div>
            )}
          </>
        )}

        <div className={`${isHero ? "" : "mt-4"}`}>
          {!isHero && (
            <>
              <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
              <div className="text-lg font-bold text-purple-400 mb-4">
                ${price}
              </div>
            </>
          )}

          <div className="space-y-2">
            <div className="flex justify-between text-gray-400">
              <span>Daily Income</span>
              <span>{dailyIncome}%</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Fee</span>
              <span>{fee}%</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Days</span>
              <span>{days}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Level</span>
              <span>{level}</span>
            </div>
          </div>

          <Button
            onClick={onClick}
            className="w-full h-10 mt-6 bg-purple-600 hover:bg-purple-700"
          >
            {isHero ? `Buy for $${price}` : "Buy"}
          </Button>
        </div>
      </div>
      <div className={`relative ${isHero ? "lg:w-1/2" : "w-full"}`}>
        <img
          src={`${base_image_url}${image}`}
          alt={title}
          className={`w-full object-fit ${
            isHero ? "h-[400px]" : "h-48"
          }`}
        />
      </div>
    </Card>
  );
};

export default ExploreNFTCard;

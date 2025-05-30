import { getWalletsApi } from "@/api/wallet";
import { useWalletStore, Wallet } from "@/store/walletStore";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

interface ApiResponse {
  data: {
    items: Wallet[]; // Add items array inside data
    // Add other properties if needed
  };
  status: string;
  message: string;
}

export default function useWallet() {
  const {
    data: wallets,
    isLoading,
    refetch,
    isError: onError,
    isSuccess: onSuccess,
  } = useQuery<ApiResponse, Error>(getWalletsApi());
  console.log(wallets);
  const { setAllWallet, wallet } = useWalletStore();
  const handleSetWallet = () => {
    if (onSuccess) {
      setAllWallet(wallets?.data?.items);
    }
  };
  useEffect(() => {
    handleSetWallet();
  }, [wallets]);
  return { wallet };
}

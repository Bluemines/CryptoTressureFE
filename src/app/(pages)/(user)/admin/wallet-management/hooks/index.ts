import { getWalletsApi } from "@/api/wallet";
import { useWalletStore } from "@/store/walletStore";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

export default function useWallet() {
  const {
    data: wallets,
    isLoading,
    refetch,
    isError: onError,
    isSuccess: onSuccess,
  } = useQuery(getWalletsApi());
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

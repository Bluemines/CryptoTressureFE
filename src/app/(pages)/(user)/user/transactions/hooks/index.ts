import { getTransactionsApi } from "@/api/transactions/userTransactions";
import { useTransactionStore } from "@/store/userTransactionStore";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function useUserTransactions() {
  const { transactions, setAllTransactions } = useTransactionStore();
  const {
    data: allTransactions,
    isLoading,
    refetch,
    isError,
    isSuccess: onSuccess,
  } = useQuery(getTransactionsApi());
  const getTransactions = async () => {
    if (onSuccess) {
      if (allTransactions.data) {
        setAllTransactions(allTransactions.data);
      }
    }
    if (isError) {
      toast.error(allTransactions?.message as any);
    }
  };
  useEffect(() => {
    getTransactions();
  }, [allTransactions]);

  return { transactions };
}

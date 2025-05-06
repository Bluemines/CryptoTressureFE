import { getPopularProductsApi } from "@/api/nfts";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function usePopProducts() {
  const {
    data: products,
    isLoading,
    refetch,
    isError: onError,
    isSuccess: onSuccess,
  } = useQuery(getPopularProductsApi());

  return { products };
}

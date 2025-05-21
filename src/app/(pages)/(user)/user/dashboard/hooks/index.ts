import {
  getUserDashboardStatsApi,
  UserDashboardStats,
} from "@/api/userDashboard";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useUserDashboard() {
  const {
    data: stats,
    isLoading,
    refetch,
    isError: onError,
    isSuccess: onSuccess,
  } = useQuery<UserDashboardStats>(getUserDashboardStatsApi());
  const formatCurrency = (value: number | string) => {
  if (typeof value !== "number") return value;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
  return { stats,formatCurrency, isLoading };
}

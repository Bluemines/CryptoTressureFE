import {
  AdminDashboardStats,
  getAdminDashboardStatsApi,
} from "@/api/adminDashboard";
import { getAdminRecentWithdrawlsApi } from "@/api/adminWithDrawls";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useAdminDashboard() {
  const {
    data: stats,
    isLoading,
    refetch,
    isError: onError,
    isSuccess: onSuccess,
  } = useQuery<AdminDashboardStats>(getAdminDashboardStatsApi());
  const {
    data: withDrawls = [],
    isLoading: loading,
    refetch: fetchWithdrawls,
    isError,
    isSuccess,
  } = useQuery<[]>(getAdminRecentWithdrawlsApi());

  return { stats, withDrawls, isLoading };
}

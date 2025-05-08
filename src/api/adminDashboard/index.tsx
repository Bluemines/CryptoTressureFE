import { queryFn } from "@/app/utils/axios";

export interface AdminDashboardStats {
    totalUsers: number;
    verifiedUsers: number;
    suspendedUsers: number;
    activeMachines: number;
    rewardsDistributed: number;
    platformBalance: number;
    totalRevenue: number;
    pendingWithdrawals: number;
  }
  
export const getAdminDashboardStatsApi = () => ({
    queryKey: ["dashboard-admin"],
    queryFn: (): Promise<AdminDashboardStats> => queryFn(`dashboard/stats`),
  });
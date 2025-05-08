import { queryFn } from "@/app/utils/axios";

export interface UserDashboardStats {
  currentBalance: string;
  currentDeposit: number;
  totalReferralBonus: number;
  totalWithdraw: number;
}

export const getUserDashboardStatsApi = () => ({
  queryKey: ["user-admin"],
  queryFn: (): Promise<UserDashboardStats> => queryFn(`dashboard/user_stats`),
});

import { queryFn } from "@/app/utils/axios";

export const getAdminRecentWithdrawlsApi = () => ({
  queryKey: ["dashboard-withDrawls"],
  queryFn: (): Promise<[]> => queryFn(`dashboard/recent-withdrawals`),
});

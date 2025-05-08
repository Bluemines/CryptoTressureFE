import { mutationFn, queryFn } from "@/app/utils/axios";
import { RawRewardItem } from "@/store/rewardsStore";
import { IAddRewardValue } from "./types";

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
interface AllRewardsApiResponse {
    data: {
      items: RawRewardItem[]; // Add items array inside data
      // Add other properties if needed
    };
    status: string;
    message: string; 
  }
export const getAllRewardsApi = () => ({
  queryKey: ["rewards-admin"],
  queryFn: (): Promise<AllRewardsApiResponse> => queryFn(`reward`),
});


export const addRewardApi = {
    mutationFn: (body: IAddRewardValue) => {
        return mutationFn('reward/reward', 'POST', body);
    },
};
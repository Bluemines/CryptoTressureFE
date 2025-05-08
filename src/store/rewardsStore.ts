import { formatDistanceToNow } from "date-fns";
import { create } from "zustand";

interface Product {
  id: number;
  title: string;
}

interface User {
  id: number;
  username: string;
  email: string;
}

export interface RawRewardItem {
  id: number;
  productId: number;
  product: Product;
  reward: string;
  status: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: User;
}

export interface FlatRewardItem {
  id: number;
  productTitle: string;
  reward: string;
  status: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  userEmail: string;
}

interface RewardStore {
  rewards: FlatRewardItem[];
  setAllRewards: (items: RawRewardItem[]) => void;
  addReward: (item: RawRewardItem) => void;
}
const capitalizeStatus = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
export const useRewardStore = create<RewardStore>((set) => ({
  rewards: [],

  setAllRewards: (items) =>
    set(() => ({
      rewards: items.map((i) => ({
        id: i.id,
        productTitle: i.product?.title ?? "Unknown Product",
        reward: i.reward,
        status: capitalizeStatus(i.status),
        date: new Date(i.date).toLocaleDateString(),
        createdAt: formatDistanceToNow(new Date(i.createdAt), {
          addSuffix: true,
        }),
        updatedAt: i.updatedAt,
        userName: i.user?.username ?? "Unknown User",
        userEmail: i.user?.email ?? "N/A",
      })),
    })),

  addReward: (item) =>
    set((state) => ({
      rewards: [
        ...state.rewards,
        {
          id: item.id,
          productTitle: item.product?.title ?? "Unknown Product",
          reward: item.reward,
          status: item.status,
          date: new Date(item.date).toLocaleDateString(),
          createdAt: formatDistanceToNow(new Date(item.createdAt), {
            addSuffix: true,
          }),
          updatedAt: item.updatedAt,
          userName: item.user?.username ?? "Unknown User",
          userEmail: item.user?.email ?? "N/A",
        },
      ],
    })),
}));

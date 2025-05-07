import { create } from "zustand";
import { formatDistanceToNow } from "date-fns";

interface SingleUser {
  id: number;
  username: string;
  email: string;
  phone: string;
  status: string;
  role: string;
  level: number;
  referralCode: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  balance: string;
}

export interface RawSingleUser {
  id: number;
  username: string;
  email: string;
  phone: string;
  status: string;
  role: string;
  level: number;
  referralCode: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  referralsReceived: any[];
  wallet: {
    balance: string;
  };
}

interface SingleUserStore {
  user: SingleUser | null;
  setUser: (user: RawSingleUser) => void;
  clearUser: () => void;
}


const capitalizeStatus = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

export const useSingleUserStore = create<SingleUserStore>((set) => ({
  user: null,

  setUser: (user) =>
    set(() => ({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        status: capitalizeStatus(user.status),
        role: user.role,
        level: user.level,
        referralCode: user.referralCode,
        emailVerified: user.emailVerified,
        createdAt: formatDistanceToNow(new Date(user.createdAt), {
          addSuffix: true,
        }),
        updatedAt: user.updatedAt,
        balance: user.wallet?.balance ?? "0",
      },
    })),

  clearUser: () => set(() => ({ user: null })),
}));

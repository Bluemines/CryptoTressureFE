import { create } from "zustand";

interface FlatWallet {
  id: number;
  balance: string;
  reserved: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  username: string;
}

interface WalletStore {
  wallet: FlatWallet[];
  setAllWallet: (wallets: Wallet[]) => void;
  addWallet: (wallet: Wallet) => void;
  deleteWalletById: (id: number) => void;
}

// The original nested wallet from API
interface Wallet {
  id: number;
  balance: string;
  reserved: string;
  createdAt: string;
  updatedAt: string;
  user: {
    email: string;
    username: string;
  };
}

export const useWalletStore = create<WalletStore>((set) => ({
  wallet: [],

  setAllWallet: (wallets) =>
    set(() => ({
      wallet: wallets.map((w) => ({
        id: w.id,
        balance: w.balance,
        reserved: w.reserved,
        createdAt: w.createdAt,
        updatedAt: w.updatedAt,
        email: w.user.email,
        username: w.user.username,
      })),
    })),

  addWallet: (wallet) =>
    set((state) => ({
      wallet: [
        ...state.wallet,
        {
          id: wallet.id,
          balance: wallet.balance,
          reserved: wallet.reserved,
          createdAt: wallet.createdAt,
          updatedAt: wallet.updatedAt,
          email: wallet.user.email,
          username: wallet.user.username,
        },
      ],
    })),

  deleteWalletById: (id) =>
    set((state) => ({
      wallet: state.wallet.filter((wallet) => wallet.id !== id),
    })),
}));

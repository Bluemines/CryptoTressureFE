import { create } from "zustand";

export interface Transaction {
  id: number;
  transactiontype: "DEPOSIT" | "WITHDRAWAL" | "REWARD" | "REFERRAL";
  amount: number;
  date: string;
  status: "SUCCESS" | "PENDING" | "FAILED" | string; // note: expanded to string for formatting
  userId: number;
}

export interface TransactionApiResponse {
  statusCode: number;
  data: Transaction[];
  message: string;
  success: boolean;
}

interface TransactionStore {
  transactions: Transaction[];
  setAllTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
}

const capitalizeStatus = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],

  setAllTransactions: (transactions) =>
    set(() => ({
      transactions: transactions.map((txn) => ({
        ...txn,
        date: new Date(txn.date).toLocaleString(),
        status: capitalizeStatus(txn.status),
      })),
    })),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        {
          ...transaction,
          date: new Date(transaction.date).toLocaleString(),
          status: capitalizeStatus(transaction.status),
        },
        ...state.transactions,
      ],
    })),
}));

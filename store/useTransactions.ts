import { create } from "zustand";

import {
  TRANSACTIONS as Transaction,
  TRANSACTIONS,
} from "@/constant/transaction";

type TransactionsState = {
  transactions: Transaction[];
  setTransactions: (transaction: Transaction[]) => void;
};

export const useTransactions = create<TransactionsState>((set) => ({
  transactions: TRANSACTIONS,
  setTransactions: (transactions) => set({ transactions }),
}));

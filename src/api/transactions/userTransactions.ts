import { queryFn } from "@/app/utils/axios";
import { TransactionApiResponse } from "@/store/userTransactionStore";

export const getTransactionsApi = () => ({
  queryKey: ["transactions"],
  queryFn: () =>
    queryFn(`transactions/user`) as Promise<TransactionApiResponse>,
});

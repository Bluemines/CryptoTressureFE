import { queryFn } from "@/app/utils/axios";

export const getWalletsApi = () => ({
    queryKey: ['wallets'],
    queryFn: () => queryFn(`wallet`),
});
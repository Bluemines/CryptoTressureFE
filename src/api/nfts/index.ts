import { queryFn } from "@/app/utils/axios";

export const getPopularProductsApi = () => ({
    queryKey: ['productsPopular'],
    queryFn: () => queryFn(`products/popular`),
});
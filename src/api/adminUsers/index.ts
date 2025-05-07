import { mutationFn, queryFn } from "@/app/utils/axios";
import { RawSingleUser } from "@/store/singleUserStore";
import { RawUser } from "@/store/userStore";

interface AllUserApiResponse {
  data: {
    items: RawUser[]; // Add items array inside data
    // Add other properties if needed
  };
  status: string;
  message: string;
}
export const getAllAdminUsersApi = () => ({
  queryKey: ["user-admins"],
  queryFn: () => queryFn(`user/all`) as Promise<AllUserApiResponse>,
});
interface ApiResponse {
  data: RawSingleUser;
  status: string;
  message: string;
}
export const getSignleAdminUserApi = (id: number) => ({
  queryKey: [`user-${id}`],
  queryFn: () => queryFn(`user/${id}`) as Promise<ApiResponse>,
});
export const suspendUserApi = {
  mutationFn: (id: number) => {
    return mutationFn(`user/suspend/${id}`, "POST");
  },
};

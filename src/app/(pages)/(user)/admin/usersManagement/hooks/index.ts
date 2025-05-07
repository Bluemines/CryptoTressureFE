import { getAllAdminUsersApi, getSignleAdminUserApi } from "@/api/adminUsers";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function useUserManagement() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log("iddd: ", id);
  const {
    data: allUsers,
    isLoading,
    refetch,
    isError: onError,
    isSuccess: onSuccess,
  } = useQuery(getAllAdminUsersApi());
 

  const { users, setAllUsers } = useUserStore();
  useEffect(() => {
    if (allUsers) {
      setAllUsers(allUsers?.data?.items);
    }
  }, [allUsers]);

  return { users };
}

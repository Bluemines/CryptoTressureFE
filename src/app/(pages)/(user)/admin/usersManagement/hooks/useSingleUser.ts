import { getSignleAdminUserApi, suspendUserApi } from "@/api/adminUsers";
import { RawSingleUser, useSingleUserStore } from "@/store/singleUserStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { error } from "console";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
interface ApiResponse {
  data: RawSingleUser;
}
export default function useSingleUser() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log("iddd: ", id);
  const {
    data: singleUser,
    isLoading: loading,
    refetch: refetchUser,
    isError,
    isSuccess,
    error,
  } = useQuery<ApiResponse, Error>(getSignleAdminUserApi(Number(id)));
  const { user, setUser } = useSingleUserStore();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (singleUser) {
      setUser(singleUser.data);
    }
    if (isError) {
      setShowToast(true);
      setMessage(error.message);
    }
  }, [singleUser]);
  const { mutateAsync: suspend } = useMutation({
    mutationFn: suspendUserApi.mutationFn,
  });
  const suspendUser = async (id: number) => {
    setMessage(""); 
    try {
      const response = await suspend(id); 
      if (response.success === true) {
        setShowToast(true);
        setMessage(response.message); 
        window.location.reload();
      } else {
        setShowToast(true);
        setMessage(response.message); 
      }
    } catch (error: any) {

      if (axios.isAxiosError(error)) {

        if (error.response) {
          setShowToast(true);
          setMessage(
            error.response.data.message ||
              "An error occurred while suspending the user."
          ); 
        } else {
          setShowToast(true);
          setMessage("Network error. Please check your connection.");
        }
      } else {
        setShowToast(true);
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return { user, suspendUser, showToast, setShowToast, message };
}

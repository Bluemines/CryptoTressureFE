"use client";

import { useGetCurrentUser } from "@/api/auth/useAuth";
import { authStore } from "@/store/authStore";
import { useEffect } from "react";

const CurrentUserFetcher = () => {
  const { data: userData, isSuccess } = useGetCurrentUser();
  const { setUser } = authStore();

  useEffect(() => {
    if (isSuccess && userData) {
      setUser(userData);
    }
  }, [isSuccess, userData, setUser]);

  return null;
};

export default CurrentUserFetcher;
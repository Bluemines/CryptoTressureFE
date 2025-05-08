import { AdminDashboardStats } from "@/api/adminDashboard";
import { addRewardApi, getAllRewardsApi } from "@/api/adminRewards";
import { useRewardStore } from "@/store/rewardsStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAddRewardFormValue } from "../types";
import { addRewardSchema } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useRewards() {
  const {
    data: allrewards,
    isLoading,
    refetch,
    isError: onError,
    isSuccess: onSuccess,
  } = useQuery(getAllRewardsApi());
  const { rewards, setAllRewards } = useRewardStore();
  console.log("all rewards: ", allrewards);
  useEffect(() => {
    if (allrewards) {
      setAllRewards(allrewards.data.items);
    }
  }, [allrewards]);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<IAddRewardFormValue>({
    resolver: yupResolver(addRewardSchema),
    defaultValues: {
      id: 0,
      product: 0,
      reward: 0,
    },
  });

  const {
    mutateAsync: addReward,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: addRewardApi.mutationFn,
  });
  const handleAddReward: SubmitHandler<IAddRewardFormValue> = async (data) => {
    try {
      const response = await addReward(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return { rewards, handleAddReward, handleSubmit, control, errors };
}

import { AdminDashboardStats } from "@/api/adminDashboard";
import { addRewardApi, getAllRewardsApi } from "@/api/adminRewards";
import { useRewardStore } from "@/store/rewardsStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAddRewardFormValue } from "../types";
import { addRewardSchema } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectChangeEvent } from "@mui/material";
import useUserManagement from "../../usersManagement/hooks";
import { useGetProducts } from "@/api/admin/useAdmin";
import toast from "react-hot-toast";

type Product = {
  id: number;
  title: string;
};
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

  const [form, setForm] = useState({
    user: "", // store only user id
    selectMachine: "", // store only machine id
    rewardAmount: 0,
  });

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const { users } = useUserManagement();
  const { data } = useGetProducts();
  const items: Product[] = data?.items ?? [];
  const selectedUser = users.find((u: any) => u.id === form.user);
  const selectedMachine = items.find((m: any) => m.id === form.selectMachine);
  useEffect(() => {
    setValue("id", Number(selectedUser?.id));
    setValue("product", Number(selectedMachine?.id));
  }, [selectedMachine, selectedUser]);
  const {
    mutateAsync: addReward,
    isSuccess,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: addRewardApi.mutationFn,
  });
  const handleAddReward: SubmitHandler<IAddRewardFormValue> = async (data) => {
    try {
      await addReward(data, {
        onSuccess: () => {
          toast.success("Reward Added Successfully");
          refetch();
          reset();
        },
        onError: (error: any) => toast.error("Error adding reward: ", error),
      });
    } catch (error: any) {
      toast.error(error);
    }
  };

  return {
    rewards,
    handleAddReward,
    handleSubmit,
    control,
    errors,
    form,
    handleSelectChange,
    isValid,
    isPending,
  };
}

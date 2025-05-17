// hooks/useLevels.ts
import { addLevelApi, getAllLevelsApi } from "@/api/levels";
import { useLevelStore } from "@/store/levelsStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAddLevelFormValue } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { addLevelSchema } from "../schema";
import toast from "react-hot-toast";

export default function useLevels() {
  const setAllLevels = useLevelStore((state) => state.setAllLevels);

  const { data, isLoading, refetch, isError, isSuccess } = useQuery(
    getAllLevelsApi()
  );
  console.log("query status", isLoading, isSuccess, isError);

  console.log(data);
  useEffect(() => {
    if (isSuccess) {
      setAllLevels(data);
    }
  }, [data]);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<IAddLevelFormValue>({
    resolver: yupResolver(addLevelSchema),
  });

  const {
    mutateAsync: addlevel,
    isSuccess: onSuccess,
    isError: onError,
    error,
    isPending,
  } = useMutation({
    mutationFn: addLevelApi.mutationFn,
  });
  const handleAddLevel: SubmitHandler<IAddLevelFormValue> = async (data) => {
    try {
      const response = await addlevel(data);
      if (response.success === true) {
        await refetch();
        toast("Level Added Successfully");
      } else {
        toast("Error adding level: ", response.message);
      }
    } catch (error: any) {
      console.log(error);
      toast(error.response.data.message);
    }
  };
  return {
    levels: useLevelStore((state) => state.levels),
    isLoading,
    isError,
    isSuccess,
    refetch,
    control,
    errors,
    handleSubmit,
    isValid,
    handleAddLevel,
    isPending,
  };
}

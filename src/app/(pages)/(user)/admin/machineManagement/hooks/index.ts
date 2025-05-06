import React, { useEffect, useState } from "react";
import { FormSubmitHandler, useForm } from "react-hook-form";
import { AddMachineFormType } from "../types";
import { addMachineSchema } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addMachineApi, getMachinesApi } from "@/api/machineManagement";
import { useMachineStore } from "@/store/machinesStore";

export default function useMachineManagement() {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<AddMachineFormType>({
    resolver: yupResolver(addMachineSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      dailyIncome: "",
      fee: "",
      rentalDays: 0,
    },
  });
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("image", file);
    }
  };
  const {
    mutateAsync: addMachine,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: addMachineApi.mutationFn,
  });
  const [message, setMessage] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const handleAddMachine: FormSubmitHandler<AddMachineFormType> = async (
    data
  ) => {
    if (!selectedImage) {
      setOpenToast(true);
      setMessage("Please uplaod an Image");
      return;
    }
    try {
      setMessage("");
      const { title, description, price, dailyIncome, fee, rentalDays } =
        data as any;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("dailyIncome", dailyIncome);
      formData.append("fee", fee);
      formData.append("rentalDays", rentalDays);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await addMachine({ body: formData });
      console.log(response);
      if (response.success === true) {
        setOpenToast(true);
        setMessage("Product Added Successfully");
      }
      if (response.success === false) {
        setOpenToast(true);
        setMessage(response.success);
      }
    } catch (err: any) {
      setOpenToast(true);
      setOpenToast(true);
      setMessage(err.message);
    }
  };
  const { machines, setMachines } = useMachineStore();
  const {
    data: allMacchines,
    isLoading,
    refetch,
    isError: onError,
    isSuccess: onSuccess,
  } = useQuery(getMachinesApi());
  const getMachines = () => {
    if (onSuccess) {
      setMachines(allMacchines?.data?.items);
    }
    if (isError) {
      setOpenToast(true);
      setMessage(error.message);
    }
  };
  useEffect(() => {
    if (allMacchines && machines.length !== 1) {
      getMachines();
    }
  }, [allMacchines]);
  

  const selectedImage = watch("image");
  return {
    control,
    errors,
    handleSubmit,
    selectedImage,
    handleImageSelect,
    handleAddMachine,
    isValid,
    message,
    setOpenToast,
    openToast,
    machines,
  };
}

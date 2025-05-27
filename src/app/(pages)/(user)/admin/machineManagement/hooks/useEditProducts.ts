import React, { useEffect, useState } from "react";
import useMachineManagement from ".";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editMachineApi, getMachinesById } from "@/api/machineManagement";
import { FormSubmitHandler, SubmitHandler, useForm } from "react-hook-form";
import { AddMachineFormType } from "../types";
import { addMachineSchema } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";

interface ProductData {
  title: string;
  description: string;
  dailyIncome: string;
  price: string;
  level: string;
  rentalDays: number;
  image: File;
}

interface ProductResponse {
  data: ProductData;
}

export default function useEditProducts() {
  const id = localStorage.getItem("id");
  console.log("current id: ", id);
  const {
    data: product,
    isLoading,
    refetch,
    isError: onError,
    isSuccess: onSuccess,
  } = useQuery<ProductResponse>(getMachinesById(String(id)) as any);
  useEffect(() => {
    reset();
    if (product) {
      reset({
        title: product?.data?.title,
        description: product?.data?.description,
        dailyIncome: product?.data?.dailyIncome,
        price: product?.data?.price,
        level: product?.data?.level,
        rentalDays: product?.data?.rentalDays,
        image: product?.data?.image,
      });
    }
  }, [product]);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<AddMachineFormType>({
    resolver: yupResolver(addMachineSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      dailyIncome: "",
      level: "",
      rentalDays: 0,
    },
  });

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("image", file);
    }
  };
  const selectedImage = watch("image");
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("");
  const {
    mutateAsync: editMachine,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: editMachineApi.mutationFn,
  });
  const handleEditMachine: SubmitHandler<AddMachineFormType> = async (data) => {
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

      const response = await editMachine({ body: formData, id: String(id) });
      console.log(response);
      if (response.success === true) {
        setOpenToast(true);
        setMessage("Product Edited Successfully");
        window.location.reload();
      }
      if (response.success === false) {
        setOpenToast(true);
        setMessage(response.success);
      }
    } catch (err: any) {
      setOpenToast(true);
      setMessage(err.message);
    }
  };

  return {
    product,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    errors,
    selectedImage,
    handleImageSelect,
    handleEditMachine,
    isValid,
    openToast,
    message,
    setOpenToast,
  };
}

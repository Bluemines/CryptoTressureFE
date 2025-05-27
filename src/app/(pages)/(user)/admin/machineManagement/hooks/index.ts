import React, { useEffect, useState } from "react";
import { FormSubmitHandler, SubmitHandler, useForm } from "react-hook-form";
import { AddMachineFormType } from "../types";
import { addMachineSchema } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addMachineApi,
  DeleteMachineByID,
  getMachinesApi,
} from "@/api/machineManagement";
import { useMachineStore } from "@/store/machinesStore";

export interface Machine {
  id: number;
  title: string;
  description: string;
  price: string;
  dailyIncome: string;
  level: string;
  rentalDays: number;
  roiPercent: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: number;
}

export default function useMachineManagement() {
  const { machines, setAllMachines, deleteMachineById } = useMachineStore();
  const {
    data: allMacchines,
    isLoading,
    refetch,
    isError: onError,
    isSuccess: onSuccess,
  } = useQuery(getMachinesApi());
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
      rentalDays: 0,
      level:""
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
    isPending,
  } = useMutation({
    mutationFn: addMachineApi.mutationFn,
  });
  const [message, setMessage] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const handleAddMachine: SubmitHandler<AddMachineFormType> = async (data) => {
    console.log("data:", data);
    if (!selectedImage) {
      setOpenToast(true);
      setMessage("Please uplaod an Image");
      return;
    }
    try {
      setMessage("");
      const { title, description, price, dailyIncome, fee, rentalDays, level } =
        data as any;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("dailyIncome", dailyIncome);
      formData.append("fee", fee);
      formData.append("rentalDays", rentalDays);
      formData.append("level", level);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await addMachine({ body: formData });
      console.log(response);
      if (response.success === true) {
        await refetch();
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
  const allValues = watch();
  console.log("all values: ", allValues);
  const getMachines = () => {
    if (onSuccess) {
      if (allMacchines?.data?.items) {
        setAllMachines(allMacchines.data.items);
      }
    }
    if (isError) {
      setOpenToast(true);
      setMessage(error.message);
    }
  };
  useEffect(() => {
    if (allMacchines) {
      getMachines();
    }
  }, [allMacchines]);
  const { mutateAsync: deleteMachine, isPending: pending } = useMutation({
    mutationFn: DeleteMachineByID.mutationFn,
  });
  const handleDeleteMachine = async (id: string) => {
    setMessage("");
    try {
      const response = await deleteMachine(id);
      if (response.success === true) {
        setOpenToast(true);
        setMessage(response.message);
      } else {
        setOpenToast(true);
        setMessage(response.message);
      }
      deleteMachineById(Number(id));
      console.log("delete: ", response);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const getMachineById = (id: string) => {
    return machines.find((machine) => machine.id === Number(id)) || null;
  };
  const [currentMachineId, setCurrentMachineId] = useState("");
  const [currentMachine, setCurrentMachine] = useState<Machine | undefined>();
  const handelSetEditValues = (id: string) => {
    localStorage.removeItem("id");
    const machine = getMachineById(id);

    localStorage.setItem("id", String(machine?.id));
  };

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
    handleDeleteMachine,
    handelSetEditValues,
    currentMachineId,
    reset,
    currentMachine,
    isPending,
    pending,
  };
}

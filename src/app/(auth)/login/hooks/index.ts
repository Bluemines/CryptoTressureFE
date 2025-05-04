"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schema";
import { IAddLoginFormValues } from "../types";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api/authentication";
import { useState } from "react";
import { AxiosError } from "axios";

export default function useLogin() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  console.log(message)
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutateAsync: loginUser } = useMutation({
    mutationFn: loginApi.mutationFn,
  });
  const handleLogin: SubmitHandler<IAddLoginFormValues> = async (data) => {
    try {
      const response = await loginUser(data);
      if (response.success === true) {
        
        setMessage(response.message);
        setOpen(true);
      } else {
        setMessage(response.message);
      }
    } 
    catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      if (err?.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong.");
      }
    }
  };
  return { control, handleSubmit, errors, handleLogin, open, setOpen, message };
}

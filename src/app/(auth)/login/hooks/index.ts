"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schema";
import { IAddLoginFormValues } from "../types";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api/authentication";

export default function useLogin() {
  const {
    control,
    handleSubmit,
    reset,
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return { control, handleSubmit, errors, handleLogin };
}

"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPasswordSchema, loginSchema, resetPasswordSchema } from "../schema";
import { IAddLoginFormValues, IForgetPassword } from "../types";
import { useMutation } from "@tanstack/react-query";
import { ForgetPasswordApi, loginApi, resetPasswordApi } from "@/api/authentication";
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

export function useForgetPassword() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  console.log(message)
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const { mutateAsync: forgetPassword, error, isSuccess: forgetSuccess } = useMutation({
    mutationFn: ForgetPasswordApi.mutationFn,
  });
  const handleForgetPassword: SubmitHandler<IForgetPassword> = async (data) => {
    try {
      const response = await forgetPassword(data);
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
  return { control, handleSubmit, errors, handleForgetPassword, open, setOpen, message, forgetSuccess };
}

export function useResetPassword() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  console.log(message)
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      code: '',
      newPassword: '',
      confirmPassword: ''
    },
  });
  const { mutateAsync: resetPassword, error, isSuccess: resetSuccess } = useMutation({
    mutationFn: resetPasswordApi.mutationFn,
  });
  const handleResetPassword: SubmitHandler<IForgetPassword> = async (data) => {
    try {
      const response = await resetPassword(data);
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
  return { control, handleSubmit, errors, handleResetPassword, open, setOpen, message, resetSuccess };
}

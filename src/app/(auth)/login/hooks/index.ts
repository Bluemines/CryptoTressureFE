"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";

import {
  forgetPasswordSchema,
  loginSchema,
  resetPasswordSchema,
} from "../schema";
import { IAddLoginFormValues, IForgetPassword } from "../types";
import { useMutation } from "@tanstack/react-query";
import {
  ForgetPasswordApi,
  loginApi,
  resetPasswordApi,
} from "@/api/authentication";
import { useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import auth from "@/app/utils/auth";
// import { authStore } from "@/store/authStore"

const roles = {
  ADMIN: "/admin/dashboard",
  USER: "/user/dashboard",
};

export default function useLogin() {
  // const { setPoints } = authStore()

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutateAsync: loginUser, isPending } = useMutation({
    mutationFn: loginApi.mutationFn,
    onSuccess: (data) => {
      const points = data?.data?.points;
      localStorage.setItem("points", points);
      auth.setToken(data.data.access_token);
      const role = data.data.role;
      auth.setRole(role);
      const redirectPath = roles[role as keyof typeof roles] || "/";
      router.push(redirectPath);
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });
  const handleLogin: SubmitHandler<IAddLoginFormValues> = async (data) => {
    try {
      const response = await loginUser(data);
      if (response.success === true) {
        toast.success(response.message)
        setMessage(response.message);
        setOpen(true);
      } else {
        toast.error(response.message)
        setMessage(response.message);
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message)
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong.");
        toast.error("Something went wrong.");
      }
    }
  };
  return {
    control,
    handleSubmit,
    errors,
    handleLogin,
    open,
    setOpen,
    message,
    isPending,
  };
}

export function useForgetPassword() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const {
    mutateAsync: forgetPassword,
    error,
    isSuccess: forgetSuccess,
  } = useMutation({
    mutationFn: ForgetPasswordApi.mutationFn,
    onSuccess: () => {
      toast.success("Otp Sent to Email!");
      localStorage.setItem("forgetPassEmail", watch("email"));
    },
    // onError:(error:any)=>{
    //   toast.error(error)
    // }
  });
  const handleForgetPassword: SubmitHandler<IForgetPassword> = async (data) => {
    try {
      const response = await forgetPassword(data);
      if (response.success === true) {
        setMessage(response.message);
        setOpen(true);
      } else {
        toast.error(response.message);
        setMessage(response.message);
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      if (err?.response?.statusText) {
        toast.error(err?.response?.statusText);
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong.");
        toast.error("Something went wrong.");
      }
    }
  };
  return {
    control,
    handleSubmit,
    errors,
    handleForgetPassword,
    open,
    setOpen,
    message,
    forgetSuccess,
    watch,
  };
}

export function useResetPassword(emailFromForget: string) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      email: localStorage.getItem("forgetPassEmail") || "",
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    mutateAsync: resetPassword,
    error,
    isSuccess: resetSuccess,
  } = useMutation({
    mutationFn: resetPasswordApi.mutationFn,
    onSuccess: () => {
      toast.success("Reset Successfull!");
    },
    onError: (error) => console.log(error),
  });
  const handleResetPassword: SubmitHandler<IForgetPassword> = async (data) => {
    try {
      const response = await resetPassword({ ...data, email: emailFromForget });
      if (response.success === true) {
        setMessage(response.message);
        setOpen(true);
      } else {
        setMessage(response.message);
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      if (err?.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong.");
      }
    }
  };
  return {
    control,
    handleSubmit,
    errors,
    handleResetPassword,
    open,
    setOpen,
    message,
    resetSuccess,
    watch,
  };
}

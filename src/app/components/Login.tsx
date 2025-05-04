"use client";

import { Button, Checkbox, Input } from "@mui/material";
import { Divider } from "antd";
import Link from "next/link";
import { useState } from "react";
import Modal from "./modals/Modal";
import FormInput from "./ui/Inputs/FormInput";
import { useForm } from "react-hook-form";
import useLogin from "../(auth)/login/hooks";

const Login = () => {
  const [IsForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState<boolean>(false);
  const { control, handleSubmit, errors, handleLogin } = useLogin();
  return (
    <div className="w-full max-w-md">
      <div className="text-[#737373] font-medium text-2xl">LOGO</div>
      <div className="text-3xl mt-4">Welcome to NFT!</div>
      <div className="text-[#c0c0c0] text-sm mt-2">
        Please sign in to your account and start the adventure
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <FormInput
            name="email"
            control={control}
            label="Email or Username"
            errors={errors}
            rules={{ required: "Email is required" }}
          />
          <FormInput
            name="password"
            control={control}
            label="Password"
            type="password"
            errors={errors}
            rules={{ required: "Password is required" }}
          />
          <Button
            variant="text"
            className="block text-[#7367F0]"
            onClick={() => setIsForgotPasswordModalOpen(true)}
          >
            Forgot Password?
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox className="!p-0" />{" "}
          <span className="text-muted">Remember Me</span>
        </div>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit(handleLogin)}
        >
          Sign in
        </Button>

        <div className="text-sm text-center block mt-2">
          New on our platform?{" "}
          <Link className="text-primary" href="/register">
            Create an account
          </Link>
        </div>

        <Divider>Or</Divider>

        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-[38px] w-[38px] bg-[#1d2b48] grid place-items-center rounded">
            <img src="/icons/fb.png" alt="" />
          </div>
          <div className="h-[38px] w-[38px] bg-[#0d3148] grid place-items-center rounded">
            <img src="/icons/twitter.png" alt="" />
          </div>
          <div className="h-[38px] w-[38px] bg-[#3f1917] grid place-items-center rounded">
            <img src="/icons/google.png" alt="" />
          </div>
        </div>
      </div>
      <Modal
        open={IsForgotPasswordModalOpen}
        setOpen={setIsForgotPasswordModalOpen}
      ></Modal>
    </div>
  );
};

export default Login;

"use client"

import { Button, Checkbox, Snackbar } from "@mui/material"
import { Divider } from "antd"
import Link from "next/link"
import { useEffect, useState } from "react"
import Modal from "./modals/Modal"
import FormInput from "./ui/Inputs/FormInput"
import useLogin, {
  useForgetPassword,
  useResetPassword,
} from "../(auth)/login/hooks"
import React from "react"
import { Controller } from "react-hook-form"
import OTP from "antd/es/input/OTP"
import { useForgetPasswordd } from "../(auth)/login/api/useAuth"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

const Login = () => {
  const [IsForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState<boolean>(false)
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState<boolean>(false)
  const [is2FAModalOpen, setIs2FAModalOpen] = useState<boolean>(false)
  const {
    control,
    handleSubmit,
    errors,
    handleLogin,
    open,
    setOpen,
    message,
    isPending,
  } = useLogin()
  const {
    control: forgetPassControl,
    handleSubmit: handleForgetPass,
    errors: forgetPassErrors,
    handleForgetPassword,
    forgetSuccess,
    watch: emailWatch,
  } = useForgetPassword()
  const {
    control: resetPassControl,
    errors: resetPassErrors,
    watch,
  } = useResetPassword(emailWatch("email"))

  const { mutate: fgp } = useForgetPasswordd()
  const onSubmit = () => {
    fgp(
      {
        email: watch("email"),
        code: watch("code"),
        newPassword: watch("newPassword"),
        confirmPassword: watch("confirmPassword"),
      },
      {
        onSuccess: () => {
          toast.success("Password reset Successfull")
          setIsForgotPasswordModalOpen(false)
          setIsResetPasswordModalOpen(false)
          setIs2FAModalOpen(false)
        },
        onError: (error) => {
          const err = error as AxiosError<{ message: string }>
          toast.error(err.response?.data?.message || "Something went wrong")
        },
      }
    )
  }

  const handleCloseAllModals = () => {
    setIsForgotPasswordModalOpen(false)
    setIsResetPasswordModalOpen(false)
    setIs2FAModalOpen(false)
  }


  useEffect(() => {
    if (forgetSuccess) {
      setIsForgotPasswordModalOpen(false)
      setIs2FAModalOpen(true)
    }
  }, [forgetSuccess])

  return (
    <div className='w-full max-w-md'>
      <div className='h-16 text-white font-bold '>
          <img src='/logo.jpg' alt="logo" className="w-16 h-16" />
        </div>
      <div className='text-3xl mt-4'>Welcome to Bluemines</div>
      <div className='text-[#c0c0c0] text-sm mt-2'>
        Please sign in to your account and start the adventure
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className='space-y-4'>
        <div className='space-y-1'>
          <FormInput
            name='email'
            control={control}
            label='Email or Username'
            errors={errors}
            rules={{ required: "Email is required" }}
          />
          <FormInput
            name='password'
            control={control}
            label='Password'
            type='password'
            errors={errors}
            rules={{ required: "Password is required" }}
          />
          <Button
            variant='text'
            className='block text-[#7367F0]'
            onClick={() => setIsForgotPasswordModalOpen(true)}
          >
            Forgot Password?
          </Button>
        </div>

        {/* <div className='flex items-center gap-2'>
          <Checkbox className='!p-0' />{" "}
          <span className='text-muted'>Remember Me</span>
        </div> */}

        <Button
          variant='contained'
          fullWidth
          type="submit"
          // onClick={handleSubmit(handleLogin)}
          disabled={isPending}
        >
          Sign in
        </Button>
        

        <div className='text-sm text-center block mt-2'>
          New on our platform?{" "}
          <Link className='text-primary' href='/register'>
            Create an account
          </Link>
        </div>


      </form>
      {/* forget pass modal */}
      <Modal
        open={IsForgotPasswordModalOpen}
        setOpen={setIsForgotPasswordModalOpen}
      >
        <div className='space-y-4'>
          <div className='text-[#737373] text-2xl text-center'>LOGO</div>
          <div className='font-medium text-xl'>Forgot Password? 🔒</div>
          <div className='text-[#737373] text-sm'>
            Enter your email, and we'll send you OTP to reset your password
          </div>
          <FormInput
            name='email'
            control={forgetPassControl}
            label='Email'
            errors={forgetPassErrors}
          />
          <Button
            variant='contained'
            fullWidth
            onClick={handleForgetPass(handleForgetPassword)}
          >
            Send Reset Link
          </Button>
          <Button variant='text' fullWidth onClick={handleCloseAllModals}>
            Back to log in
          </Button>
        </div>
      </Modal>
      {/* tfv modal */}
      <Modal open={is2FAModalOpen} setOpen={setIs2FAModalOpen}>
        <div className='space-y-4'>
          <div className='text-[#737373] text-2xl text-center'>LOGO</div>
          <div className='font-medium text-xl'>Two-Step Verification 💬</div>
          <div className='text-[#737373] text-sm'>
            We sent a verification code to your Email. Enter the code from the
            eamil in the field below.
            <div>{emailWatch("email")}</div>
          </div>

          <div className='w-full'>
            <Controller
              name='code'
              control={resetPassControl}
              rules={{ required: "OTP is required" }}
              render={({ field }) => (
                <OTP
                  style={{ width: "100%", justifyContent: "center" }}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <Button
            variant='contained'
            fullWidth
            onClick={() => {
              if (watch("code").length >= 6) {
                setIsResetPasswordModalOpen(true)
              }
            }}
          >
            Verify my account
          </Button>
          <div className='flex gap-2 items-center justify-center'>
            <div>Didn't get the code?</div>
            <div className='text-primary'>Resend</div>
          </div>
        </div>
      </Modal>
      {/* reset password */}
      <Modal
        open={isResetPasswordModalOpen}
        setOpen={setIsResetPasswordModalOpen}
      >
        <div className='space-y-4'>
          <div className='text-[#737373] text-2xl text-center'>LOGO</div>
          <div className='font-medium text-xl'>Reset Password 🔒</div>
          <div className='text-[#737373] text-sm'>{emailWatch("email")}</div>
          <FormInput
            name='newPassword'
            control={resetPassControl}
            label='New Password'
            errors={resetPassErrors}
          />
          <FormInput
            name='confirmPassword'
            control={resetPassControl}
            label='Confirm Password'
            errors={resetPassErrors}
          />

          <Button variant='contained' fullWidth onClick={onSubmit}>
            Set New Password
          </Button>
          <Button variant='text' fullWidth onClick={handleCloseAllModals}>
            Back to log in
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Login

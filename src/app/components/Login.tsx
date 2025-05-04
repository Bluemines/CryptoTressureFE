"use client"

import { Button, Checkbox, Snackbar, TextField } from "@mui/material"
import { Divider } from "antd"
import Link from "next/link"
import { useEffect, useState } from "react"
import Modal from "./modals/Modal"
import FormInput from "./ui/Inputs/FormInput"
import useLogin, {
  useForgetPassword,
  useResetPassword,
} from "../(auth)/login/hooks"
import OTP from "antd/es/input/OTP"
import React from "react"
import { Controller } from "react-hook-form"

const Login = () => {
  const [IsForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState<boolean>(false)
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState<boolean>(false)
  const [is2FAModalOpen, setIs2FAModalOpen] = useState<boolean>(false)

  const [otpValue, setOtpValue] = useState("")

  const { control, handleSubmit, errors, handleLogin, open, setOpen, message } =
    useLogin()
  const {
    control: forgetPassControl,
    handleSubmit: handleForgetPass,
    errors: forgetPassErrors,
    handleForgetPassword,
    message: forgetPassMessage,
    forgetSuccess,
  } = useForgetPassword()
  const {
    control: resetPassControl,
    handleSubmit: handleResetPassSubmit,
    errors: resetPassErrors,
    handleResetPassword,
    message: resetPassMessage,
    resetSuccess,
  } = useResetPassword()

  useEffect(() => {
    if (forgetSuccess) {
      setIsForgotPasswordModalOpen(false)
      setIs2FAModalOpen(true)
    }
  }, [forgetSuccess])

  const [resetPassForm, setResetPassForm] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const handlePassChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const [form, setForm] = useState({
    email: "",
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  return (
    <div className='w-full max-w-md'>
      <div className='text-[#737373] font-medium text-2xl'>LOGO</div>
      <div className='text-3xl mt-4'>Welcome to NFT!</div>
      <div className='text-[#c0c0c0] text-sm mt-2'>
        <Snackbar
          // anchorOrigin={{ vertical, horizontal }}
          // key={vertical + horizontal}
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={2000}
          message={message}
        />
        Please sign in to your account and start the adventure
      </div>

      <div className='space-y-4'>
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

        <div className='flex items-center gap-2'>
          <Checkbox className='!p-0' />{" "}
          <span className='text-muted'>Remember Me</span>
        </div>

        <Button
          variant='contained'
          fullWidth
          onClick={handleSubmit(handleLogin)}
        >
          Sign in
        </Button>

        <div className='text-sm text-center block mt-2'>
          New on our platform?{" "}
          <Link className='text-primary' href='/register'>
            Create an account
          </Link>
        </div>

        <Divider>Or</Divider>

        <div className='flex items-center justify-center gap-2 mt-4'>
          <div className='h-[38px] w-[38px] bg-[#1d2b48] grid place-items-center rounded'>
            <img src='/icons/fb.png' alt='' />
          </div>
          <div className='h-[38px] w-[38px] bg-[#0d3148] grid place-items-center rounded'>
            <img src='/icons/twitter.png' alt='' />
          </div>
          <div className='h-[38px] w-[38px] bg-[#3f1917] grid place-items-center rounded'>
            <img src='/icons/google.png' alt='' />
          </div>
        </div>
      </div>
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
          <Button variant='text' fullWidth>
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
            <div>*****d20@gmail.com</div>
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
              if (otpValue.length > 5) {
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
          <div className='text-[#737373] text-sm'>for john.doe@email.com</div>
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

          <Button
            variant='contained'
            fullWidth
            onClick={handleResetPassSubmit(handleResetPassword)}
          >
            Set New Password
          </Button>
          <Button variant='text' fullWidth>
            Back to log in
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Login

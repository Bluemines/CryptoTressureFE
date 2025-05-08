"use client"
import Modal from "@/app/components/modals/Modal"
import { Button, TextField } from "@mui/material"
import React, { Dispatch, SetStateAction, useState } from "react"
import { useForgetPassword } from "../hooks"
import FormInput from "@/app/components/ui/Inputs/FormInput"

const ForgetPassword = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const {
    control,
    handleSubmit,
    errors,
    handleForgetPassword,
    message,
    forgetSuccess
  } = useForgetPassword()

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className='space-y-4'>
        <div className='text-[#737373] text-2xl text-center'>LOGO</div>
        <div className='font-medium text-xl'>Forgot Password? 🔒</div>
        <div className='text-[#737373] text-sm'>
          Enter your email, and we'll send you OTP to reset your password
        </div>
        <FormInput name="email" control={control} label="Email" errors={errors}/>
        <Button
          variant='contained'
          fullWidth
          onClick={handleSubmit(handleForgetPassword)}
        >
          Send Reset Link
        </Button>
        <Button variant='text' fullWidth>
          Back to log in
        </Button>
      </div>
    </Modal>
  )
}

export default ForgetPassword

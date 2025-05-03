"use client"

import { Button, Checkbox, Input } from "@mui/material"
import { Divider } from "antd"
import Link from "next/link"
import { useState } from "react"
import Modal from "./modals/Modal"

const Login = () => {

  const [IsForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState<boolean>(false)

  return (
    <div className='w-full max-w-md'>
      <div className='text-[#737373] font-medium text-2xl'>LOGO</div>
      <div className='text-3xl mt-4'>Welcome to NFT!</div>
      <div className='text-[#c0c0c0] text-sm mt-2'>
        Please sign in to your account and start the adventure
      </div>

      <div className='space-y-4'>
        <div className='space-y-1'>
          <label htmlFor='emailOrUsername' className='block mt-4'>
            Email or Username
          </label>
          <Input
            fullWidth
            disableUnderline
            type='email'
            placeholder='Enter your Email'
            className='bg-[#262626] px-4 py-2 rounded-md'
          />
        </div>
        <div className='space-y-1'>
          <div className='flex items-center justify-between text-sm'>
            <label htmlFor='password' className='block'>
              Password
            </label>
            <Button variant="text" className='block text-[#7367F0]' onClick={() => setIsForgotPasswordModalOpen(true)}>Forgot Password?</Button>
          </div>
          <Input
            fullWidth
            disableUnderline
            type='password'
            placeholder='********'
            className='bg-[#262626] px-4 py-2 rounded-md'
          />
        </div>

        <div className='flex items-center gap-2'>
          <Checkbox className='!p-0' />{" "}
          <span className='text-muted'>Remember Me</span>
        </div>

        <Button variant='contained' fullWidth>
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
      <Modal open={IsForgotPasswordModalOpen} setOpen={setIsForgotPasswordModalOpen} ></Modal>
    </div>
  )
}

export default Login

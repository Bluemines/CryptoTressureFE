"use client";

import FormInput from "@/app/components/ui/Inputs/FormInput";
import { Button, Checkbox, Divider, Input } from "@mui/material";
import Link from "next/link";
import useRegisterHook from "./hooks";

const Register = () => {
  const { control, errors } = useRegisterHook();
  return (
    <div className="h-dvh flex">
      <div className="w-[50%] lg:w-[50%] overflow-hidden hidden md:block">
        <img
          src="/images/register-hero.png"
          alt=""
          className="h-[1016px] w-full"
        />
      </div>
      <div className="md:w-[50%] w-full grid place-items-center overflow-y-auto p-8 py-16">
        <div className="w-full max-w-md">
          <div className="text-[#737373] font-medium text-2xl">LOGO</div>
          <div className="text-3xl mt-4">Welcome to NFT!</div>
          <div className="text-muted text-sm mt-2">
            Please create to your account and start the adventure
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              {/* <label htmlFor='username' className='block mt-4'>
                Username
              </label>
              <Input
                fullWidth
                disableUnderline
                type='text'
                placeholder='Enter your Username'
                className='bg-[#262626] px-4 py-2 rounded-md'
              /> */}
              <FormInput
                name="username"
                control={control}
                errors={errors}
                label="Username"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="phoneNo" className="block mt-4">
                Phone Number
              </label>
              <Input
                fullWidth
                disableUnderline
                type="text"
                placeholder="Enter your Username"
                className="bg-[#262626] px-4 py-2 rounded-md"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="block mt-4">
                Email
              </label>
              <Input
                fullWidth
                disableUnderline
                type="email"
                placeholder="Enter your email"
                className="bg-[#262626] px-4 py-2 rounded-md"
              />
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    fullWidth
                    disableUnderline
                    type="email"
                    placeholder="Verify Email"
                    className="bg-[#262626] px-4 py-2 rounded-md"
                  />
                </div>
                <div className="flex">
                  <Button fullWidth variant="outlined">
                    Get Code
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block mt-4">
                Password
              </label>
              <Input
                fullWidth
                disableUnderline
                type="password"
                placeholder="********"
                className="bg-[#262626] px-4 py-2 rounded-md"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block mt-4">
                Confirm Password
              </label>
              <Input
                fullWidth
                disableUnderline
                type="password"
                placeholder="********"
                className="bg-[#262626] px-4 py-2 rounded-md"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block mt-4">
                Referral Code
              </label>
              <Input
                fullWidth
                disableUnderline
                type="text"
                placeholder="********"
                className="bg-[#262626] px-4 py-2 rounded-md"
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox className="!p-0" />{" "}
              <span className="text-muted">
                I agree to{" "}
                <span className="text-primary">privacy policy & terms</span>
              </span>
            </div>

            <Button variant="contained" fullWidth>
              Sign up
            </Button>

            <div className="text-sm text-center block mt-2">
              Already have an account?{" "}
              <Link className="text-primary" href="/login">
                Sign in instead
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
        </div>
      </div>
    </div>
  );
};

export default Register;

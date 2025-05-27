"use client";

import FormInput from "@/app/components/ui/Inputs/FormInput";
import { Button, Checkbox } from "@mui/material";
import Link from "next/link";
import useRegisterHook from "./hooks";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import PrivacyModal from "@/app/components/modals/PrivacyModal";

const Register = () => {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);

  const {
    control,
    errors,
    handleSubmit,
    onSubmit,
    submitCode,
    disabled,
    watch,
  } = useRegisterHook(ref || "");
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
          <div className="text-3xl mt-4">Welcome to Bluemines</div>
          <div className="text-muted text-sm mt-2">
            Please create to your account and start the adventure
          </div>

          <div className="space-y-4">
            {/* <div className='space-y-1'>
              <FormInput
                name='username'
                control={control}
                errors={errors}
                label='Username'
              />
            </div> */}
            <div className="space-y-1">
              <FormInput
                name="phone"
                control={control}
                errors={errors}
                label="Phone Number"
              />
            </div>
            <div className="space-y-1">
              <FormInput
                name="username"
                control={control}
                errors={errors}
                label="Full Name"
              />
            </div>
            {/* <div className="space-y-1">
            <FormInput
                name="phone"
                control={control}
                errors={errors}
                label="Username"
              />
            </div> */}
            <div className="space-y-1">
              <FormInput
                name="email"
                control={control}
                errors={errors}
                label="Enter Email"
              />
              <div className="flex gap-2">
                <div className="flex-1">
                  <FormInput
                    name="code"
                    control={control}
                    errors={errors}
                    label="Enter Code"
                  />
                </div>
                <div className="flex">
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ height: "70%", mt: "15%" }}
                    onClick={submitCode}
                    disabled={disabled || !watch("email")}
                  >
                    {disabled ? "Code send" : "Get Code"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <FormInput
                name="password"
                control={control}
                errors={errors}
                label="Enter Password"
                type="password"
              />
            </div>
            <div className="space-y-1">
              <FormInput
                name="confirmPassword"
                control={control}
                errors={errors}
                label="Confirm Password"
                type="password"
              />
            </div>
            <div className="space-y-1">
              <FormInput
                name="referralCode"
                control={control}
                errors={errors}
                disabled={ref ? true : false}
                label="Referral Code"
              />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                className="!p-0"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  if (e.target.checked) setShowTermsError(false);
                }}
              />
              <span
                className="text-muted text-sm"
                onClick={() => setPrivacyOpen(true)}
              >
                I agree to{" "}
                <span className="text-primary underline cursor-pointer">
                  privacy policy & terms
                </span>
              </span>
            </div>
            {showTermsError && (
              <div className="text-red-500 text-xs">
                You must agree to continue.
              </div>
            )}

            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                if (!agreedToTerms) {
                  setShowTermsError(true);
                  return;
                }
                handleSubmit(onSubmit)();
              }}
            >
              Sign up
            </Button>

            <div className="text-sm text-center block mt-2">
              Already have an account?{" "}
              <Link className="text-primary" href="/login">
                Sign in instead
              </Link>
            </div>

            {/* <Divider>Or</Divider> */}

            {/* <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-[38px] w-[38px] bg-[#1d2b48] grid place-items-center rounded">
                <img src="/icons/fb.png" alt="" />
              </div>
              <div className="h-[38px] w-[38px] bg-[#0d3148] grid place-items-center rounded">
                <img src="/icons/twitter.png" alt="" />
              </div>
              <div className="h-[38px] w-[38px] bg-[#3f1917] grid place-items-center rounded">
                <img src="/icons/google.png" alt="" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />
    </div>
  );
};

export default Register;

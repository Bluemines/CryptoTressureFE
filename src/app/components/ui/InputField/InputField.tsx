"use client"
import { useState } from "react"
import { UseFormRegister, FieldError, RegisterOptions } from "react-hook-form"
import { FiEye, FiEyeOff } from "react-icons/fi"

interface InputFieldProps {
  label: string
  name: string
  register: UseFormRegister<any>
  required?: boolean
  error?: FieldError
  placeholder?: string
  type?: string
  validation?: RegisterOptions
  disabled?: boolean
}

export const InputField = ({ label, name, register, required = false, error, placeholder, type = "text", validation, disabled = false }: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const validationRules = {
    ...validation,
    ...(required && { required: `${label} is required` }),
  }

 const isPassword = type === "password"

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm text-[#263238] font-bold">
        {label}
      </label>
      <div className="relative">
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        disabled={disabled}
        placeholder={placeholder}
        {...register(name, validationRules)}
        className={`w-full border rounded-lg px-4 py-2 placeholder:text-[#8F8F8F] placeholder:text-sm ${
          error ? "border-red-500" : "border-[#EAEBEC]"
        } focus:outline-none focus:ring-0 focus:border-[#7F56D9]`}
      />
      {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  )
}
"use client"

import { useGetCurrentUser, useUpdateUser } from "@/api/auth/useAuth"
import { base_image_url } from "@/app/constants/keys"
import { authStore } from "@/store/authStore"
import { AxiosError } from "axios"
// import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Inputs = {
  id: number
  email: string
  username: string
  phone?: string
  profile?: File | null
}

const AccountTab = () => {
  const { setUser } = authStore()
  const { data } = useGetCurrentUser()
  const { mutate: updateUser } = useUpdateUser()
  const userData = data

  const fileRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string>("")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    defaultValues: {
      id: 0,
      email: "",
      username: "",
      phone: "",
      profile: null,
    },
  })

  useEffect(() => {
    if (userData) {
      reset({
        id: userData.id,
        email: userData.email || "",
        username: userData.username || "",
        phone: userData.phone || "",
        profile: userData.profile || null,
      })
      setUser(userData)
      setPreview(
        userData.profile
          ? `${base_image_url}${userData.profile}`
          : "/default-profile.png"
      )
    }
  }, [userData, reset, setUser])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      setValue("profile", file)
    }
  }

  const onSubmit = (formData: Inputs) => {
    if (!userData?.id) return

    const form = new FormData()
    form.append("id", userData.id.toString())
    form.append("username", formData.username)
    form.append("phone", formData.phone || "")
    if (formData.profile) {
      form.append("profile", formData.profile)
    }

    updateUser(form, {
      onSuccess: (data) => {
        toast.success(data.message || "User updated")
      },
      onError: (error) => {
        const err = error as AxiosError<{ message: string }>
        toast.error(err.response?.data?.message || "Something went wrong")
      },
    })
  }

  return (
    <div className='bg-[#1A1A1D] rounded-lg p-6 space-y-6'>
      <h2 className='text-xl font-semibold mb-4'>Profile Details</h2>

      <div className='flex flex-col md:flex-row items-start gap-4'>
        <img
          alt='profile'
          src={preview || require("../../assets/Images/profile.png")}
          width={100}
          height={100}
          className='rounded-full object-cover'
        />
        <div className='flex flex-col gap-2 mt-4'>
          <input
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
            ref={fileRef}
          />
          <button
            type='button'
            onClick={() => fileRef.current?.click()}
            className='bg-[#242330] text-[#7367f0] hover:bg-white hover:text-black rounded-lg h-10 w-44'
          >
            Upload new Photo
          </button>
          <button
            type='button'
            onClick={() => {
              setPreview("")
              if (fileRef.current) {
                fileRef.current.value = ""
              }
              setValue("profile", null)
            }}
            className='bg-[#323233] text-[#a8aaad] hover:bg-purple-700 hover:text-white rounded-lg h-10 w-30'
          >
            Reset
          </button>
        </div>
      </div>

      <p className='text-sm text-gray-400'>
        Allowed JPG, GIF or PNG. Max size of 800K
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
      >
        <div className='space-y-2 w-full'>
          <label className='text-sm text-gray-400'>User Name</label>
          <input
            {...register("username", { required: true })}
            placeholder='Enter your username'
            className='w-full h-10 px-3 py-2 bg-[#212121] border border-[#3c3c3c] rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors'
          />
          {errors.username && (
            <p className='text-red-500 text-sm'>Username is required</p>
          )}
        </div>

        <div className='space-y-2 w-full'>
          <label className='text-sm text-gray-400'>Email</label>
          <input
            {...register("email")}
            readOnly
            disabled
            placeholder='Enter your email'
            className='w-full h-10 px-3 py-2 bg-[#2a2a2a] border border-[#3c3c3c] rounded-md text-gray-400 placeholder:text-gray-500 cursor-not-allowed'
          />
        </div>

        <div className='space-y-2 w-full'>
          <label className='text-sm text-gray-400'>Phone Number</label>
          <input
            {...register("phone")}
            placeholder='Enter your phone number'
            className='w-full h-10 px-3 py-2 bg-[#212121] border border-[#3c3c3c] rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors'
          />
        </div>

        <div className='col-span-1 md:col-span-2'>
          <button
            type='submit'
            className='bg-[#7367f0] hover:bg-purple-700 w-24 h-9 text-white rounded-md transition-colors'
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default AccountTab

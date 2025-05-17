import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import { registerSchema } from "../schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { ConfirmEmailApi, RegisterApi } from "@/api/authentication"
import { ISignupBody } from "@/api/authentication/types"
import { RegisterFormType } from "../types"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"

const DISABLE_DURATION = 10 * 60 * 1000 // 10 minutes in ms
const STORAGE_KEY = "last_code_sent_at"

export default function useRegisterHook(ref?: string) {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(registerSchema) as Resolver<RegisterFormType>,
    defaultValues: {
      username: "",
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
      referralCode: ref || "",
      phone: ''
    },
  })
  const {
    mutateAsync: registerUser,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: RegisterApi.mutationFn,
    onSuccess: () => {
      toast.success("Register Successful!")
      router.push("/user/dashboard")
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>
      toast.error(err.response?.data?.message || "Something went wrong")
    },
  })
  const {
    mutateAsync: getCode,
    // isPending,
    // isError,
    // isSuccess,
    // error,
  } = useMutation({
    mutationFn: ConfirmEmailApi.mutationFn,
  })

const [disabled, setDisabled] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
  const lastSent = localStorage.getItem(STORAGE_KEY)

  if (lastSent) {
    const interval = setInterval(() => {
      const now = Date.now()
      const diff = now - Number(lastSent)
      const remaining = DISABLE_DURATION - diff

      if (remaining > 0) {
        setDisabled(true)
        setTimeLeft(remaining)
      } else {
        setDisabled(false)
        setTimeLeft(0)
        localStorage.removeItem(STORAGE_KEY)
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }
}, [])

  const submitCode = async () => {
    const email = getValues("email")
    if (!email) {
      // Optional: Show a toast/snackbar that email is required
      return
    }
    try {
      const response = await getCode({ email })
      console.log(response)
      toast.success('Code sent to the mail!')
      localStorage.setItem(STORAGE_KEY, Date.now().toString())
      setDisabled(true)

      const timeout = setTimeout(() => {
        setDisabled(false)
        localStorage.removeItem(STORAGE_KEY)
      }, DISABLE_DURATION)

      return () => clearTimeout(timeout)
    } catch (error) {
      console.log("error sending email: ", error)
      setDisabled(false)
      // Optional: handle error, e.g. show toast/snackbar
    }
  }
  const onSubmit = async (data: RegisterFormType) => {
    const { confirmPassword, ...rest } = data

    const payload: ISignupBody = {
      email: rest.email,
      password: rest.password!,
      code: rest.code,
      username: rest.username,
      referralCode: rest.referralCode,
      phone: rest.phone
    }

    const response = await registerUser(payload)
    // console.log(response)
  }

  return { control, errors, handleSubmit, onSubmit, error, submitCode, disabled }
}

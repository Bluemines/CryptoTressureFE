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

export default function useRegisterHook() {
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
      referralCode: "",
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

  const submitCode = async () => {
    const email = getValues("email")
    if (!email) {
      // Optional: Show a toast/snackbar that email is required
      return
    }

    try {
      const response = await getCode({ email })
      console.log(response)
      // Optional: handle success, e.g. show toast/snackbar
    } catch (error) {
      console.log("error sending email: ", error)
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
    }

    const response = await registerUser(payload)
    console.log(response)
  }

  return { control, errors, handleSubmit, onSubmit, error, submitCode }
}

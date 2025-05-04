import { useForm } from "react-hook-form";
import { RegisterFormType, registerSchema } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { RegisterApi } from "@/api/authentication";
import { ISignupBody } from "@/api/authentication/types";

export default function useRegisterHook() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
    },
  });
  const { mutateAsync: registerUser } = useMutation({
    mutationFn: RegisterApi.mutationFn,
  });
  const onSubmit = async (data: RegisterFormType) => {
    const { confirmPassword, ...rest } = data;
  
    const payload: ISignupBody
     = {
      email: rest.email,
      password: rest.password!,
      code: rest.code,
      username: rest.username,
      referralCode: rest.referralCode,
    };
  
    await registerUser(payload);
  };
  return { control, errors };
}

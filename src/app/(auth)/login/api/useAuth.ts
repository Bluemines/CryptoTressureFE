import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "./authService";
import { AxiosError, AxiosResponse } from "axios"

interface Response {
  message: string
  status: number
  success: boolean
}
export interface IAxiosError extends AxiosError {
  response?: AxiosResponse<Response>
}


type ForgetPasswordPayload = {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
};

export const useForgetPasswordd = () => {
  return useMutation<any, IAxiosError, ForgetPasswordPayload>({
    mutationFn: (payload) => resetPassword(payload.email, payload.code, payload.newPassword, payload.confirmPassword)
  });
};
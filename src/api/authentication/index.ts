import { mutationFn } from "@/app/utils/axios";
import { ILoginBody, ISendEmailBody, ISignupBody } from "./types";

export const loginApi = {
    mutationFn: (body: ILoginBody) => {
        return mutationFn('auth/signin', 'POST', body);
    },
};

export const RegisterApi = {
    mutationFn: (body: ISignupBody) => {
        return mutationFn('auth/signup', 'POST', body);
    },
};
export const ConfirmEmailApi = {
    mutationFn: (body: ISendEmailBody) => {
        return mutationFn('auth/send-email', 'POST', body);
    },
};


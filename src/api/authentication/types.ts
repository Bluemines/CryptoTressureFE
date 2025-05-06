export interface ILoginBody {
  email: string;
  password: string;
}
export interface ISignupBody {
  email: string;
  password: string;
  code: string;
  username: string;
  referralCode?: string;
}
export interface ISendEmailBody{
    email:string
}
export interface IResetPasswordBody{
    email:string
    code: string
    newPassword: string
    confirmPassword: string
}
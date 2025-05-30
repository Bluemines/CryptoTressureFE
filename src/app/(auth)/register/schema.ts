// validation/registerSchema.ts
import * as yup from "yup";

export const registerSchema = yup.object({
    username: yup.string().min(3,"Username must be atleast 3 letters").required(),
    email: yup.string().email("Invalid email").required("Email is required"),
    code: yup.string().required("Code is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    referralCode: yup.string().optional(),
  });
  


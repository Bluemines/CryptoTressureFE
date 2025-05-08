import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email:yup.string().email().required("Email is required"),
    password:yup.string().required("Password is required")
})

export const forgetPasswordSchema = yup.object().shape({
    email:yup.string().email().required("Email is required"),
})

export const resetPasswordSchema = yup.object().shape({
    email:yup.string().email().required("Email is required"),
    code: yup.string().required(),
    newPassword: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Confirm Password is required"),
})
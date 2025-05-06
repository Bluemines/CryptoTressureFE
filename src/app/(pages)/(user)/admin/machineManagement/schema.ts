import * as yup from "yup";

export const addMachineSchema = yup.object({
    title:yup.string().required("*Required"),
    description:yup.string().required("*Required"),
    price:yup.string().required("*Required"),
    dailyIncome:yup.string().required("*Required"),
    fee:yup.string().required("*Required"),
    rentalDays:yup.number().required("*Required and must be a number"),
})
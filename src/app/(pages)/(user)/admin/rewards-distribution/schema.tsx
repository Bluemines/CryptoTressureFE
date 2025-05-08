import * as yup from "yup";

export const addRewardSchema = yup.object({
  id: yup
    .number()
    .typeError("User required")
    .required("User required"),
  product: yup
    .number()
    .typeError("Product is required")
    .required("Product is required"),
  reward: yup
    .number()
    .typeError("Reward is required")
    .required("Reward is required"),
});

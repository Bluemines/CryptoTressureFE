import * as yup from "yup";

export const addLevelSchema = yup.object().shape({
  level: yup
    .number()
    .typeError("Level must be a number")
    .required("Level is required")
    .min(1, "Level must be at least 1"),

  points: yup
    .number()
    .typeError("Points must be a number")
    .required("Points are required")
    .min(0, "Points cannot be negative"),
});

import { useForm } from "react-hook-form";

export default function useRegisterHook() {
  const {
    control,
    // handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();
  return { control, errors };
}

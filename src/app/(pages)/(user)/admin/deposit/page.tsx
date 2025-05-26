'use client';
import { useForm } from 'react-hook-form';
import { Button } from "@mui/material";
import { useAddDepositforUser } from '@/api/admin/useAdmin';
import toast from 'react-hot-toast';


type FormValues = {
  amount: number;
  email: string;
};

export default function Deposit() {
  const {mutate: AddDpositforUser, isPending}= useAddDepositforUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Deposit Data:", data);

    console.log("Deposit Data:",typeof data.amount);
    

    AddDpositforUser(data, {
        onSuccess: () => {
            toast.success('Deposit Successfully')
        }
    });
    // You can send data to your API here
    reset(); // Optional: Reset form after submission
  };

  return (
    <div className="bg-[#1e1e1e] p-6 rounded-xl max-w-xxl mx-auto mt-10 shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">Deposit Funds</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Deposit Amount Field */}
        <div>
          <label htmlFor="depositAmount" className="block text-sm text-white mb-1">
            Deposit Amount
          </label>
          <input
            id="amount"
            type="number"
            step="any"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 1, message: "Amount must be at least 1" },
              valueAsNumber: true
            })}
            className={`bg-[#2c2c2c] placeholder-white text-white rounded-md px-4 py-2 w-full border ${
              errors.amount ? "border-red-500" : "border-transparent"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            placeholder="Enter amount (e.g. 100)"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="userEmail" className="block text-sm text-white mb-1">
            User Email
          </label>
          <input
            id="userEmail"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email address",
              },
            })}
            className={`bg-[#2c2c2c] placeholder-white text-white rounded-md px-4 py-2 w-full border ${
              errors.email ? "border-red-500" : "border-transparent"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            placeholder="e.g. user@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 text-center">
          <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
            Deposit
          </Button>
        </div>
      </form>
    </div>
  );
}

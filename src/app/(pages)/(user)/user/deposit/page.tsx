'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useinitDeposit } from '@/api/user/useUser';
import { useEffect, useState } from 'react';

type FormValues = {
  amount: number;
};

export default function InitiateDepositPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();
  const { mutate: AddDepositforUser, isPending } = useinitDeposit();
  const router = useRouter();

  const amount = watch('amount');
  const [convertedUSD, setConvertedUSD] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!amount || isNaN(Number(amount))) return setConvertedUSD(null);
      convertPKRtoUSD(Number(amount));
    }, 500);

    return () => clearTimeout(timeout);
  }, [amount]);

  const convertPKRtoUSD = async (pkrAmount: number) => {
    try {
      const res = await fetch(
        'https://v6.exchangerate-api.com/v6/514f151f117da8b3be458ea2/latest/USD'
      );
      const data = await res.json();

      const usdToPkrRate = data?.conversion_rates?.PKR;

      if (!usdToPkrRate) throw new Error('Invalid conversion rate');

      const usdAmount = pkrAmount / usdToPkrRate;
      setConvertedUSD(usdAmount.toFixed(2));
    } catch (err) {
      toast.error('Currency conversion failed');
      setConvertedUSD(null);
    }
  };

  const onSubmit = (data: FormValues) => {

    if (!convertedUSD) {
      toast.error('value missing in dollars')
      return
    }

    const amountInUSD = Number(convertedUSD);

    if (amountInUSD < 50) {
      toast.error('Minimum deposit is $50');
      return;
    }

    AddDepositforUser({ amount: amountInUSD }, {
      onSuccess: (response: any) => {
        toast.success('Redirecting to complete deposit');
        const reference = response?.data?.reference;
        router.push(`/user/deposit/webhook?amount=${data.amount}&reference=${reference}`);
      },
      onError: () => {
        toast.error('Failed to initiate deposit');
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] p-8 rounded-xl w-full max-w-md">
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">Initiate Deposit</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Amount Input */}
          <div>
            <label className="text-white text-sm mb-1 block">Amount (PKR)</label>
            <input
              type="number"
              step="any"
              {...register('amount', {
                required: 'Amount is required',
                min: { value: 1, message: 'Minimum 1 PKR' },
                valueAsNumber: true
              })}
              className={`w-full px-4 py-2 rounded-md bg-[#2c2c2c] text-white border ${
                errors.amount ? 'border-red-500' : 'border-transparent'
              } focus:outline-none`}
              placeholder="Enter amount"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>

          {/* Converted USD */}
          <div>
            <label className="text-white text-sm mb-1 block">Converted (USD)</label>
            <input
              type="text"
              value={convertedUSD ? `$${convertedUSD}` : 'Converting...'}
              disabled
              className="w-full px-4 py-2 rounded-md bg-[#262626] text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isPending ? 'Processing...' : 'Initiate Deposit'}
          </button>
        </form>
      </div>
    </div>
  );
}

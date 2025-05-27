'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { useAddDepositforUser, useListAdminDepositsforUser } from '@/api/admin/useAdmin';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import StatusBadge from '@/app/components/ui/StatusBadge';

type FormValues = {
  amount: number;
  email: string;
};

type Deposit = {
  id: number;
  amount: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  provider: string;
  createdAt: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
};

const columns = [
  {
    name: 'Email',
    selector: (row: Deposit) => row.user.email,
    sortable: true,
  },
  {
    name: 'Username',
    selector: (row: Deposit) => row.user.username,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: (row: Deposit) => row.amount,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row: Deposit) => row.status,
    cell: (row: Deposit) => <StatusBadge status={row.status} />,
    sortable: true,
  },
  {
    name: 'Provider',
    selector: (row: Deposit) => row.provider,
    sortable: true,
  },
  {
    name: 'Date',
    selector: (row: Deposit) => new Date(row.createdAt).toLocaleString(),
    sortable: true,
  },
];

const customTableStyles = {
  rows: {
    style: {
      backgroundColor: '#1e1e1e',
      color: 'white',
      minHeight: '56px',
    },
  },
  headCells: {
    style: {
      backgroundColor: '#2c2c2c',
      color: '#00bcd4',
      fontWeight: 'bold',
      fontSize: '14px',
    },
  },
  pagination: {
    style: {
      backgroundColor: '#1e1e1e',
      color: 'white',
    },
  },
};

export default function Deposit() {
  const { mutate: AddDepositforUser, isPending } = useAddDepositforUser();

  const { data, isLoading, isError, error, refetch } = useListAdminDepositsforUser();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const amount = watch('amount');
  const [convertedUSD, setConvertedUSD] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!amount || isNaN(Number(amount))) return setConvertedUSD(null);
      convertPKRtoUSD(Number(amount));
    }, 500);

    return () => clearTimeout(timeout);
  }, [amount]);

  async function convertPKRtoUSD(pkrAmount: number) {
  try {
    const res = await fetch(
      "https://api.exchangeratesapi.io/v1/latest?access_key=28efabef496f650d981f930739aa25e2&symbols=USD,PKR"
    );
    const data = await res.json();

    const usdPerEur = data?.rates?.USD;
    const pkrPerEur = data?.rates?.PKR;

    if (!usdPerEur || !pkrPerEur) throw new Error('Invalid rates');

    // Calculate USD per PKR
    const usdPerPkr = usdPerEur / pkrPerEur;

    const usdAmount = pkrAmount * usdPerPkr;
    setConvertedUSD(usdAmount.toFixed(2));
  } catch (err) {
    toast.error('Conversion failed');
    setConvertedUSD(null);
  }
}


  const onSubmit = (data: FormValues) => {
    if (!convertedUSD) {
      toast.error('USD conversion not ready.');
      return;
    }

    const payload: FormValues = {
      ...data,
      amount: parseFloat(convertedUSD),
    };

    AddDepositforUser(payload, {
      onSuccess: () => {
        toast.success('Deposit Successful');
        reset();
        setConvertedUSD(null);
        refetch(); // refresh the deposits list after successful deposit
      },
    });
  };

  console.log('Fetched deposits:', data);

  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading deposits...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load deposits: {(error as any)?.message || 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] py-10 px-4">
      {/* Form */}
      <div className="bg-[#1e1e1e] p-6 rounded-xl max-w-xxl mx-auto shadow-lg mb-10">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Deposit Funds</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm text-white mb-1">
              Deposit Amount (PKR)
            </label>
            <input
              id="amount"
              type="number"
              step="any"
              {...register('amount', {
                required: 'Amount is required',
                min: { value: 1, message: 'Minimum 1 PKR' },
                valueAsNumber: true,
              })}
              className={`bg-[#2c2c2c] text-white rounded-md px-4 py-2 w-full border ${
                errors.amount ? 'border-red-500' : 'border-transparent'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              placeholder="Enter PKR amount"
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Converted Value (USD)</label>
            <input
              type="text"
              value={convertedUSD ? `$${convertedUSD}` : 'Converting...'}
              disabled
              className="bg-[#262626] text-white rounded px-4 py-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-white mb-1">
              User Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email address',
                },
              })}
              className={`bg-[#2c2c2c] text-white rounded-md px-4 py-2 w-full border ${
                errors.email ? 'border-red-500' : 'border-transparent'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              placeholder="e.g. user@gmail.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="pt-4 text-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={isPending}
            >
              {isPending ? 'Processing...' : 'Deposit'}
            </Button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold text-white mb-4">Deposit History</h3>
        <DataTable
          columns={columns}
          data={data?.data?.items || []} // Use fetched data here
          customStyles={customTableStyles}
          pagination
          highlightOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}

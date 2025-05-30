'use client';

import { useSearchParams } from 'next/navigation';
import { usePostWebhook } from '@/api/user/useUser'; // Adjust path if needed
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function WebhookDepositPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const amountParam = searchParams.get('amount');
  const amount = amountParam ? parseFloat(amountParam) : null;

  const { mutate: postWebhook, isPending } = usePostWebhook();

  const handleWebhook = () => {
    if (!reference || !amount) {
      toast.error('Missing reference or amount');
      return;
    }

    const payload = {
      reference,
      status: 'SUCCESS',
      amount,
      transactionId: 'EP123456789', // Simulated transaction ID
    };

    postWebhook(payload);
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] p-8 rounded-xl w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">Complete Deposit</h2>

        <div className="mb-6 space-y-2">
          <p><strong>Amount:</strong> PKR {amount}</p>
          <p><strong>Reference:</strong> {reference}</p>
        </div>

        <button
          onClick={handleWebhook}
          disabled={isPending}
          className="w-full bg-blue-600 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isPending ? 'Processing...' : 'Complete Deposit'}
        </button>
      </div>
    </div>
  );
}

"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { usePostWebhook } from "@/api/user/useUser"
import { useState } from "react"
import toast from "react-hot-toast"

export default function WebhookDepositPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const reference = searchParams.get("reference")
  const amountParam = searchParams.get("amount")
  const amount = amountParam ? parseFloat(amountParam) : null
  const [isDisabled, setIsDisabled] = useState(false)

  const { mutate: postWebhook, isPending } = usePostWebhook()

  const handleWebhook = () => {
    if (!reference || !amount) {
      toast.error("Missing reference or amount")
      return
    }

    const payload = {
      reference,
      status: "SUCCESS",
      amount,
      transactionId: "EP123456789",
    }

    postWebhook(payload, {
      onSuccess: () => {
        setIsDisabled(true)
      },
    })
  }

  return (
    <div className='min-h-screen bg-[#121212] flex items-center justify-center p-4'>
      <div className='bg-[#1e1e1e] p-8 rounded-xl w-full max-w-md text-white'>
        <h2 className='text-2xl font-semibold mb-4 text-center'>
          Complete Deposit
        </h2>

        <div className='mb-6 space-y-2'>
          <p>
            <strong>Amount:</strong> PKR {amount}
          </p>
          <p>
            <strong>Reference:</strong> {reference}
          </p>
        </div>

        <button
          onClick={handleWebhook}
          disabled={isDisabled || isPending}
          className={`w-full py-2 rounded-md transition mb-4
            ${
              isDisabled || isPending
                ? "bg-blue-400 cursor-not-allowed opacity-50"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          {isPending ? "Processing..." : "Complete Deposit"}
        </button>

        {isDisabled && (
          <button
            onClick={() => router.back()}
            className='w-full py-2 rounded-md bg-gray-600 hover:bg-gray-700 transition'
          >
            Back
          </button>
        )}
      </div>
    </div>
  )
}

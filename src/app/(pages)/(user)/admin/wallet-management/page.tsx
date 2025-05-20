"use client"

import { StatsCard } from "@/app/components/cards/StatsCard"
import PrimaryButton from "@/app/components/ui/PrimaryButton"
import { useRouter } from "next/navigation"
import {
  useApproveWithdrawl,
  useGetPendingWallets,
  useGetWalletHistory,
  useRejectWithdrawl,
} from "@/api/wallet"
import StatusBadge from "@/app/components/ui/StatusBadge"
import { useMemo } from "react"
import toast from "react-hot-toast"

const Page = () => {
  const router = useRouter()
  const { data, isLoading } = useGetPendingWallets()
  const { data: walletHistory } = useGetWalletHistory()

  console.log("walletHistory: ", walletHistory)

  const statsData = [
    { value: "4,235", label: "Total Users", color: "bg-[#7C3AED]" },
    { value: "3,312", label: "Verified Users", color: "bg-[#50BB25]" },
    { value: "20", label: "Suspended Users", color: "bg-[#EC1E2D]" },
  ]

  const { mutate: rejectWithdrawl } = useRejectWithdrawl()
  const { mutate: approveWithdrawl } = useApproveWithdrawl()

  const handleApprove = (id: number) => {
    console.log("Approve", id)
    // TODO: call API to approve
    approveWithdrawl(
      { id: id },
      {
        onSuccess: () => {
          toast.success("Withdrawl accepted")
        },
        onError: (error: any) => {
          toast.error(error.response?.data.message)
        },
      }
    )
  }

  const handleReject = (id: number) => {
    console.log("Reject", id)
    // TODO: call API to reject
    rejectWithdrawl(
      { id: id },
      {
        onSuccess: () => {
          toast.success("Withdrawl rejected")
        },
        onError: (error: any) => {
          toast.error(error.response?.data.message)
        },
      }
    )
  }

  const pendingWallets = useMemo(() => {
    return (
      data?.map((item: any) => ({
        id: item.id,
        username: item.user?.username || "N/A",
        amount: `${item.amount} PKR`,
        date: new Date(item.createdAt).toLocaleDateString(),
        paymentMethod: item.msisdn ? "Mobile" : "CNIC",
        status: item.status,
      })) || []
    )
  }, [data])

  return (
    <div className='text-white'>
      <div className='flex flex-col md:flex-row md:items-center justify-between mt-4'>
        <div className='text-xl mb-4 md:mb-0'>Wallet Management</div>
        <div className='flex flex-col md:flex-row gap-2 md:items-center'>
          <div className='bg-[#2B2B2B] py-2 px-4 rounded'>
            Easypaisa account *******1234 is connected
          </div>
          <PrimaryButton
            onClick={() =>
              router.push("/admin/wallet-management/add-new-wallet")
            }
            bgColor='#7367F0'
            className='!text-white !border-none !font-medium'
          >
            Add new Wallet
          </PrimaryButton>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4'>
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            value={stat.value}
            label={stat.label}
            color={stat.color}
          />
        ))}
      </div>

      <div className='font-semibold text-xl my-3'>Pending Withdrawal</div>

      {pendingWallets.length > 0 ? (
        <div className='overflow-auto rounded-lg border border-gray-700'>
          <table className='min-w-full text-sm text-left text-gray-300 bg-[#262626]'>
            <thead className='text-xs uppercase bg-[#262626] text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  User
                </th>
                <th scope='col' className='px-6 py-3'>
                  Amount
                </th>
                <th scope='col' className='px-6 py-3'>
                  Date
                </th>
                <th scope='col' className='px-6 py-3'>
                  Payment Method
                </th>
                <th scope='col' className='px-6 py-3'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingWallets.map((item: any) => (
                <tr
                  key={item.id}
                  className='border-b border-gray-700 hover:bg-gray-800'
                >
                  <td className='px-6 py-4'>{item.username}</td>
                  <td className='px-6 py-4'>{item.amount}</td>
                  <td className='px-6 py-4'>{item.date}</td>
                  <td className='px-6 py-4'>{item.paymentMethod}</td>
                  <td className='px-6 py-4'>
                    <StatusBadge status={item.status} />
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex gap-2'>
                      <button
                        className='px-3 py-1 text-xs bg-green-500 text-white rounded'
                        onClick={() => handleApprove(item.id)}
                      >
                        Approve
                      </button>
                      <button
                        className='px-3 py-1 text-xs bg-red-500 text-white rounded'
                        onClick={() => handleReject(item.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='text-gray-300'>No pending withdrawals found.</div>
      )}

      {/* Wallet History Section */}
      <div className='font-semibold text-xl mt-8 mb-3'>Wallet History</div>

      {isLoading ? (
        <div className='text-gray-300'>Loading wallet history...</div>
      ) : walletHistory && walletHistory.length > 0 ? (
        <div className='overflow-auto rounded-lg border border-gray-700'>
          <table className='min-w-full text-sm text-left text-gray-300 bg-[#262626]'>
            <thead className='text-xs uppercase bg-[#262626] text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Amount
                </th>
                <th scope='col' className='px-6 py-3'>
                  Fee
                </th>
                <th scope='col' className='px-6 py-3'>
                  Total
                </th>
                <th scope='col' className='px-6 py-3'>
                  Date
                </th>
                <th scope='col' className='px-6 py-3'>
                  Payment Method
                </th>
                <th scope='col' className='px-6 py-3'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {walletHistory.map((item: any) => (
                <tr
                  key={item.id}
                  className='border-b border-gray-700 hover:bg-gray-800'
                >
                  <td className='px-6 py-4'>{item.amount} PKR</td>
                  <td className='px-6 py-4'>{item.fee} PKR</td>
                  <td className='px-6 py-4'>{item.total} PKR</td>
                  <td className='px-6 py-4'>
                    {new Date(item.date).toLocaleString()}
                  </td>
                  <td className='px-6 py-4'>
                    {item.msisdn ? "Mobile" : "CNIC"}
                  </td>
                  <td className='px-6 py-4'>
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='text-gray-300'>No wallet history found.</div>
      )}
    </div>
  )
}

export default Page

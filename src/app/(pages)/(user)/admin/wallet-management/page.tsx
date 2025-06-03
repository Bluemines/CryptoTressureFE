"use client"

import { useAdminAllWallets } from "@/api/admin/useAdmin"
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
import useAdminDashboard from "../dashboard/hooks"
import StatsCardSkeleton from "@/loaders/StatsCardSkeleton"
import TableSkeleton from "@/loaders/TableSkeleton"
import { formatCurrency } from "@/lib"

const Page = () => {
  const router = useRouter()

  // Your existing hooks
  const { data, isLoading: isPendingLoading } = useGetPendingWallets()
  const { data: walletHistory, isLoading: isWalletHistoryLoading } =
    useGetWalletHistory()
  const { stats, isLoading: isStatsLoading } = useAdminDashboard()

  // New wallet summary hook
  const { data: walletSummaryData, isLoading: isWalletSummaryLoading } =
    useAdminAllWallets()

  // Wallet summary cards data
  const walletSummary = [
    {
      label: "Balance",
      value: formatCurrency(walletSummaryData?.data?.balance) || "0",
      color: "bg-[#4F46E5]", // Indigo
    },
    {
      label: "Reserved Amount",
      value: formatCurrency(walletSummaryData?.data?.reservedAmount) || "0",
      color: "bg-[#16A34A]", // Green
    },
    {
      label: "Referral Earnings",
      value: formatCurrency(walletSummaryData?.data?.referralEarnings) || "0",
      color: "bg-[#F59E0B]", // Amber
    },
    {
      label: "Team Earnings",
      value: formatCurrency(walletSummaryData?.data?.teamEarnings) || "0",
      color: "bg-[#EF4444]", // Red
    },
    {
      label: "Investment Earnings",
      value: formatCurrency(walletSummaryData?.data?.investmentEarnings) || "0",
      color: "bg-[#10B981]", // Teal
    },
  ]

  // NOTE: Removed the existing statsData section as requested

  const { mutate: rejectWithdrawl } = useRejectWithdrawl()
  const { mutate: approveWithdrawl } = useApproveWithdrawl()

  const handleApprove = (id: number) => {
    console.log("Approve", id)
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

      {/* Wallet Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-4'>
        {isWalletSummaryLoading
          ? Array(5)
              .fill(null)
              .map((_, i) => <StatsCardSkeleton key={i} />)
          : walletSummary.map((item, index) => (
              <StatsCard
                key={index}
                value={item.value}
                label={item.label}
                color={item.color}
              />
            ))}
      </div>

      {/* Removed existing stats cards */}

      <div className='font-semibold text-xl my-3'>Pending Withdrawal</div>

      {isPendingLoading ? (
        <TableSkeleton rows={5} cols={6} />
      ) : pendingWallets.length > 0 ? (
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
        <div className='w-full h-[300px] flex items-center justify-center border border-gray-700 bg-[#1f1f1f] rounded-lg'>
          <div className='text-center text-gray-400 text-sm'>
            <p className='text-lg font-medium text-white'>
              Nothing to show here
            </p>
            <p className='text-sm text-gray-500 mt-1'>No pending withdrawls.</p>
          </div>
        </div>
      )}

      {/* Wallet History Section */}
      <div className='font-semibold text-xl mt-8 mb-3'>Wallet History</div>

      {isWalletHistoryLoading ? (
        <TableSkeleton rows={5} cols={6} />
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
        <div className='w-full h-[300px] flex items-center justify-center border border-gray-700 bg-[#1f1f1f] rounded-lg'>
          <div className='text-center text-gray-400 text-sm'>
            <p className='text-lg font-medium text-white'>
              Nothing to show here
            </p>
            <p className='text-sm text-gray-500 mt-1'>No wallet history found.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page

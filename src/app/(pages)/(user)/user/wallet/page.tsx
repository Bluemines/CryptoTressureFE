"use client"
import PrimaryButton from "@/app/components/ui/PrimaryButton"
import StatsCard from "@/app/components/ui/StatsCard"
import { useRouter } from "next/navigation"
import DataTable from "@/app/components/DataTable/DataTable"
import { TableColumn } from "react-data-table-component"
import StatusBadge from "@/app/components/ui/StatusBadge"
import { useGetWalletStats, usePostWalletWithdraw } from "@/api/wallet"
import StatsCardSkeleton from "@/loaders/StatsCardSkeleton"
import { Button, Input } from "@mui/material"
import { useState } from "react"
import Modal from "@/app/components/modals/Modal"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { formatCurrency } from "@/lib"

type Inputs = {
  amount: number
  cnic: string
}

const Wallet = () => {
  const { data: walletStats, isLoading } = useGetWalletStats()

  console.log("new wallet stats: ", walletStats)

  const [formData, setFormData] = useState<Inputs | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ mode: "onChange" })

  const [showWithdrawModal, setShowWithdrawModal] = useState(false)

  const { mutate: postWithdraw } = usePostWalletWithdraw()

  const onSubmit = (data: Inputs) => {
    console.log("Withdraw Form Data:", data)
    const postData = { amount: Number(data.amount), cnic: data.cnic }
    postWithdraw(postData, {
      onSuccess: (data) => {
        toast.success('Withdraw req sent!')
      },
      onError: (error: any) => {
        toast.error(error.response?.data.message)
      }
    })
    setShowWithdrawModal(false)
    reset()
  }

  const handleWithdrawContinue = (data: Inputs) => {
    setFormData(data)
    setShowWithdrawModal(false)
    setShowConfirmModal(true)
  }

  const statsData = [
    {
      label: "Available Balance",
      value: formatCurrency(walletStats?.balance),
      bgColor: "bg-[#6F4FF2]",
    },
    {
      label: "Reserved Balance",
      value:  formatCurrency(walletStats?.reservedAmount),
      bgColor: "bg-[#50BB25]",
    },
    {
      label: "Team Earnings",
      value: formatCurrency(walletStats?.teamEarnings),
      bgColor: "bg-[#F9D62C]",
    },
    {
      label: "Investment Earnings",
      value: formatCurrency(walletStats?.investmentEarnings),
      bgColor: "bg-[#50BB25]",
    },
    {
      label: "Referral Earnings",
      value: formatCurrency(walletStats?.referralEarnings),
      bgColor: "bg-[#6F4FF2]",
    },
  ]
  type Data = {
    sr: number
    date: string
    amount: string
    fee: string
    netPayout: string
    method: string
    status: string
  }
  const dataSource = [
    {
      sr: 1,
      date: "1 min ago",
      amount: "Rs 1332",
      fee: "Rs 5",
      netPayout: "Rs 1327",
      method: "Easypaisa",
      status: "Approved",
    },
    {
      sr: 2,
      date: "1 min ago",
      amount: "Rs 1332",
      fee: "Rs 5",
      netPayout: "Rs 1327",
      method: "Easypaisa",
      status: "Pending",
    },
    {
      sr: 3,
      date: "1 min ago",
      amount: "Rs 1332",
      fee: "Rs 5",
      netPayout: "Rs 1327",
      method: "Easypaisa",
      status: "Rejected",
    },
  ]

  const columns: TableColumn<Data>[] = [
    {
      name: "ID",
      selector: (row) => row.sr,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Fee",
      selector: (row) => row.fee,
    },
    {
      name: "Net Payout",
      selector: (row) => row.netPayout,
    },
    {
      name: "Method",
      selector: (row) => row.method,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => <StatusBadge status={row.status} />,
    },
  ]

  const tabs = ["Credit", "Debit"]
  const router = useRouter()

  return (
    <div className='text-white py-5'>
      <div className='flex flex-col md:flex-row md:items-center justify-between'>
        <div className='text-xl mb-4 md:mb-0'>P2P Wallet</div>
        <div className='flex flex-col md:flex-row gap-2 md:items-center'>
          <div className='bg-[#2B2B2B] py-2 px-4 rounded'>
            Easypaisa account *******1234 is connected
          </div>
          <div className='flex gap-2'>
            <Button
              onClick={() => setShowWithdrawModal(true)}
              variant='outlined'
            >
              Withdraw Amount
            </Button>
            <PrimaryButton
              onClick={() => router.push("/user/wallet/add-new-wallet")}
              bgColor='#7367F0'
              className='!text-white !border-none !font-medium'
            >
              Add new Wallet
            </PrimaryButton>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-4 my-4'>
        {isLoading
          ? Array(5)
              .fill(0)
              .map((_, i) => <StatsCardSkeleton key={i} />)
          : statsData.map((stat, index) => (
              <StatsCard
                key={index}
                label={stat.label}
                value={stat.value ?? "N/A"}
                bgColor={stat.bgColor}
              />
            ))}
      </div>

      <DataTable data={dataSource} columns={columns} themeStyle='gray' />

      <Modal open={showWithdrawModal} setOpen={setShowWithdrawModal}>
        <form onSubmit={handleSubmit(handleWithdrawContinue)}>
          <div className='text-2xl font-medium'>Withdraw</div>
          <div className='bg-[#2B2B2B] p-4 rounded-lg mt-4 space-y-4'>
            {/* Amount */}
            <div className='space-y-2'>
              <label className='block'>Amount</label>
              <Input
                disableUnderline
                {...register("amount", { required: "Amount is required" })}
                className='!bg-[#161616] px-2 py-1 w-full rounded-md text-white'
                placeholder='Enter your Amount'
                type='number'
              />
              {errors.amount && (
                <p className='text-red-500 text-sm'>{errors.amount.message}</p>
              )}
            </div>

            {/* CNIC */}
            <div className='space-y-2'>
              <label className='block'>Destination CNIC</label>
              <Input
                disableUnderline
                {...register("cnic", { required: "CNIC is required" })}
                className='!bg-[#161616] px-2 py-1 w-full rounded-md text-white'
                placeholder='Enter your CNIC'
              />
              {errors.cnic && (
                <p className='text-red-500 text-sm'>{errors.cnic.message}</p>
              )}
            </div>
          </div>
          <Button type='submit' variant='contained' fullWidth className='!mt-4'>
            Next
          </Button>
        </form>
      </Modal>

      <Modal open={showConfirmModal} setOpen={setShowConfirmModal}>
        <div className='text-2xl font-medium'>Confirm Withdrawal</div>
        <div className='bg-[#2B2B2B] p-4 rounded-lg mt-4 space-y-4 text-white'>
          <div>
            <strong>Amount:</strong> {formData?.amount}
          </div>
          <div>
            <strong>CNIC:</strong> {formData?.cnic}
          </div>
          <div className='flex gap-2 mt-4'>
            <Button
              variant='outlined'
              fullWidth
              onClick={() => {
                setShowConfirmModal(false)
                setShowWithdrawModal(true) // go back
              }}
            >
              Back
            </Button>
            <Button
              variant='contained'
              fullWidth
              onClick={() => {
                if (formData) {
                  onSubmit(formData)
                  setShowConfirmModal(false)
                }
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Wallet

"use client"
import DataTable from "@/app/components/DataTable/DataTable"
import StatusBadge from "@/app/components/ui/StatusBadge"
import { Button, Typography } from "@mui/material"


const page = () => {
  const data = [
    {
      id: 1,
      withdrawAmount: "$20",
      withdrawFees: "$20",
      totalAmount: "$20",
      withdrawWallet: "Easypaisa",
      withdrawId: "214142",
      status: "Completed",
      withdrawDate: '04/22/2016'
    },
    {
      id: 2,
      withdrawAmount: "$20",
      withdrawFees: "$20",
      totalAmount: "$20",
      withdrawWallet: "Easypaisa",
      withdrawId: "214142",
      status: "Pending",
      withdrawDate: '04/22/2016'
    },
    {
      id: 3,
      withdrawAmount: "$20",
      withdrawFees: "$20",
      totalAmount: "$20",
      withdrawWallet: "Easypaisa",
      withdrawId: "214142",
      status: "Declined",
      withdrawDate: '04/22/2016'
    },
  ]

  const columns = [
    {
      name: "Withdraw Amount",
      selector: (row: any) => row.withdrawAmount,
      sortable: true,
    },
    {
      name: "Withdraw Fees",
      selector: (row: any) => row.withdrawFees,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row: any) => row.totalAmount,
      sortable: true,
    },
    {
      name: "Withdraw Wallet",
      selector: (row: any) => row.withdrawWallet,
      sortable: true,
    },
    {
      name: "Withdraw id",
      selector: (row: any) => row.withdrawId,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
      sortable: true,
      cell: (row: any) => <StatusBadge status={row.status} />,
    },
    {
      name: "Withdraw date",
      selector: (row: any) => row.withdrawDate,
      sortable: true,
    },
  ]
  return (
    <div>
      <div className='text-white text-lg mt-2'>Withdraw Amount</div>
      <div className='bg-[#161616] p-4 rounded-lg my-4 flex gap-4 items-center'>
        <div className='space-y-2 flex-1'>
          <label htmlFor='withdrawAmount' className='block text-white text-sm'>
          Withdraw Amount
          </label>
          <input
            type='text'
            className='bg-[#262626] placeholder:text-white rounded px-4 py-2 w-full'
            placeholder='Enter Your Price'
          />
        </div>
        <div className='space-y-2 flex-1'>
          <label htmlFor='walletName' className='block text-white text-sm'>
            Wallet Name
          </label>
          <input
            type='text'
            className='bg-[#262626] placeholder:text-white rounded px-4 py-2 w-full'
            placeholder='Enter Your Price'
          />
        </div>

        <div className="self-end"><Button variant="contained">Withdraw</Button></div>
      </div>
      <DataTable data={data} columns={columns} themeStyle='black' />
    </div>
  )
}

export default page

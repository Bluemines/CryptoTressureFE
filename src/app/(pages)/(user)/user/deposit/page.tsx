"use client"
import { useState, useEffect } from "react"
import { Button } from "@mui/material"
import DataTable from "@/app/components/DataTable/DataTable"
import StatusBadge from "@/app/components/ui/StatusBadge"

type Deposit = {
  id: number
  packageName: string
  depositPrice: string
  depositId: number
  status: "Success" | "Failed" | "Pending"
  depositDate: string
}

const Page = () => {
  const [pkrAmount, setPkrAmount] = useState("")
  const [convertedUSD, setConvertedUSD] = useState<string | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!pkrAmount || isNaN(Number(pkrAmount))) return setConvertedUSD(null)
      convertPKRtoUSD(Number(pkrAmount))
    }, 500)

    return () => clearTimeout(timeout)
  }, [pkrAmount])

  async function convertPKRtoUSD(pkrAmount: number) {
    const apiUrl =
      "https://api.exchangeratesapi.io/v1/latest?access_key=28efabef496f650d981f930739aa25e2"

    try {
      const response = await fetch(apiUrl)
      const data = await response.json()

      if (!data.success) {
        throw new Error("API response was not successful")
      }

      const eurToUsd = data.rates["USD"]
      const eurToPkr = data.rates["PKR"]
      const pkrToUsdRate = eurToUsd / eurToPkr
      const usdAmount = pkrAmount * pkrToUsdRate

      setConvertedUSD(usdAmount.toFixed(2))
    } catch (error: any) {
      console.error("Error converting currency:", error.message || error)
    }
  }

  const data: Deposit[] = [
    {
      id: 1,
      packageName: "Level One",
      depositPrice: "$20",
      depositId: 2414142,
      status: "Success",
      depositDate: "04/22/2016",
    },
    // Add more if needed...
  ]

  const columns = [
    {
      name: "Package Name",
      selector: (row: Deposit) => row.packageName,
      sortable: true,
    },
    {
      name: "Deposit Price",
      selector: (row: Deposit) => row.depositPrice,
      sortable: true,
    },
    {
      name: "Deposit id",
      selector: (row: Deposit) => row.depositId,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: Deposit) => row.status,
      sortable: true,
      cell: (row: Deposit) => <StatusBadge status={row.status} />,
    },
    {
      name: "Deposit Date",
      selector: (row: Deposit) => row.depositDate,
      sortable: true,
    },
  ]

  return (
    <div>
      <div className='text-white text-lg mt-2'>Deposit</div>

      <div className='bg-[#161616] p-4 rounded-lg my-4 flex flex-col md:flex-row gap-4 md:items-center'>
        <div className='space-y-2 flex-1'>
          <label htmlFor='depositAmount' className='block text-white text-sm'>
            Deposit Amount
          </label>
          <input
            type='text'
            value={pkrAmount}
            onChange={(e) => setPkrAmount(e.target.value)}
            className='bg-[#262626] placeholder:text-white rounded px-4 py-2 w-full'
            placeholder='Enter PKR Amount'
          />
        </div>

        <div className='flex-[0.5] self-end'>
          <label htmlFor='depositAmount' className='block text-white text-sm'>
            Converted Value to USD
          </label>
          <input
            type='text'
            value={convertedUSD ? "$" + convertedUSD : "Converted USD"}
            disabled
            className='bg-[#262626] placeholder:text-white rounded px-4 py-2 w-full'
            placeholder='Enter PKR Amount'
          />
        </div>

        <div className='space-y-2 flex-1'>
          <label htmlFor='walletName' className='block text-white text-sm'>
            Wallet Name
          </label>
          <input
            type='text'
            className='bg-[#262626] placeholder:text-white rounded px-4 py-2 w-full'
            placeholder='Enter Wallet Name'
          />
        </div>

        <div className='self-end'>
          <Button variant='contained'>Deposit</Button>
        </div>
      </div>

      <DataTable data={data} columns={columns} themeStyle='black' />
    </div>
  )
}

export default Page

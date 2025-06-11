"use client"

import DataTable from "@/app/components/DataTable/DataTable"
import TableSkeleton from "@/loaders/TableSkeleton"
import { useState, useEffect } from "react"
import { TableColumn } from "react-data-table-component"

type TeamBonus = {
  date: string
  userId: string
  level: number
  bonusType: string
  amount: number
  note: string
}

const columns: TableColumn<TeamBonus>[] = [
  { name: "Date", selector: (row) => row.date, sortable: true },
  { name: "Downline User ID", selector: (row) => row.userId, sortable: true },
  { name: "Level", selector: (row) => `Level ${row.level}`, sortable: true },
  { name: "Bonus Type", selector: (row) => row.bonusType, sortable: true },
  {
    name: "Amount",
    selector: (row) => `$${row.amount.toFixed(2)}`,
    sortable: true,
    right: true,
  },
  { name: "Note", selector: (row) => row.note },
]

const dummyData: TeamBonus[] = [
  {
    date: "2025-06-01",
    userId: "USR001",
    level: 1,
    bonusType: "Referral Bonus",
    amount: 50,
    note: "Direct referral",
  },
  {
    date: "2025-06-03",
    userId: "USR045",
    level: 2,
    bonusType: "Team Growth Bonus",
    amount: 30,
    note: "Level 2 downline activity",
  },
  {
    date: "2025-06-05",
    userId: "USR023",
    level: 3,
    bonusType: "Deposit Bonus",
    amount: 20,
    note: "Triggered by deposit",
  },
]

const Page = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-semibold mb-4 text-white'>Team Bonus Summary</h2>
      {isLoading ? (
        <TableSkeleton rows={5} cols={6} />
      ) : (
        <DataTable
          columns={columns}
          data={dummyData}
          pagination
          highlightOnHover
          responsive
        />
      )}
    </div>
  )
}

export default Page

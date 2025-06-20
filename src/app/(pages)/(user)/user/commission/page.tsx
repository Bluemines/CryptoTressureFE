"use client"

import DataTable from "@/app/components/DataTable/DataTable"
import TableSkeleton from "@/loaders/TableSkeleton"
import { useState, useEffect } from "react"
import { TableColumn } from "react-data-table-component"

type TeamBonusSummary = {
  level: number
  bonusType: string
  downlineCount: number
  earningsToday: number
  totalEarnings: number
}

const columns: TableColumn<TeamBonusSummary>[] = [
  {
    name: "Level",
    selector: (row) => `Level ${row.level}`,
    sortable: true,
  },
  {
    name: "Bonus Type",
    selector: (row) => row.bonusType,
    sortable: true,
  },
  {
    name: "Downlines",
    selector: (row) => row.downlineCount.toString(),
    sortable: true,
  },
  {
    name: "Earnings Today",
    selector: (row) => `$${row.earningsToday.toFixed(2)}`,
    sortable: true,
    right: true,
  },
  {
    name: "Total Earnings",
    selector: (row) => `$${row.totalEarnings.toFixed(2)}`,
    sortable: true,
    right: true,
  },
]

const dummyData: TeamBonusSummary[] = [
  {
    level: 1,
    bonusType: "Referral Bonus",
    downlineCount: 5,
    earningsToday: 25.0,
    totalEarnings: 120.0,
  },
  {
    level: 2,
    bonusType: "Team Growth Bonus",
    downlineCount: 12,
    earningsToday: 18.5,
    totalEarnings: 250.0,
  },
  {
    level: 3,
    bonusType: "Deposit Bonus",
    downlineCount: 8,
    earningsToday: 10.0,
    totalEarnings: 145.0,
  },
]

const page = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-semibold mb-4 text-white'>Team Bonus Summary</h2>
      {isLoading ? (
        <TableSkeleton rows={5} cols={5} />
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

export default page

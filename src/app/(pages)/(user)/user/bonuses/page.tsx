"use client"

import { useGetBonuses } from "@/api/user/useUser"
import DataTable from "@/app/components/DataTable/DataTable"
import TableSkeleton from "@/loaders/TableSkeleton"
import { TableColumn } from "react-data-table-component"

type Bonus = {
  date: string
  type: string
  amount: number
  note: string
}

const columns: TableColumn<Bonus>[] = [
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => `$${row.amount.toFixed(2)}`,
    sortable: true,
    right: true,
  },
  {
    name: "Note",
    selector: (row) => row.note,
  },
]

const mapBonusType = (type: string) => {
  switch (type) {
    case "REFERRAL":
      return "Referral Bonus"
    case "FIRST_DEPOSIT":
      return "First Deposit Bonus"
    default:
      return type
  }
}

const Page = () => {
  const { data, isLoading } = useGetBonuses()
  const bonuses = data?.data || []

  const formattedBonuses: Bonus[] = bonuses.map((bonus: any) => ({
    date: new Date(bonus.createdAt).toLocaleDateString(),
    type: mapBonusType(bonus.type),
    amount: parseFloat(bonus.amount),
    note: bonus.note,
  }))

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-semibold mb-4 text-white'>Bonuses</h2>
      {isLoading ? (
        <TableSkeleton rows={5} cols={4} />
      ) : (
        <DataTable
          columns={columns}
          data={formattedBonuses}
          pagination
          highlightOnHover
          responsive
        />
      )}
    </div>
  )
}

export default Page

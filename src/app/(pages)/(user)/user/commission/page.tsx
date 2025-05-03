"use client"
import DataTable from "@/app/components/DataTable/DataTable"

const page = () => {
  const data = [
    {
      id: 1,
      percentage: "10%",
      amount: "$5",
      date: "04/22/2016",
    },
    {
      id: 2,
      amount: "$5",
      percentage: "10%",
      date: "04/22/2016",
    },
    {
      id: 3,
      amount: "$5",
      percentage: "10%",
      date: "04/22/2016",
    },
  ]

  const columns = [
    {
      name: "Commission Percentage",
      selector: (row: any) => row.percentage,
      sortable: true,
    },
    {
      name: "Commission Amount",
      selector: (row: any) => row.amount,
      sortable: true,
    },
    {
      name: "Commission Date",
      selector: (row: any) => row.date,
      sortable: true,
    },
  ]
  return (
    <div>
      <div className='text-[#C0C0C0] text-xl my-4'>Referral Commission</div>
      <DataTable data={data} columns={columns} themeStyle='black' />
    </div>
  )
}

export default page

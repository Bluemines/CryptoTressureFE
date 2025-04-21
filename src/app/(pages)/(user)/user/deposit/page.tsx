"use client"
import DataTable from "@/app/components/DataTable/DataTable"

const page = () => {
  const data = [
    { id: 1, packageName: "Level One", depositPrice: '$20', depositId: 2414142, status: 'Success', depositDate: '04/22/2016',  },
    { id: 2, packageName: "Level One", depositPrice: '$20', depositId: 2414142, status: 'Success', depositDate: '04/22/2016',  },
    { id: 3, packageName: "Level One", depositPrice: '$20', depositId: 2414142, status: 'Success', depositDate: '04/22/2016',  },
    { id: 4, packageName: "Level One", depositPrice: '$20', depositId: 2414142, status: 'Success', depositDate: '04/22/2016',  },
    { id: 5, packageName: "Level One", depositPrice: '$20', depositId: 2414142, status: 'Success', depositDate: '04/22/2016',  },
  ]

  const columns = [
    {
      name: "Package Name",
      selector: (row: any) => row.packageName,
      sortable: true,
    },
    {
      name: "Deposit Price",
      selector: (row: any) => row.depositPrice,
      sortable: true,
    },
    {
      name: "Deposit id",
      selector: (row: any) => row.depositId,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
      sortable: true,
    },
    {
      name: "Deposit Date",
      selector: (row: any) => row.depositDate,
      sortable: true,
    },
  ]
  return (
    <div>
      <DataTable data={data} columns={columns} themeStyle='black' />
    </div>
  )
}

export default page

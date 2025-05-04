"use client";
import DataTable from "@/app/components/DataTable/DataTable";
import { TableColumn } from "react-data-table-component";

type CommissionRow = {
  id: number;
  percentage: string;
  amount: string;
  date: string;
};

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
  ];

  const columns: TableColumn<CommissionRow>[] = [
    {
      name: "Commission Percentage",
      selector: (row) => row.percentage,
      sortable: true,
    },
    {
      name: "Commission Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Commission Date",
      selector: (row) => row.date,
      sortable: true,
    },
  ];
  return (
    <div>
      <div className="text-[#C0C0C0] text-xl my-4">Referral Commission</div>
      <DataTable data={data} columns={columns} themeStyle="black" />
    </div>
  );
};

export default page;

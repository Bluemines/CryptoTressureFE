'use client';
import DataTable from "@/app/components/DataTable/DataTable";
import { TableColumn } from "react-data-table-component";

type CommissionRow = {
  id: number;
  percentage: string;
  amount: string;
  date: string;
};

const page = () => {
  // No dynamic data yet, so the table will be empty
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
      {/* Display empty table until dynamic data is integrated */}
      <DataTable
        data={[]}  // Empty data for now
        columns={columns}
        themeStyle="black"
      />
    </div>
  );
};

export default page;

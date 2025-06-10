'use client';

import DataTable from "@/app/components/DataTable/DataTable";
import { TableColumn } from 'react-data-table-component';

type Bonus = {
  date: string;
  type: string;
  amount: number;
  note: string;
};

const mockBonuses: Bonus[] = [
  {
    date: "2025-06-01",
    type: "Referral Bonus",
    amount: 25,
    note: "Bonus for referring John Doe",
  },
  {
    date: "2025-05-15",
    type: "Signup Bonus",
    amount: 10,
    note: "First-time signup reward",
  },
  {
    date: "2025-05-20",
    type: "Milestone Bonus",
    amount: 50,
    note: "Achieved 100 deposits",
  },
  {
    date: "2025-04-30",
    type: "Cashback Bonus",
    amount: 5,
    note: "5% cashback on trading volume",
  },
];

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
];

const Page = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-white">Bonuses</h2>
      <DataTable
        columns={columns}
        data={mockBonuses}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default Page;

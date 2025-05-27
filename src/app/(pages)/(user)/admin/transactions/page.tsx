'use client';

import { useListUserTransaction } from '@/api/admin/useAdmin';
import DataTable from 'react-data-table-component';
import StatusBadge from '@/app/components/ui/StatusBadge'; // Optional: if you want styled status display

type Transaction = {
  id: number;
  transactiontype: 'DEPOSIT' | 'WITHDRAWAL' | 'PURCHASED';
  amount: number;
  date: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  user: {
    id: number;
    email: string;
  };
};

const columns = [
    {
    name: 'User Email',
    selector: (row: Transaction) => row.user.email,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: (row: Transaction) => row.amount,
    sortable: true,
  },
  {
    name: 'Transaction Type',
    selector: (row: Transaction) => row.transactiontype,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row: Transaction) => row.status,
    cell: (row: Transaction) => <StatusBadge status={row.status} />, // Optional: show badge
    sortable: true,
  },
  {
    name: 'Date',
    selector: (row: Transaction) => new Date(row.date).toLocaleString(),
    sortable: true,
  },
];

const customTableStyles = {
  rows: {
    style: {
      backgroundColor: '#1e1e1e',
      color: 'white',
      minHeight: '56px',
    },
  },
  headCells: {
    style: {
      backgroundColor: '#2c2c2c',
      color: '#00bcd4',
      fontWeight: 'bold',
      fontSize: '14px',
    },
  },
  pagination: {
    style: {
      backgroundColor: '#1e1e1e',
      color: 'white',
    },
  },
};

export default function TransactionHistoryTable() {
  const { data, isLoading, isError, error } = useListUserTransaction();

  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading transactions...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load transactions: {(error as any)?.message || 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold text-white mb-4">Transaction History</h3>
        <DataTable
          columns={columns}
          data={Array.isArray(data?.data?.items) ? data.data.items : []}
          customStyles={customTableStyles}
          pagination
          highlightOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}

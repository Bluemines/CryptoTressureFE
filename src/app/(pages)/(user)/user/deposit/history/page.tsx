'use client';

import { usegetDepositHistory } from '@/api/user/useUser';
import DataTable from 'react-data-table-component';
import StatusBadge from '@/app/components/ui/StatusBadge';

type Deposit = {
  id: number;
  amount: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  provider: string;
  createdAt: string;
  reference: string;
  user: {
    email: string;
    username: string;
  };
};

const columns = [
  {
    name: 'Email',
    selector: (row: Deposit) => row.user.email,
    sortable: true,
  },
  {
    name: 'Username',
    selector: (row: Deposit) => row.user.username,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: (row: Deposit) => row.amount,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row: Deposit) => row.status,
    cell: (row: Deposit) => <StatusBadge status={row.status} />,
    sortable: true,
  },
  {
    name: 'Reference',
    selector: (row: Deposit) => row.reference,
    sortable: true,
  },
  {
    name: 'Date',
    selector: (row: Deposit) => new Date(row.createdAt).toLocaleString(),
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

export default function DepositHistoryPage() {
  const { data, isLoading, isError, error } = usegetDepositHistory();

  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading deposit history...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load deposits: {(error as any)?.message || 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold text-white mb-4">Deposit History</h3>
        <DataTable
          columns={columns}
          data={data?.data || []}
          customStyles={customTableStyles}
          pagination
          highlightOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}

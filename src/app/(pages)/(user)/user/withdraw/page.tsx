"use client";
import { useGetWithdrawHistory } from "@/api/wallet";
import DataTable from "@/app/components/DataTable/DataTable";
import StatusBadge from "@/app/components/ui/StatusBadge";
import { TableColumn } from "react-data-table-component";
import { format } from "date-fns";

type Data = {
  id: number;
  withdrawAmount: string;
  withdrawFees: string;
  totalAmount: string;
  withdrawWallet: string;
  withdrawId: string;
  status: string;
  withdrawDate: string;
};

const Withdraw = () => {
  const { data: withdrawHistory } = useGetWithdrawHistory();

  const rows: Data[] = (withdrawHistory ?? []).map((item: any) => ({
    id: item.id,
    withdrawAmount: `$${item.amount}`,
    withdrawFees: `$${item.fee}`,
    totalAmount: `$${item.total}`,
    withdrawWallet: item.msisdn ? item.msisdn : "—", // Or show actual wallet name if available
    withdrawId: item.externalId ? item.externalId : `#${item.id}`,
    status: item.status.charAt(0) + item.status.slice(1).toLowerCase(), // "PENDING" → "Pending"
    withdrawDate: format(new Date(item.date), "MM/dd/yyyy hh:mm a"),
  }));

  const columns: TableColumn<Data>[] = [
    {
      name: "Withdraw Amount",
      selector: (row) => row.withdrawAmount,
      sortable: true,
    },
    {
      name: "Withdraw Fees",
      selector: (row) => row.withdrawFees,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) => row.totalAmount,
      sortable: true,
    },
    {
      name: "Withdraw Wallet",
      selector: (row) => row.withdrawWallet,
      sortable: true,
    },
    {
      name: "Withdraw ID",
      selector: (row) => row.withdrawId,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      name: "Withdraw Date",
      selector: (row) => row.withdrawDate,
      sortable: true,
    },
  ];

  return (
    <div>
      <div className="text-white text-lg mt-2 mb-4">Withdraw History</div>
      <DataTable data={rows} columns={columns} themeStyle="black" />
    </div>
  );
};

export default Withdraw;

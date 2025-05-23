"use client";
import DataTable from "@/app/components/DataTable/DataTable";
import StatusBadge from "@/app/components/ui/StatusBadge";
import { Button } from "@mui/material";

type Deposit = {
  id: number;
  packageName: string;
  depositPrice: string; // e.g., "$20"
  depositId: number;
  status: "Success" | "Failed" | "Pending"; // tighten enum if possible
  depositDate: string; // e.g., "04/22/2016"
};
const page = () => {
  const data: Deposit[] = [
    {
      id: 1,
      packageName: "Level One",
      depositPrice: "$20",
      depositId: 2414142,
      status: "Success",
      depositDate: "04/22/2016",
    },
    {
      id: 2,
      packageName: "Level One",
      depositPrice: "$20",
      depositId: 2414142,
      status: "Success",
      depositDate: "04/22/2016",
    },
    {
      id: 3,
      packageName: "Level One",
      depositPrice: "$20",
      depositId: 2414142,
      status: "Success",
      depositDate: "04/22/2016",
    },
    {
      id: 4,
      packageName: "Level One",
      depositPrice: "$20",
      depositId: 2414142,
      status: "Success",
      depositDate: "04/22/2016",
    },
    {
      id: 5,
      packageName: "Level One",
      depositPrice: "$20",
      depositId: 2414142,
      status: "Success",
      depositDate: "04/22/2016",
    },
  ];

  const columns = [
    {
      name: "Package Name",
      selector: (row: Deposit) => row.packageName,
      sortable: true,
    },
    {
      name: "Deposit Price",
      selector: (row: Deposit) => row.depositPrice,
      sortable: true,
    },
    {
      name: "Deposit id",
      selector: (row: Deposit) => row.depositId,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: Deposit) => row.status,
      sortable: true,
      cell: (row: Deposit) => <StatusBadge status={row.status} />,
    },
    {
      name: "Deposit Date",
      selector: (row: Deposit) => row.depositDate,
      sortable: true,
    },
  ];
  return (
    <div>
      <div className="text-white text-lg mt-2">Deposit</div>
      <div className="bg-[#161616] p-4 rounded-lg my-4 flex flex-col md:flex-row gap-4 md:items-center">
        <div className="space-y-2 flex-1">
          <label htmlFor="depositAmount" className="block text-white text-sm">
            Deposit Amount
          </label>
          <input
            type="text"
            className="bg-[#262626] placeholder:text-white rounded px-4 py-2 w-full"
            placeholder="Enter Your Price"
          />
        </div>
        <div className="space-y-2 flex-1">
          <label htmlFor="walletName" className="block text-white text-sm">
            Wallet Name
          </label>
          <input
            type="text"
            className="bg-[#262626] placeholder:text-white rounded px-4 py-2 w-full"
            placeholder="Enter Your Price"
          />
        </div>

        <div className="self-end">
          <Button variant="contained">Deposit</Button>
        </div>
      </div>
      <DataTable data={data} columns={columns} themeStyle="black" />
    </div>
  );
};

export default page;

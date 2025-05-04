"use client";
import DataTable from "@/app/components/DataTable/DataTable";
import { Button } from "@mui/material";
import { TableColumn } from "react-data-table-component";

type Data = {
  id: number;
  userName: string;
  email: string;
  date: string;
};
const page = () => {
  const data = [
    {
      id: 1,
      userName: "John Doe",
      email: "xyz@example.com",
      date: "04/22/2016",
    },
    {
      id: 2,
      userName: "John Doe",
      email: "xyz@example.com",
      date: "04/22/2016",
    },
    {
      id: 3,
      userName: "John Doe",
      email: "xyz@example.com",
      date: "04/22/2016",
    },
  ];

  const columns:TableColumn<Data>[] = [
    {
      name: "User Name",
      selector: (row) => row.userName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Account Created Date",
      selector: (row) => row.date,
      sortable: true,
    },
  ];
  return (
    <div>
      <div className="text-lg mt-2">Invite your friends</div>
      <div>
        Invite your friends and get rewarded! You'll receive a 10% bonus on
        every user you refer. Start sharing now and watch your earnings 🚀💰
      </div>
      <div className="bg-[#161616] p-4 rounded-lg my-4 flex gap-4 items-center">
        <div className="space-y-2 flex-1">
          <input
            type="text"
            className="bg-[#262626] placeholder:text-white rounded px-4 py-2 w-full"
            placeholder="https://www.treasure.org/register?referral_code=00e54ae3-440e-4c6e-9fc5-40f101b7f84f"
          />
        </div>

        <div className="self-end">
          <Button variant="contained">Invite</Button>
        </div>
      </div>
      <div className="text-[#C0C0C0] text-xl">Referral History</div>
      <DataTable data={data} columns={columns} themeStyle="black" />
    </div>
  );
};

export default page;

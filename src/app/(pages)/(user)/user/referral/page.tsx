'use client';

import { useGetReferralLink, useGetReferralTree } from "@/api/user/useUser";
import DataTable from "@/app/components/DataTable/DataTable";
import { authStore } from "@/store/authStore";
import { Button } from "@mui/material";
import { format } from "date-fns";
import { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";

type Data = {
  id: number;
  userName: string;
  email: string;
  date: string;
  commissionAmount: number;
};

const Page = () => {
  const { data: referralLink } = useGetReferralLink();
  const { user } = authStore();
  const { data: referralTree } = useGetReferralTree();

  const handleCopy = () => {
    if (referralLink?.link) {
      navigator.clipboard.writeText(referralLink.link);
      toast.success("Referral link copied to clipboard!");
    }
  };

  const flattenTree = (node: any, list: Data[] = []): Data[] => {
    if (!node) return list;

    // Skip the root user (it's already added manually)
    if (node.level > 0) {
      list.push({
        id: node.userId || Math.random(), // fallback ID
        userName: `${node.username} (level ${node.level})`,
        email: node.email || "—",
        date: format(new Date(node.joinedAt), "yyyy-MM-dd HH:mm"),
        commissionAmount: 0, // Add real commission if available
      });
    }

    if (node.children && node.children.length > 0) {
      node.children.forEach((child: any) => flattenTree(child, list));
    }

    return list;
  };

  const rootUser: Data = {
    id: user?.id || 0,
    userName: user?.username + " (root user)" || "",
    email: user?.email || "",
    date: format(new Date(user?.createdAt || new Date()), "yyyy-MM-dd HH:mm"),
    commissionAmount: 0,
  };

  const flattenedChildren: Data[] = flattenTree(referralTree);
  const tableData: Data[] = [rootUser, ...flattenedChildren];

  const columns: TableColumn<Data>[] = [
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
    {
      name: "Commission Amount",
      selector: (row) => row.commissionAmount.toFixed(2),
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

      <div className="bg-[#161616] p-4 rounded-lg my-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1">
          <input
            value={referralLink?.link}
            type="text"
            className="bg-[#262626] placeholder:text-white rounded px-4 py-2 w-full"
            placeholder="https://www.treasure.org/register?referral_code=..."
            readOnly
          />
        </div>
        <div className="self-end">
          <Button variant="contained" onClick={handleCopy}>Invite</Button>
        </div>
      </div>

      <div className="text-[#C0C0C0] text-xl">Referral History</div>
      <DataTable data={tableData} columns={columns} themeStyle="black" />
    </div>
  );
};

export default Page;

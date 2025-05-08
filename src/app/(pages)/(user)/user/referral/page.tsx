"use client";
import { useGetReferralHistory, useGetReferralLink } from "@/api/user/useUser";
import DataTable from "@/app/components/DataTable/DataTable";
import { Button } from "@mui/material";
import { format } from "date-fns";
import { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";

type Data = {
  id: number;
  userName: string;
  email: string;
  date: string;
  commissionAmount: number
};
const page = () => {

  const { data: referralHistory, isLoading } = useGetReferralHistory()
  const { data: referralLink, isLoading: isRefLinkLoading } = useGetReferralLink()

  const transformedData: Data[] = referralHistory?.map((ref: any) => ({
    id: ref.id,
    userName: ref.username,
    email: ref.email,
    date: format(new Date(ref.joinedDate), "yyyy-MM-dd HH:mm"),
    status: ref.status,
    commissionAmount: ref.earnedCommissions
  }));

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
    {
      name: "Commission Amount",
      selector: (row) => row.commissionAmount,
      sortable: true,
    },
  ];

  const handleCopy = () => {
    if (referralLink?.link) {
      navigator.clipboard.writeText(referralLink.link);
      toast.success("Referral link copied to clipboard!");
    }
  };

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
            value={referralLink?.link}
            type="text"
            className="bg-[#262626] placeholder:text-white rounded px-4 py-2 w-full"
            placeholder="https://www.treasure.org/register?referral_code=00e54ae3-440e-4c6e-9fc5-40f101b7f84f"
          />
        </div>

        <div className="self-end">
          <Button variant="contained" onClick={handleCopy}>Invite</Button>
        </div>
      </div>
      <div className="text-[#C0C0C0] text-xl">Referral History</div>
      <DataTable data={transformedData} columns={columns} themeStyle="black" />
    </div>
  );
};

export default page;

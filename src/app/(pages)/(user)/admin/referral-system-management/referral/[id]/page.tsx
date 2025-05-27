"use client";

import { useParams } from "next/navigation";
import { useReferralDataById } from "@/api/admin/useAdmin";
import { format } from "date-fns";
import AdminTable from "@/app/components/ui/tables/AdminTable";

const ReferralDetailPage = () => {
  const params = useParams();
  const id = Number(params.id);

  if (!id || isNaN(id)) {
    return <div className="text-red-500">Invalid referral ID.</div>;
  }

  const { data, isLoading, error } = useReferralDataById(id);

  if (isLoading) return <div className="text-white">Loading referral data...</div>;
  if (error) return <div className="text-red-500">Error loading referral data.</div>;

  const columns = [
    { id: "name", label: "User" },
    { id: "email", label: "Email" },
    { id: "level", label: "Level" },
    { id: "date", label: "Date Joined" },
    { id: "rewardAmount", label: "Reward Amount" },
    { id: "status", label: "Status" },
  ];

  const tableData = data.map((item: any) => ({
    id: item.referredId,
    name: item.username,
    email: item.email,
    level: item.level,
    date: format(new Date(item.joinedAt), "yyyy-MM-dd HH:mm"),
    rewardAmount: "$0",
    status: "Success",
  }));

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-semibold mb-4">Referral Details for ID: {id}</h1>
      <AdminTable
        showHeader
        showButton={false}
        data={tableData}
        columns={columns}
        actions={false}
        onClick={() => {}}
      />
    </div>
  );
};

export default ReferralDetailPage;

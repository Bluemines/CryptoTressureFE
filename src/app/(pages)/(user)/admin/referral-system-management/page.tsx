"use client";
import { useRouter } from "next/navigation";
import AdminTable from "@/app/components/ui/tables/AdminTable";
import { format } from "date-fns";
import { useReferralsData } from "@/api/admin/useAdmin";

const ReferalManagement = () => {
  const router = useRouter();
  const { data, isLoading } = useReferralsData();

  const handleView = (id: number) => {
    router.push(`/admin/referral-system-management/referral/${id}`);
  };

  const columns = [
    { id: "name", label: "User" },
    { id: "email", label: "Email" },
    { id: "level", label: "Level" },
    { id: "date", label: "Date Joined" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ];

  const tableData = data?.data?.map((item: any) => ({
    id: item.referredId,
    name: item.username,
    email: item.email,
    level: item.level,
    date: format(new Date(item.joinedAt), "yyyy-MM-dd HH:mm"),
    status: "Success",
    action: (
      <button
        onClick={() => handleView(item.referralId)}
        className="text-blue-400 hover:underline"
      >
        View More
      </button>
    ),
  })) || [];

  return (
    <div className="p-4 md:p-6 text-white">
      <h1 className="text-2xl font-semibold mb-4">Referral System Management</h1>

      {isLoading ? (
        <p className="text-gray-300">Loading...</p>
      ) : (
        <AdminTable
          showHeader
          showButton={false}
          data={tableData}
          columns={columns}
          actions={false}
          onClick={() => {}}
        />
      )}
    </div>
  );
};

export default ReferalManagement;

"use client"
import AdminTable from "@/app/components/ui/tables/AdminTable";
import { useRouter } from "next/navigation";

const ReferalManagement = () => {
  const router = useRouter()
  const columns = [
    { id: "name", label: "User" },
    { id: "email", label: "Email" },
    { id: "level", label: "Level" },
    { id: "date", label: "Date" },
    { id: "rewardAmount", label: "Reward Amount" },
    { id: "status", label: "Status" },
  ];

  const data = [
    {
      id: 1,
      name: "John Bushmill",
      email: "Johnb@mail.com",
      level: 2,
      date: "1 min ago",
      rewardAmount: "$1000",
      status: "Failed",
    },
    {
      id: 2,
      name: "John Bushmill",
      email: "Johnb@mail.com",
      level: 2,
      date: "1 min ago",
      rewardAmount: "$1000",
      status: "Success",
    },
    {
      id: 3,
      name: "John Bushmill",
      email: "Johnb@mail.com",
      level: 2,
      date: "1 min ago",
      rewardAmount: "$1000",
      status: "Success",
    },

    // Add more entries...
  ];

  return (
    <div>
      <div className='font-semibold text-xl my-3'>Referral System Management</div>
      <AdminTable onClick={()=>router.push("referral-system-management/commission-levels")} showHeader buttonText="Manage Commission Level" data={data} columns={columns} actions={false} />
    </div>
  )
}

export default ReferalManagement
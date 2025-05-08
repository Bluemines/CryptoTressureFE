"use client";
import AdminTable from "@/app/components/ui/tables/AdminTable";
import useRewards from "./hooks";

const page = () => {
  const columns = [
    { id: "userName", label: "User" },
    { id: "userEmail", label: "Email" },
    { id: "createdAt", label: "Date" },
    { id: "reward", label: "Reward Amount" },
    { id: "status", label: "Status" },
  ];
  const { rewards } = useRewards();
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
      <div className="font-semibold text-xl my-3">Rewards Distribution</div>
      {rewards.length > 0 ? (
        <AdminTable
          showHeader={true}
          buttonText="Distribute Awards Manually"
          data={rewards}
          columns={columns}
          actions={false}
        />
      ) : (
        <div className="text-xl text-white font-bold text-center">
          Loading...
        </div>
      )}
    </div>
  );
};

export default page;

"use client";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import DistributeRewardsDrawer from "@/app/components/drawers/DistributeRewardsDrawer";
import TableDisplay from "@/app/components/ui/tables/TableDisplay";
import { authStore } from "@/store/authStore";
import AdminTable from "@/app/components/ui/tables/AdminTable";
import useRewards from "./hooks";

export type Column<T> = {
  id: keyof T;
  label: string;
  isStatus?: boolean;
};

const page = () => {
  const columns = [
    { id: "userName", label: "User" },
    { id: "userEmail", label: "Email" },
    { id: "createdAt", label: "Date" },
    { id: "reward", label: "Reward Amount" },
    { id: "status", label: "Status" },
  ];
  const { rewards } = useRewards();
  const [open, setOpen] = useState(false);

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
          onClick={() => setOpen(true)}
          titlePage="rewards"
        />
      ) : (
        <div className="text-xl text-white font-bold text-center">
          Loading...
        </div>
      )}
      <DistributeRewardsDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default page;

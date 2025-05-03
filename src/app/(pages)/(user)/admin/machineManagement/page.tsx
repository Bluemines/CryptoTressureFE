"use client";

import AddMachineDrawer from "@/app/components/drawers/AddMachineDrawer";
import AdminTable from "@/app/components/ui/tables/AdminTable";
import { Typography } from "@mui/material";
import { useState } from "react";

export default function page() {
  const columns = [
    { id: "name", label: "User" },
    { id: "rentDays", label: "Rent Days" },
    { id: "price", label: "Price" },
  ];

  const data = [
    {
      id: 1,
      name: "John Bushmill",
      rentDays: 2,
      price: 200,
    },
    {
      id: 2,
      name: "John Bushmill",
      rentDays: 2,
      price: 200,
    },
    {
      id: 3,
      name: "John Bushmill",
      rentDays: 2,
      price: 200,
    },
    {
      id: 4,
      name: "John Bushmill",
      rentDays: 2,
      price: 200,
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Typography sx={{ fontWeight: "bold", color: "white", fontSize: 24 }}>
          Machine Management
        </Typography>
        <main className="mt-10">
          <AdminTable
            buttonText="Add machine"
            showHeader={true}
            columns={columns}
            data={data}
            onClick={() => setOpen(true)}
          />
          <AddMachineDrawer open={open} onClose={() => setOpen(false)} />
        </main>
      </div>
    </div>
  );
}

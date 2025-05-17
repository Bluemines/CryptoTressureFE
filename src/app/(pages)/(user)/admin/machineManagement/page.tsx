"use client";

import AddMachineDrawer from "@/app/components/drawers/AddMachineDrawer";
import AdminTable from "@/app/components/ui/tables/AdminTable";
import { Typography } from "@mui/material";
import { useState } from "react";
import useMachineManagement from "./hooks";
import useEditProducts from "./hooks/useEditProducts";
import EditMachineDrawer from "@/app/components/drawers/EditMachineDrawer";

export default function MachineManagemnt() {
  const { machines, handelSetEditValues, currentMachine } =
    useMachineManagement();
  const { product } = useEditProducts();
  console.log("product: ", product);
  const columns = [
    { id: "title", label: "Title" },
    { id: "rentalDays", label: "Rent Days" },
    { id: "price", label: "Price" },
  ];

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  return (
    <div className="min-h-screen bg-black py-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Typography sx={{ fontWeight: "bold", color: "white", fontSize: 24 }}>
          Machine Management
        </Typography>
        <main className="mt-4 md:mt-10">
          <AdminTable
            buttonText="Add machine"
            editProduct={true}
            showHeader={true}
            columns={columns}
            data={machines}
            onClick={() => {
              setOpen(true);
            }}
            onClick2={() => setOpen2(true)}
            titlePage="machine"
          />
          <AddMachineDrawer
            machine={currentMachine}
            open={open}
            onClose={() => setOpen(false)}
          />
          <EditMachineDrawer open={open2} onClose={() => setOpen2(false)} />
        </main>
      </div>
    </div>
  );
}

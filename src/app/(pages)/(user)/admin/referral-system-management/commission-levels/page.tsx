"use client";
import AddLevelDrawer from "@/app/components/drawers/AddLevelDrawer";
import AdminTable from "@/app/components/ui/tables/AdminTable";
import React, { useState } from "react";
import useLevels from "../hooks";

export default function CommissionLevels() {
  const columns = [
    { id: "level", label: "Level Name" },
    { id: "points", label: "Requried Points" },
  ];
  const { levels } = useLevels();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div>
      <div className="font-semibold text-xl my-3">Commission Levels</div>
      <AdminTable
        showSearch={false}
        onClick={() => setOpen(true)}
        showHeader
        buttonText="Add new Level"
        data={levels}
        columns={columns}
        actions={false}
        titlePage="commission"
        // onClick2={() => setOpenEdit(true)}
      />
      <AddLevelDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

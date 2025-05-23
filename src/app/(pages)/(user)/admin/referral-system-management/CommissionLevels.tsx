"use client";
import AdminTable from "@/app/components/ui/tables/AdminTable";
import React from "react";

export default function CommissionLevels() {
  const columns = [
    { id: "name", label: "Level Name" },
    { id: "amount", label: "Amount" },
    { id: "points", label: "Requried Points" },
  ];

  const data = [
    {
      id: 1,
      name: "Level 1",
      amount: "$100",
      points: 2,
    },
    {
      id: 2,
      name: "Level 2",
      amount: "$100",
      points: 2,
    },
    {
      id: 3,
      name: "Level 3",
      amount: "$100",
      points: 2,
    },
  ];
  return (
    <div>
      <div className="font-semibold text-xl my-3">
        Commission Levels
      </div>
      <AdminTable
        showHeader
        buttonText="Manage Commission Level"
        data={data}
        columns={columns}
        actions={false}
      />
    </div>
  );
}

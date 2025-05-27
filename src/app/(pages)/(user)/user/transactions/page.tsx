"use client"

import React from "react";
import useUserTransactions from "./hooks";
import { Typography } from "@mui/material";
import AdminTable from "@/app/components/ui/tables/AdminTable";

export default function page() {
  const { transactions } = useUserTransactions();
  const columns = [
    { id: "id", label: "ID" },
    { id: "transactiontype", label: "Transaction Type" },
    { id: "amount", label: "Amount" },
    { id: "date", label: "Date" },
    { id: "status", label: "Status" },
  ];
  return (
    <div className="min-h-screen bg-black py-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Typography sx={{ fontWeight: "bold", color: "white", fontSize: 24 }}>
          Transactions
        </Typography>
        <main className="mt-4 md:mt-10">
          <AdminTable
            showButton={false}
            showHeader={true}
            columns={columns}
            data={transactions}
            actions={false}
            titlePage="transactions"
            icon1={false}
            icon2={false}
          />
        </main>
      </div>
    </div>
  );
}

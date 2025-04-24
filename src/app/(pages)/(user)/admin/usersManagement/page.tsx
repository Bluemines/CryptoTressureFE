"use client";

import { StatsCard } from "@/app/components/cards/StatsCard";
import React from "react";
import AdminTable from "../../../../components/ui/tables/AdminTable";
import { Card, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter()
  const columns = [
    { id: "name", label: "User" },
    { id: "email", label: "Email" },
    { id: "level", label: "Level" },
    { id: "date", label: "Date" },
    { id: "walletBalance", label: "Wallet Balance" },
    { id: "referedBy", label: "Refered By" },
    { id: "status", label: "Status" },
  ];

  const data = [
    {
      id: 1,
      name: "John Bushmill",
      email: "Johnb@mail.com",
      level: 2,
      date: "1 min ago",
      walletBalance: "1 min ago",
      referedBy: "User",
      status: "Pending",
    },
    {
      id: 2,
      name: "John Bushmill",
      email: "Johnb@mail.com",
      level: 2,
      date: "1 min ago",
      walletBalance: "1 min ago",
      referedBy: "User",
      status: "Approved",
    },
    {
      id: 3,
      name: "John Bushmill",
      email: "Johnb@mail.com",
      level: 2,
      date: "1 min ago",
      walletBalance: "1 min ago",
      referedBy: "User",
      status: "Suspend",
    },

    // Add more entries...
  ];
  const statsData = [
    {
      value: "4,235",
      label: "Total Users",
      color: "bg-[#7C3AED]",
      //   image: Image,
    },
    {
      value: "3,312",
      label: "Verified Users",
      color: "bg-[#50BB25]",
      //   image: Image,
    },
    {
      value: "20",
      label: "Suspended Users",
      color: "bg-[#EC1E2D]",
      //   image: Image,
    },
    {
      value: "80",
      label: "Pending Users",
      color: "bg-[#FF8800]",
      //   image: Image,
    },
  ];
  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <StatsCard
              //   image={stat.image}
              key={index}
              value={stat.value}
              label={stat.label}
              color={stat.color}
            />
          ))}
        </div>
        <Typography sx={{fontWeight:'bold',color:"white",fontSize:24}}>Users Management</Typography>
        <main
          // style={{   minHeight: "100vh" }}
          className="mt-10"
        >
          <AdminTable columns={columns} data={data} icon1={false} onClick={()=>router.push("/admin/usersManagement/details")} />
        </main>
      </div>
    </div>
  );
}

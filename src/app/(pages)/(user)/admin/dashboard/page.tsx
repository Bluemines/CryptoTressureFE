"use client";

import { StatsCard } from "@/app/components/cards/StatsCard";
import StatisticsChart from "@/app/components/charts/StatsChart";
import React from "react";
import AdminTable from "../../../../components/ui/tables/AdminTable";
import { Card } from "@mui/material";
import useUserManagement from "../usersManagement/hooks";
import useAdminDashboard from "./hooks";
export default function Dashboard() {
  const { users } = useUserManagement();
  const { stats, withDrawls } = useAdminDashboard();
  const statsData = [
    {
      value: stats ? stats.totalUsers : "Loading...",
      label: "Total Users",
      color: "bg-[#7C3AED]",
      //   image: Image,
    },
    {
      value: stats ? stats.verifiedUsers : "Loading...",
      label: "Verified Users",
      color: "bg-[#50BB25]",
      //   image: Image,
    },
    {
      value: stats ? stats.suspendedUsers : "Loading...",
      label: "Suspended Users",
      color: "bg-[#EC1E2D]",
      //   image: Image,
    },
    {
      value: stats ? stats.activeMachines : "Loading...",
      label: "Active Machines",
      color: "bg-[#FF8800]",
      //   image: Image,
    },
    {
      value: stats ? stats.rewardsDistributed : "Loading...",
      label: "Rewards Distributed",
      color: "bg-[#393252]",
      //   image: Image,
    },
    {
      value: stats ? stats.platformBalance : "Loading...",
      label: "Platform Balance",
      color: "bg-[#33482a]",
      //   image: Image,
    },
    {
      value: stats ? stats.totalRevenue : "Loading...",
      label: "Total Revenue",
      color: "bg-[#274650]",
      //   image: Image,
    },
    {
      value: stats ? stats.pendingWithdrawals : "Loading...",
      label: "Pending Withdrawls",
      color: "bg-[#543e22]",
      //   image: Image,
    },
  ];
  const columns = [
    { id: "username", label: "User" },
    { id: "email", label: "Email" },
    { id: "level", label: "Level" },
    { id: "createdAt", label: "Date" },
    { id: "balance", label: "Balance" },
    { id: "status", label: "Status" },
  ];
  const columns2 = [
    { id: "name", label: "User" },
    { id: "email", label: "Email" },
    { id: "amount", label: "Amount" },
    { id: "date", label: "Date" },
    { id: "status", label: "Status" },
  ];


  const data2 = [
    {
      id: 1,
      name: "John Bushmill",
      email: "Johnb@mail.com",
      amount: 200,
      date: "1 min ago",
      status: "Pending",
    },
    {
      id: 2,
      name: "Mohammad Karim",
      email: "Johnb@mail.com",
      date: "5 hour ago",
      amount: 200,

      status: "Approved",
    },
    {
      id: 3,
      name: "Josh Adam",
      email: "Johnb@mail.com",
      amount: 200,

      date: "2 day ago",
      status: "Approved",
    },
    {
      id: 4,
      name: "Sin Tae",
      email: "Johnb@mail.com",
      amount: 200,

      date: "5 Jan 2023",
      status: "Suspend",
    },
    // Add more entries...
  ];
  return (
    <div className="min-h-screen bg-black py-4 md:p-8">
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
        <Card
        //   sx={{ backgroundColor: "#0A0A0B", color: "white", borderRadius: 3 }}
        >
          <main
          // style={{   minHeight: "100vh" }}
          >
            <StatisticsChart />
          </main>
        </Card>
        <main className="mt-20">
          {users.length > 0 ? (
            <AdminTable
              columns={columns}
              data={users}
              icon1={false}
              navUser={true}
              title="Recent Users"
              // onClick={() => router.push("/admin/usersManagement/details")}
            />
          ) : (
            <div className="text-white text-xl text-center font-bold">
              No Users registered yet
            </div>
          )}
        </main>
        {withDrawls.length > 0 ? (
          <main className="mt-20">
            <AdminTable
              columns={columns2}
              data={data2}
              title="Recent Withdrawls"
            />
          </main>
        ) : (
          <div className="text-white text-xl text-center font-bold">
            No withdrawls yet
          </div>
        )}
      </div>
    </div>
  );
}

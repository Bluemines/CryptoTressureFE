"use client";

import AdminTable from "@/app/components/ui/tables/AdminTable";
import { Typography } from "@mui/material";

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
          rentDays:2,
          price:200,
        },
        {
          id: 2,
          name: "John Bushmill",
          rentDays:2,
          price:200,
        },
        {
          id: 3,
          name: "John Bushmill",
          rentDays:2,
          price:200,
        },
        {
          id: 4,
          name: "John Bushmill",
          rentDays:2,
          price:200,
        },
       
      ];
  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Typography sx={{fontWeight:'bold',color:"white",fontSize:24}}>Machine Management</Typography>
        <main
          // style={{   minHeight: "100vh" }}
          className="mt-10"
        >
          <AdminTable columns={columns} data={data}   />
        </main>
      </div>
    </div>
  );
}

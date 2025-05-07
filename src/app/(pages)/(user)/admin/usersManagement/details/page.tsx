// "use client";

// import AdminTable from "@/app/components/ui/tables/AdminTable";
// import { Box, Grid } from "@mui/material";

// export default function page() {
//   const columns = [
//     { id: "name", label: "User" },
//     { id: "email", label: "Email" },
//     { id: "level", label: "Level" },
//     { id: "date", label: "Date" },
//     { id: "walletBalance", label: "Wallet Balance" },
//     { id: "referedBy", label: "Refered By" },
//     { id: "status", label: "Status" },
//   ];

//   const data = [
//     {
//       id: 1,
//       name: "John Bushmill",
//       email: "Johnb@mail.com",
//       level: 2,
//       date: "1 min ago",
//       walletBalance: "1 min ago",
//       referedBy: "User",
//       status: "Pending",
//     },
//     {
//       id: 2,
//       name: "John Bushmill",
//       email: "Johnb@mail.com",
//       level: 2,
//       date: "1 min ago",
//       walletBalance: "1 min ago",
//       referedBy: "User",
//       status: "Approved",
//     },
//     {
//       id: 3,
//       name: "John Bushmill",
//       email: "Johnb@mail.com",
//       level: 2,
//       date: "1 min ago",
//       walletBalance: "1 min ago",
//       referedBy: "User",
//       status: "Suspend",
//     },

//     // Add more entries...
//   ];
//   return (
//     <div className="min-h-screen bg-black p-4 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <Grid>
//           <Box></Box>
//           <main
//             // style={{   minHeight: "100vh" }}
//             className="mt-10"
//           >
//             <AdminTable columns={columns} data={data} icon2={false} />
//           </main>
//         </Grid>
//       </div>
//     </div>
//   );
// }
"use client";

import AdminTable from "@/app/components/ui/tables/AdminTable";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useSearchParams } from "next/navigation";
import useSingleUser from "../hooks/useSingleUser";
import { useState } from "react";
import Modal from "@/app/components/modals/Modal";
import { suspendUserApi } from "@/api/adminUsers";
import Toast from "@/app/components/Toast";

export default function UserDetails() {
  const [isSuspendedModalOpen, setIsSuspendedModalOpen] = useState(false);
  const { user, suspendUser, showToast, setShowToast, message } =
    useSingleUser();
  const columns = [
    { id: "amount", label: "Amount" },
    { id: "date", label: "Date" },
    { id: "status", label: "Status" },
  ];

  const data = [
    {
      id: 1,
      amount: 100,
      date: "1 min ago",
      status: "Pending",
    },
    {
      id: 2,
      amount: 100,
      date: "1 min ago",
      status: "Approved",
    },
    {
      id: 3,
      amount: 100,
      date: "1 min ago",
      status: "Suspend",
    },
    {
      id: 4,
      amount: 100,
      date: "1 min ago",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Toast open={showToast} message={message} setOpen={setShowToast} />
        <Grid container spacing={4}>
          <Grid size={4}>
            <Card
              sx={{
                backgroundColor: "#1E1E1E",
                color: "white",
                height: "100vh",
                padding: "5%",
              }}
            >
              <CardContent className="flex flex-col items-center text-center space-y-4">
                <Avatar
                  src="https://randomuser.me/api/portraits/women/1.jpg"
                  sx={{ width: 80, height: 80 }}
                />
                <Typography variant="h6">{user?.username}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <CheckBoxIcon sx={{ color: "#7B61FF" }} />
                  <Typography variant="body2">
                    ${user?.balance} Wallet Balance
                  </Typography>
                </Box>
                <Divider sx={{ backgroundColor: "#333", width: "100%" }} />
                <Box textAlign="left" className="w-full space-y-2">
                  <div className="mt-4">
                    <Typography className="text-[#A9A9A9] mt-20">
                      Details
                    </Typography>
                  </div>
                  <div className="mt-4">
                    <Typography variant="body2">
                      <strong>Username:</strong> {user?.username}
                    </Typography>
                  </div>

                  <div className="mt-4">
                    <Typography variant="body2">
                      <strong>Email:</strong> {user?.email}
                    </Typography>
                  </div>

                  <div className="mt-4">
                    <Typography variant="body2" className="flex flex-row gap-2">
                      <strong className="mt-1.5">Status:</strong>{" "}
                      <div className="bg-[#274635] p-2 rounded-xl text-[#26c76e] font-semibold">
                        {user?.status}
                      </div>
                    </Typography>
                  </div>

                  <div className="mt-4">
                    <Typography variant="body2" className="flex flex-row gap-2">
                      <strong className="mt-1">Level:</strong>{" "}
                      <div className="bg-[#274635] p-1 rounded-xl text-[#26c76e] font-semibold w-10 text-center">
                        {user?.level}
                      </div>
                    </Typography>
                  </div>
                  <div className="mt-4">
                    <Typography variant="body2">
                      {/* <strong>Contact:</strong> +32423423423 */}
                    </Typography>
                  </div>
                </Box>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#442d2e", mt: 2, color: "#ea5355" }}
                  onClick={() => setIsSuspendedModalOpen(true)}
                >
                  Suspend User
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={8}>
            <Box className="">
              <AdminTable columns={columns} data={data} icon2={false} />
            </Box>
          </Grid>
        </Grid>
      </div>
      <Modal open={isSuspendedModalOpen} setOpen={setIsSuspendedModalOpen}>
        <div className="text-lg font-medium">Suspend withdrawal?</div>
        <div className="text-[#A9A9A9] mt-4">
          Do you want to Suspend user {user?.username}
        </div>
        <div className="flex">
          <Button
            sx={{
              backgroundColor: "#F04438",
              color: "#fff",
              marginTop: "22px",
              marginLeft: "auto",
            }}
            onClick={() => suspendUser(Number(user?.id))}
          >
            Suspended
          </Button>
        </div>
      </Modal>
    </div>
  );
}

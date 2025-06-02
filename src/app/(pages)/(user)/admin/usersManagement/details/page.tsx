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
import { useState } from "react";
import StatusBadge from '@/app/components/ui/StatusBadge';
import Modal from "@/app/components/modals/Modal";
import Toast from "@/app/components/Toast";
import useSingleUser from "../hooks/useSingleUser";
import { usegetUserWithdrawHistory } from '@/api/admin/useAdmin'; // <-- Make sure this is the correct path

export default function UserDetails() {
  const [isSuspendedModalOpen, setIsSuspendedModalOpen] = useState(false);
  const { user, suspendUser, showToast, setShowToast, message } =
    useSingleUser();

const userId = user?.id;

const { data: withdrawHistory, isLoading } = usegetUserWithdrawHistory(userId ?? 0);


  const columns = [
    { id: "amount", label: "Amount" },
    { id: "date", label: "Date" },
    { id: "status", label: "Status" },
  ];

  const tableData = withdrawHistory?.data?.map((item: any) => ({
    id: item.id,
    amount: item.amount,
    date: new Date(item.date).toLocaleString(),
    status: <StatusBadge status={item.status} />
  })) || [];

  return (
    <div className="min-h-screen bg-black py-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Toast open={showToast} message={message} setOpen={setShowToast} />
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
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
                  src={
                    user?.profile
                      ? `https://api.bluemines.xyz${user.profile.startsWith("/") ? "" : "/"}${user.profile}`
                      : undefined
                  }
                  sx={{ width: 80, height: 80 }}
                >
                  {!user?.profile && user?.username?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6">{user?.username}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <CheckBoxIcon sx={{ color: "#7B61FF" }} />
                  <Typography variant="body2">
                    ${user?.balance} Wallet Balance
                  </Typography>
                </Box>
                <Divider sx={{ backgroundColor: "#333", width: "100%" }} />
                <Box textAlign="left" className="w-full space-y-2">
                  <Typography className="text-[#A9A9A9] mt-20">Details</Typography>
                  <Typography variant="body2">
                    <strong>Username:</strong> {user?.username}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {user?.email}
                  </Typography>
                  <Typography variant="body2" className="flex gap-2">
                    <strong>Status:</strong>
                    <div className="bg-[#274635] p-2 rounded-xl text-[#26c76e] font-semibold">
                      {user?.status}
                    </div>
                  </Typography>
                  <Typography variant="body2" className="flex gap-2">
                    <strong>Level:</strong>
                    <div className="bg-[#274635] p-1 rounded-xl text-[#26c76e] font-semibold w-10 text-center">
                      {user?.level}
                    </div>
                  </Typography>
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

          <Grid size={{ xs: 12, md: 4 }}>
            <Box>
              <AdminTable columns={columns} data={tableData} icon2={false} />
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

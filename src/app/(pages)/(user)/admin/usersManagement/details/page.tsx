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
import TableSkeleton from "@/loaders/TableSkeleton"
import { useState } from "react";
import StatusBadge from "@/app/components/ui/StatusBadge";
import Modal from "@/app/components/modals/Modal";
import Toast from "@/app/components/Toast";
import useSingleUser from "../hooks/useSingleUser";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  usegetUserWithdrawHistory,
  useApproveWithdraw,
  useRejectWithdraw,
} from "@/api/admin/useAdmin";

export default function UserDetails() {
  const [isSuspendedModalOpen, setIsSuspendedModalOpen] = useState(false);
  const {
    user,
    suspendUser,
    showToast,
    setShowToast,
    message,
    setMessage,
  } = useSingleUser();

  const userId = user?.id ?? 0;

  const { data: withdrawHistory, isLoading: isPendingLoading  } = usegetUserWithdrawHistory(userId);
  const { mutate: approveWithdrawMutate } = useApproveWithdraw();
  const { mutate: rejectWithdrawMutate } = useRejectWithdraw();

    // Add menu state here:
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Menu handlers:
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  // Action handler called when user selects approve/reject from menu:
  const handleAction = (action: "approve" | "reject") => {
    if (selectedId !== null) {
      handleWithdrawAction(selectedId, action);
      handleMenuClose();
    }
  };

  const handleWithdrawAction = (id: number, action: "approve" | "reject") => {
    if (action === "approve") {
      approveWithdrawMutate({ id });
    } else {
      rejectWithdrawMutate({ id });
    }
  };

  const columns = [
    { id: "amount", label: "Amount" },
    { id: "date", label: "Date" },
    { id: "status", label: "Status" },
  ];

  const tableData =
    withdrawHistory?.data?.map((item: any) => ({
      id: item.id,
      amount: item.amount,
      date: new Date(item.date).toLocaleString(),
      status: <StatusBadge status={item.status} />,
      actions: (
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={() => handleWithdrawAction(item.id, "approve")}
          >
            Approve
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleWithdrawAction(item.id, "reject")}
          >
            Reject
          </Button>
        </Box>
      ),
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
                  <Typography className="text-[#A9A9A9] mt-4">Details</Typography>
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

           {isPendingLoading ? (
              <TableSkeleton rows={5} cols={4} />
            ) : (
              <Grid size={{ xs: 12, md: 4 }}>

                  <div className="overflow-auto rounded-lg border border-gray-700">
                    <table className="min-w-full text-sm text-left text-gray-300 bg-[#262626]">
                      <thead className="text-xs uppercase bg-[#262626] text-gray-400">
                        <tr>
                          <th className="px-6 py-3">Amount</th>
                          <th className="px-6 py-3">Date</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {withdrawHistory?.data?.length ? (
                          withdrawHistory.data.map((item: any) => (
                            <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-800">
                              <td className="px-6 py-4">${item.amount}</td>
                              <td className="px-6 py-4">{new Date(item.date).toLocaleString()}</td>
                              <td className="px-6 py-4">
                                <StatusBadge status={item.status} />
                              </td>
                              <td className="px-6 py-4">
                                <IconButton
                                  onClick={(e) => handleMenuClick(e, item.id)}
                                  size="small"
                                  sx={{ color: "#fff" }}
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  anchorEl={anchorEl}
                                  open={Boolean(anchorEl) && selectedId === item.id}
                                  onClose={handleMenuClose}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                  }}
                                >
                                  <MenuItem onClick={() => handleAction("approve")}>Approve</MenuItem>
                                  <MenuItem onClick={() => handleAction("reject")}>Reject</MenuItem>
                                </Menu>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="text-center px-6 py-4 text-gray-400">
                              No withdrawals found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Grid>

            )}

        </Grid>
      </div>

      <Modal open={isSuspendedModalOpen} setOpen={setIsSuspendedModalOpen}>
        <div className="text-lg font-medium">Suspend withdrawal?</div>
        <div className="text-[#A9A9A9] mt-4">
          Do you want to suspend user {user?.username}?
        </div>
        <div className="flex">
          <Button
            sx={{
              backgroundColor: "#F04438",
              color: "#fff",
              marginTop: "22px",
              marginLeft: "auto",
            }}
            onClick={() => suspendUser(userId)}
          >
            Suspend
          </Button>
        </div>
      </Modal>
    </div>
  );
}

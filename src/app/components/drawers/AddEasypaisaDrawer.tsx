"use client";

import {
  Box,
  Drawer,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import { useState } from "react";

const levels = ["Low", "Medium", "High"]; // Example levels

export default function AddEasypaisaDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    cnic: "",
    accountNo: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400 },
          bgcolor: "black",
          color: "#fff",
          p: 3,
        },
      }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Link Easypaisa Account
      </Typography>

      <TextField
        name="cnic"
        label="CNIC"
        variant="outlined"
        fullWidth
        value={form.cnic}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ style: { color: "#aaa" } }}
        InputProps={{ style: { color: "#fff" } }}
      />


      <TextField
        name="accountNo"
        label="Account Number"
        variant="outlined"
        fullWidth
        value={form.accountNo}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ style: { color: "#aaa" } }}
        InputProps={{ style: { color: "#fff" } }}
      />

      <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
        <Button
          variant="contained"
          fullWidth
          sx={{ bgcolor: "#7367F0", textTransform: "none" }}
        >
          Add
        </Button>
        <Button
        //   variant="outlined"
          fullWidth
          sx={{ color: "#a64445", textTransform: "none",bgcolor:"#3a2b2b" }}
          onClick={onClose}
        >
          Discard
        </Button>
      </Box>
    </Drawer>
  );
}

"use client";

import { useGetProducts } from "@/api/admin/useAdmin";
import {
  Box,
  Drawer,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

type Product = {
  id: number;
  title: string;
};


export default function DistributeRewardsDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  
  const { data } = useGetProducts()
  const items: Product[] = data?.items ?? [];
  

  const [form, setForm] = useState({
    user: "",
    selectMachine: "",
    rewardAmount: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
        Distribute Awards Manually
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel sx={{ color: "#aaa" }}>Select User</InputLabel>
        <Select
          name="user"
          value={form.user}
          onChange={handleSelectChange}
          label="Select User"
          sx={{
            color: "#fff",
            ".MuiOutlinedInput-notchedOutline": { borderColor: "#666" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#999" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#A78BFA" },
          }}
        >
          <MenuItem value="John Bushmill">John Bushmill</MenuItem>
          <MenuItem value="Jane Doe">Jane Doe</MenuItem>
          <MenuItem value="Alice Smith">Alice Smith</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel sx={{ color: "#aaa" }}>Select Machine</InputLabel>
        <Select
          name="selectMachine"
          value={form.selectMachine}
          onChange={handleSelectChange}
          label="Select Machine"
          sx={{
            color: "#fff",
            ".MuiOutlinedInput-notchedOutline": { borderColor: "#666" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#999" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#A78BFA" },
          }}
        >
          {items?.map(((item, index: number) => (
            <MenuItem key={index} value={item.title}>{item.title}</MenuItem>
          )))}
        </Select>
      </FormControl>

      <TextField
        name="rewardAmount"
        label="Reward Amount"
        type="number"
        variant="outlined"
        fullWidth
        value={form.rewardAmount}
        onChange={handleInputChange}
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
          Send
        </Button>
        <Button
          fullWidth
          sx={{
            color: "#a64445",
            textTransform: "none",
            bgcolor: "#3a2b2b",
          }}
          onClick={onClose}
        >
          Discard
        </Button>
      </Box>
    </Drawer>
  );
}

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

export default function AddMachineDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    income: "",
    fee: "",
    days: "",
    level: "",
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
        Add Machine
      </Typography>

      <TextField
        name="title"
        label="Title"
        variant="outlined"
        fullWidth
        value={form.title}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ style: { color: "#aaa" } }}
        InputProps={{ style: { color: "#fff" } }}
      />

      <Button
        component="label"
        variant="outlined"
        fullWidth
        sx={{
          my: 2,
          color: "#aaa",
          borderColor: "#555",
          textTransform: "none",
        }}
      >
        Choose Image
        <input type="file" hidden />
      </Button>

      <TextField
        name="price"
        label="Price"
        variant="outlined"
        fullWidth
        value={form.price}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ style: { color: "#aaa" } }}
        InputProps={{ style: { color: "#fff" } }}
      />

      <TextField
        name="income"
        label="Daily Income (%)"
        variant="outlined"
        fullWidth
        value={form.income}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ style: { color: "#aaa" } }}
        className="bg-[#212121]"
        InputProps={{ style: { color: "#fff" } }}
      />

      <TextField
        name="fee"
        label="Fee"
        variant="outlined"
        fullWidth
        value={form.fee}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ style: { color: "#aaa" } }}
        InputProps={{ style: { color: "#fff" } }}
      />

      <TextField
        name="days"
        label="Number of Days for Rent"
        variant="outlined"
        fullWidth
        value={form.days}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ style: { color: "#aaa" } }}
        InputProps={{ style: { color: "#fff" } }}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel sx={{ color: "#aaa" }}>Level</InputLabel>
        <Select
          name="level"
          value={form.level}
          label="Level"
          onChange={handleChange}
          sx={{ color: "#fff" }}
        >
          {levels.map((lvl) => (
            <MenuItem key={lvl} value={lvl}>
              {lvl}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
        <Button
          variant="contained"
          fullWidth
          sx={{ bgcolor: "#7367F0", textTransform: "none" }}
        >
          Add
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{ color: "#fff", borderColor: "#888", textTransform: "none" }}
          onClick={onClose}
        >
          Discard
        </Button>
      </Box>
    </Drawer>
  );
}

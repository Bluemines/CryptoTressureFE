"use client";

import { useGetProducts } from "@/api/admin/useAdmin";
import useRewards from "@/app/(pages)/(user)/admin/rewards-distribution/hooks";
import useUserManagement from "@/app/(pages)/(user)/admin/usersManagement/hooks";
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
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import FormInput from "../ui/Inputs/FormInput";

type Product = {
  id: number;
  title: string;
};
type User = {
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
  const {
    control,
    errors,
    handleAddReward,
    handleSubmit,
    handleSelectChange,
    form,
    isValid,
    isPending,
  } = useRewards();
  const { data } = useGetProducts();
  const { users } = useUserManagement();
  const items: Product[] = data?.items ?? [];

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
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#A78BFA",
            },
          }}
        >
          {users.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.username}
            </MenuItem>
          ))}
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
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#A78BFA",
            },
          }}
        >
          {items?.map((item, index: number) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormInput
        name="reward"
        control={control}
        errors={errors}
        label="Reward"
      />
      {isPending ? (
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : (
        <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
          <Button
            variant="contained"
            fullWidth
            sx={{ bgcolor: "#7367F0", textTransform: "none" }}
            disabled={!isValid}
            onClick={handleSubmit(handleAddReward)}
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
      )}
    </Drawer>
  );
}

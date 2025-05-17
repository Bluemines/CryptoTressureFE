"use client";

import useLevels from "@/app/(pages)/(user)/admin/referral-system-management/hooks";
import {
  Box,
  Drawer,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import FormInput from "../ui/Inputs/FormInput";

export default function AddLevelDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    income: "",
    fee: "",
    days: "",
    level: "",
  });
  const { control, errors, handleSubmit, isValid, handleAddLevel, isPending } =
    useLevels();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    // handleCancelEdit();
    onClose();
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
        Add Level
      </Typography>

      <FormInput
        name="level"
        label="Level Number"
        control={control}
        errors={errors}
        type="number"
      />
      <FormInput
        name="points"
        label="Points Required"
        control={control}
        errors={errors}
        type="number"
      />

      {isPending ? (
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
            <Button
              variant="contained"
              fullWidth
              sx={{ bgcolor: "#7367F0", textTransform: "none" }}
              onClick={handleSubmit(handleAddLevel)}
              disabled={!isValid}
            >
              Add
              {/* {isEditMode ? "Update" : "Add"} */}
            </Button>
            <Button
              fullWidth
              sx={{
                color: "#a64445",
                textTransform: "none",
                bgcolor: "#3a2b2b",
              }}
              onClick={handleClose}
            >
              Discard
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
}

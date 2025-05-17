"use client";

import { Box, Drawer, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import FormInput from "../ui/Inputs/FormInput";
import Toast from "../Toast";
import useEditProducts from "@/app/(pages)/(user)/admin/machineManagement/hooks/useEditProducts";

export default function EditMachineDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    control,
    handleSubmit,
    errors,
    selectedImage,
    handleImageSelect,
    handleEditMachine,
    isValid,
    openToast,
    message,
    setOpenToast,
  } = useEditProducts();
  const handleClose = () => {
    // handleCancelEdit();
    onClose();
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400 },
          bgcolor: "black",
          color: "#fff",
          p: 3,
        },
      }}
    >
      <Toast open={openToast} message={message} setOpen={setOpenToast} />
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Edit Machine
      </Typography>

      <FormInput
        name="title"
        label="Title"
        control={control}
        errors={errors}
        rules={{ required: "Title is required" }}
      />

      <FormInput
        name="description"
        label="Descriptions"
        control={control}
        errors={errors}
        multiline
        rows={4}
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
        {selectedImage ? selectedImage.name : "Choose Image"}
        <input type="file" hidden onChange={handleImageSelect} />
      </Button>

      <FormInput name="price" label="Price" control={control} errors={errors} />

      <FormInput
        name="dailyIncome"
        label="Daily Income"
        control={control}
        errors={errors}
      />

      <FormInput name="fee" label="Fee" control={control} errors={errors} />

      <FormInput
        name="rentalDays"
        label="Rental Days"
        control={control}
        errors={errors}
        type="number"
      />

      <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
        <Button
          variant="contained"
          fullWidth
          sx={{ bgcolor: "#7367F0", textTransform: "none" }}
          onClick={handleSubmit(handleEditMachine)}
          disabled={!isValid}
        >
          Edit
        </Button>
        <Button
          fullWidth
          sx={{ color: "#a64445", textTransform: "none", bgcolor: "#3a2b2b" }}
          onClick={handleClose}
        >
          Discard
        </Button>
      </Box>
    </Drawer>
  );
}

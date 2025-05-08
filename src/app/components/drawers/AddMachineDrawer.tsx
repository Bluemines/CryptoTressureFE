// "use client";

// import {
//   Box,
//   Drawer,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   InputLabel,
//   Select,
//   FormControl,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import FormInput from "../ui/Inputs/FormInput";
// import useMachineManagement from "@/app/(pages)/(user)/admin/machineManagement/hooks";
// import Toast from "../Toast";

// const levels = ["Low", "Medium", "High"]; // Example levels

// export default function AddMachineDrawer({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: () => void;
// }) {
//   const {
//     control,
//     errors,
//     selectedImage,
//     handleImageSelect,
//     handleSubmit,
//     handleAddMachine,
//     isValid,
//     message,
//     openToast,
//     setOpenToast,
//     currentMachineId,
//     handelSetEditValues,
//   } = useMachineManagement();
//   useEffect(() => {
//     if (open && currentMachineId) {
//       handelSetEditValues(currentMachineId); // Prefill form on drawer open
//     }
//   }, [open, currentMachineId]);
//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           width: { xs: "100%", sm: 400 },
//           bgcolor: "black",
//           color: "#fff",
//           p: 3,
//         },
//       }}
//     >
//       <Toast open={openToast} message={message} setOpen={setOpenToast} />
//       <Typography variant="h6" fontWeight={600} gutterBottom>
//         Add Machine
//       </Typography>

//       {/* <TextField
//         name="title"
//         label="Title"
//         variant="outlined"
//         fullWidth
//         value={form.title}
//         onChange={handleChange}
//         margin="normal"
//         InputLabelProps={{ style: { color: "#aaa" } }}
//         InputProps={{ style: { color: "#fff" } }}
//       /> */}
//       <FormInput
//         name="title"
//         label="Title"
//         control={control}
//         errors={errors}
//         rules={{ required: "Title is required" }}
//       />
//       <FormInput
//         name="description"
//         label="Descriptions"
//         control={control}
//         errors={errors}
//         multiline
//         rows={4}
//       />

//       <Button
//         component="label"
//         variant="outlined"
//         fullWidth
//         sx={{
//           my: 2,
//           color: "#aaa",
//           borderColor: "#555",
//           textTransform: "none",
//         }}
//       >
//         {selectedImage ? selectedImage.name : "Choose Image"}
//         <input type="file" hidden onChange={handleImageSelect} />
//       </Button>

//       <FormInput name="price" label="Price" control={control} errors={errors} />

//       <FormInput
//         name="dailyIncome"
//         label="Daily Income"
//         control={control}
//         errors={errors}
//       />

//       <FormInput name="fee" label="Fee" control={control} errors={errors} />

//       <FormInput
//         name="rentalDays"
//         label="Rental Days"
//         control={control}
//         errors={errors}
//       />

//       {/* <FormControl fullWidth margin="normal">
//         <InputLabel sx={{ color: "#aaa" }}>Level</InputLabel>
//         <Select
//           name="level"
//           value={form.level}
//           label="Level"
//           onChange={handleChange}
//           sx={{ color: "#fff" }}
//         >
//           {levels.map((lvl) => (
//             <MenuItem key={lvl} value={lvl}>
//               {lvl}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl> */}

//       <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
//         <Button
//           variant="contained"
//           fullWidth
//           sx={{ bgcolor: "#7367F0", textTransform: "none" }}
//           onClick={handleSubmit(handleAddMachine)}
//           disabled={!isValid}
//         >
//           Add
//         </Button>
//         <Button
//           fullWidth
//           sx={{ color: "#a64445", textTransform: "none", bgcolor: "#3a2b2b" }}
//           onClick={onClose}
//         >
//           Discard
//         </Button>
//       </Box>
//     </Drawer>
//   );
// }
"use client";

import { Box, Drawer, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import FormInput from "../ui/Inputs/FormInput";
import useMachineManagement, {
  Machine,
} from "@/app/(pages)/(user)/admin/machineManagement/hooks";
import Toast from "../Toast";

export default function AddMachineDrawer({
  open,
  onClose,
  editMachineId,
  machine,
}: {
  open: boolean;
  onClose: () => void;
  editMachineId?: string;
  machine?: Machine;
}) {
  const {
    control,
    errors,
    selectedImage,
    handleImageSelect,
    handleSubmit,
    handleAddMachine,
    isValid,
    message,
    openToast,
    setOpenToast,
    handelSetEditValues,
    currentMachineId,
    reset,
    // isEditMode,
    // handleCancelEdit
  } = useMachineManagement();

  // Set edit values when drawer opens with an editMachineId
  useEffect(() => {
    // Directly call handelSetEditValues without setTimeout
    console.log(machine);
    if (machine) {
      reset({
        title: machine?.title,
        description: machine?.description,
        price: machine?.price,
        dailyIncome: machine?.dailyIncome,
        image: machine?.image as any,
        fee: machine?.fee,
        rentalDays: machine?.rentalDays,
      });
    }
  }, [open, currentMachineId, machine]);

  // Handle closing the drawer
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
        {/* {isEditMode ? "Edit Machine" : "Add Machine"} */}
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
          onClick={handleSubmit(handleAddMachine)}
          disabled={!isValid}
        >
          Add
          {/* {isEditMode ? "Update" : "Add"} */}
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

import { Snackbar } from "@mui/material";
import React from "react";

interface ToastType {
  open: boolean;
  message: string;
  setOpen: (open: boolean) => void;
}

const Toast = ({ open, message, setOpen }: ToastType) => {
  const [state, setState] = React.useState<{
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  }>({
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal } = state;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={2000}
      message={message}
    />
  );
};

export default Toast;

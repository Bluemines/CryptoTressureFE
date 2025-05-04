"use client";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useEffect, useState } from "react";

type CustomToastProps = {
  title?: string;
  message: string;
  severity?: "success" | "info" | "warning" | "error";
  icon?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  duration?: number; // optional duration in ms (default: 3000)
};

export default function CustomToast({
  title = "Success",
  message,
  severity = "success",
  icon = <CheckCircleIcon fontSize="inherit" />,
  backgroundColor = "#112D1D",
  textColor = "#4ADE80",
  duration = 3000,
}: CustomToastProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
    const timer = setTimeout(() => setOpen(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <Snackbar open={open} onClose={() => setOpen(false)}>
      <Alert
        icon={icon}
        severity={severity}
        sx={{
          width: "100%",
          backgroundColor,
          color: textColor,
          alignItems: "flex-start",
          borderRadius: "8px",
          boxShadow: 3,
          ".MuiAlert-icon": {
            color: textColor,
            marginTop: "5px",
          },
        }}
      >
        <AlertTitle sx={{ fontWeight: 600 }}>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
}

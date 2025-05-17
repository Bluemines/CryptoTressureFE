"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import useAgreement from "../hooks";
import { Button, CircularProgress } from "@mui/material";
// import "react-quill/dist/quill.snow.css"

const AgreementManagement = () => {
  const { value, setValue, handleAddAgreement, pending } = useAgreement();

  return (
    <div className="h-[70vh] bg-[#262626] text-white p-4">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        className="h-[90%]"
      />
      {pending ? (
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : (
        <Button
          variant="contained"
          fullWidth
          sx={{ bgcolor: "#7367F0", textTransform: "none" }}
          onClick={handleAddAgreement}
        >
          Add Agreement
        </Button>
      )}
    </div>
  );
};

export default AgreementManagement;

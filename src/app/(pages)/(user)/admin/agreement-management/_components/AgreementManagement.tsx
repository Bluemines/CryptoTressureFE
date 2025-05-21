"use client"

import React from "react"
import ReactQuill from "react-quill-new"
import useAgreement from "../hooks"
import { Button, CircularProgress } from "@mui/material"

const AgreementManagement = () => {
  const { value, setValue, handleAddAgreement, pending } = useAgreement()

  return (
    <div className='h-[70vh] bg-[#262626] text-white p-4 flex flex-col'>
      <ReactQuill
        theme='snow'
        value={value}
        onChange={setValue}
        className='flex-1 mb-4'
      />
      {pending ? (
        <div className='flex justify-center'>
          <CircularProgress sx={{ color: "#7367F0" }} />
        </div>
      ) : (
        <div className='mt-22 md:mt-12'>
          <Button
            variant='contained'
            fullWidth
            sx={{ bgcolor: "#7367F0", textTransform: "none" }}
            onClick={handleAddAgreement}
          >
            Add Agreement
          </Button>
        </div>
      )}
    </div>
  )
}

export default AgreementManagement

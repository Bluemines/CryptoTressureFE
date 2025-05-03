"use client"

import React, { useState } from "react"
import ReactQuill from "react-quill-new"
// import "react-quill/dist/quill.snow.css"

const AgreementManagement = () => {
  const [value, setValue] = useState("")

  return (
    <div className="h-[70vh] bg-[#262626] text-white p-4">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        className="h-[90%]"
      />
    </div>
  )
}

export default AgreementManagement

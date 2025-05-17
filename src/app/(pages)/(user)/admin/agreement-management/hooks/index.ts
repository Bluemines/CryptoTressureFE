import { addAgreementApi } from "@/api/agreements";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function useAgreement() {
  const [value, setValue] = useState("");
  const { mutateAsync: addAgreement, isPending: pending } = useMutation({
    mutationFn: addAgreementApi.mutationFn,
  });
  const handleAddAgreement = async () => {
    try {
      const response = await addAgreement({ agreement: value });
      if (response.agreement) {
        toast("Added Successfully");
      } else {
        toast(response.message);
      }
    } catch (error: any) {
      toast(error.response.data.message);
    }
  };
  return { value, handleAddAgreement, setValue, pending };
}

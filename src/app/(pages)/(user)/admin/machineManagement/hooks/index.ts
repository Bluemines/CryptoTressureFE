import React, { useEffect, useState } from "react";
import { FormSubmitHandler, useForm } from "react-hook-form";
import { AddMachineFormType } from "../types";
import { addMachineSchema } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addMachineApi,
  DeleteMachineByID,
  getMachinesApi,
} from "@/api/machineManagement";
import { useMachineStore } from "@/store/machinesStore";

export default function useMachineManagement() {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<AddMachineFormType>({
    resolver: yupResolver(addMachineSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      dailyIncome: "",
      fee: "",
      rentalDays: 0,
    },
  });
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("image", file);
    }
  };
  const {
    mutateAsync: addMachine,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: addMachineApi.mutationFn,
  });
  const [message, setMessage] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const handleAddMachine: FormSubmitHandler<AddMachineFormType> = async (
    data
  ) => {
    if (!selectedImage) {
      setOpenToast(true);
      setMessage("Please uplaod an Image");
      return;
    }
    try {
      setMessage("");
      const { title, description, price, dailyIncome, fee, rentalDays } =
        data as any;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("dailyIncome", dailyIncome);
      formData.append("fee", fee);
      formData.append("rentalDays", rentalDays);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await addMachine({ body: formData });
      console.log(response);
      if (response.success === true) {
        setOpenToast(true);
        setMessage("Product Added Successfully");
      }
      if (response.success === false) {
        setOpenToast(true);
        setMessage(response.success);
      }
    } catch (err: any) {
      setOpenToast(true);
      setOpenToast(true);
      setMessage(err.message);
    }
  };
  console.log("hello")
  const { machines, setAllMachines, deleteMachineById } = useMachineStore();
  const {
    data: allMacchines,
    isLoading,
    refetch,
    isError: onError,
    isSuccess: onSuccess,
  } = useQuery(getMachinesApi());
  const getMachines = () => {
    if (onSuccess) {
      if (allMacchines?.data?.items) {
        setAllMachines(allMacchines.data.items);
      }
    }
    if (isError) {
      setOpenToast(true);
      setMessage(error.message);
    }
  };
  useEffect(() => {
    if (allMacchines) {
      getMachines();
    }
  }, [allMacchines]);
  const { mutateAsync: deleteMachine } = useMutation({
    mutationFn: DeleteMachineByID.mutationFn,
  });
  const handleDeleteMachine = async (id: string) => {
    try {
      const response = await deleteMachine(id);
      deleteMachineById(Number(id));
      console.log("delete: ", response);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const getMachineById = (id: string) => {
    return machines.find((machine) => machine.id === Number(id)) || null;
  };
  const [currentMachineId, setCurrentMachineId] = useState("");
  const handelSetEditValues = (id: string) => {
    const machine = getMachineById(id);
    setCurrentMachineId(String(machine?.id));
    console.log("machine: ", machine);
    reset({
      title: machine?.title,
      description: machine?.description,
      price: machine?.price,
      dailyIncome: machine?.dailyIncome,
      image: machine?.image,
      fee: machine?.fee,
      rentalDays: machine?.rentalDays,
    });
  };
  const values = getValues();
  console.log("values: ", values);

  const selectedImage = watch("image");
  return {
    control,
    errors,
    handleSubmit,
    selectedImage,
    handleImageSelect,
    handleAddMachine,
    isValid,
    message,
    setOpenToast,
    openToast,
    machines,
    handleDeleteMachine,
    handelSetEditValues,
    currentMachineId
  };
}
// import React, { useEffect, useState } from "react";
// import { FormSubmitHandler, useForm } from "react-hook-form";
// import { AddMachineFormType } from "../types";
// import { addMachineSchema } from "../schema";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import {
//   addMachineApi,
//   DeleteMachineByID,
//   getMachinesApi,
// } from "@/api/machineManagement";
// import { useMachineStore } from "@/store/machinesStore";

// export default function useMachineManagement() {
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [currentMachineId, setCurrentMachineId] = useState<number | null>(null);
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     getValues,
//     watch,
//     reset,
//     formState: { errors, isValid },
//   } = useForm<AddMachineFormType>({
//     resolver: yupResolver(addMachineSchema),
//     mode: "onChange",
//     defaultValues: {
//       title: "",
//       description: "",
//       price: "",
//       dailyIncome: "",
//       fee: "",
//       rentalDays: 0,
//     },
//   });

//   const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedImage(file);
//       setValue("image", file);
//     }
//   };

//   const {
//     mutateAsync: addMachine,
//     isSuccess,
//     isError,
//     error,
//   } = useMutation({
//     mutationFn: addMachineApi.mutationFn,
//   });

//   const [message, setMessage] = useState("");
//   const [openToast, setOpenToast] = useState(false);

//   const handleAddMachine: FormSubmitHandler<AddMachineFormType> = async (
//     data
//   ) => {
//     if (!selectedImage && !isEditMode) {
//       setOpenToast(true);
//       setMessage("Please upload an Image");
//       return;
//     }

//     try {
//       setMessage("");
//       const { title, description, price, dailyIncome, fee, rentalDays } =
//         data as any;

//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append("price", price);
//       formData.append("dailyIncome", dailyIncome);
//       formData.append("fee", fee);
//       formData.append("rentalDays", String(rentalDays));

//       if (selectedImage) {
//         formData.append("image", selectedImage);
//       }

//       // If in edit mode, add the machine ID to the request
//       if (isEditMode && currentMachineId) {
//         formData.append("id", String(currentMachineId));
//         // Add your edit machine API call here
//       }

//       const response = await addMachine({ body: formData });

//       if (response.success === true) {
//         setOpenToast(true);
//         setMessage(
//           isEditMode
//             ? "Machine Updated Successfully"
//             : "Machine Added Successfully"
//         );
//         resetForm();
//       }

//       if (response.success === false) {
//         setOpenToast(true);
//         setMessage(response.message || "Operation failed");
//       }
//     } catch (err: any) {
//       setOpenToast(true);
//       setMessage(err.message);
//     }
//   };

//   const resetForm = () => {
//     reset({
//       title: "",
//       description: "",
//       price: "",
//       dailyIncome: "",
//       fee: "",
//       rentalDays: 0,
//     });
//     setSelectedImage(null);
//     setIsEditMode(false);
//     setCurrentMachineId(null);
//   };

//   const { machines, setAllMachines, deleteMachineById } = useMachineStore();

//   const {
//     data: allMacchines,
//     isLoading,
//     refetch,
//     isError: onError,
//     isSuccess: onSuccess,
//   } = useQuery(getMachinesApi());

//   const getMachines = () => {
//     if (onSuccess) {
//       if (allMacchines?.data?.items) {
//         setAllMachines(allMacchines.data.items);
//       }
//     }
//     if (isError) {
//       setOpenToast(true);
//       setMessage(error.message);
//     }
//   };

//   useEffect(() => {
//     if (allMacchines) {
//       getMachines();
//     }
//   }, [allMacchines]);

//   const { mutateAsync: deleteMachine } = useMutation({
//     mutationFn: DeleteMachineByID.mutationFn,
//   });

//   const handleDeleteMachine = async (id: string) => {
//     try {
//       const response = await deleteMachine(id);
//       deleteMachineById(Number(id));
//       if (response.success === true) {
//         setOpenToast(true);
//         setMessage("Machine Deleted Successfully");
//       } else {
//         setMessage(response.message);
//       }
//     } catch (error:any) {
//       setOpenToast(true);
//       setMessage(error);
//     }
//   };

//   const getMachineById = (id: string) => {
//     return machines.find((machine) => machine.id === Number(id)) || null;
//   };

//   const handelSetEditValues = (id: string) => {
//     const machine = getMachineById(id);
//     console.log("machine for editing: ", machine);

//     if (machine) {
//       // Use setValue for each field individually instead of reset()
//       setValue("title", machine.title || "", {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//       setValue("description", machine.description || "", {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//       setValue("price", machine.price || "", {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//       setValue("dailyIncome", machine.dailyIncome || "", {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//       setValue("fee", machine.fee || "", {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//       setValue("rentalDays", machine.rentalDays || 0, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });

//       // Set edit mode and current machine ID
//       setIsEditMode(true);
//       setCurrentMachineId(machine.id);
//     }
//   };

//   // Clear form and reset edit mode
//   const handleCancelEdit = () => {
//     resetForm();
//   };

//   return {
//     control,
//     errors,
//     handleSubmit,
//     selectedImage,
//     handleImageSelect,
//     handleAddMachine,
//     isValid,
//     message,
//     setOpenToast,
//     openToast,
//     machines,
//     handleDeleteMachine,
//     handelSetEditValues,
//     isEditMode,
//     handleCancelEdit,
//   };
// }

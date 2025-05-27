import { mutationFn, queryFn } from "@/app/utils/axios";
import { AddMachineType, EditMachineType } from "./types";
import { MachineItem } from "@/store/machinesStore";

interface ApiResponse {
    data: {
      items: MachineItem[]; 
    };
    status: string;
    message: string;
  }
  
export const addMachineApi = {
  mutationFn: (body: AddMachineType) => {
    return mutationFn("products", "POST", body.body);
  },
};
export const editMachineApi = {
  mutationFn: ({ id, body }: EditMachineType) => {
    return mutationFn(`products/${id}`, "PATCH", body);
  },
};

export const getMachinesApi = () => ({
  queryKey: ["machines"],
  queryFn: () => queryFn(`products`) as Promise<ApiResponse>,
});
export const getMachinesById = (id: string) => ({
  queryKey: [`machine-${id}`],
  queryFn: () => queryFn(`products/${id}`),
});

export const DeleteMachineByID = {
  mutationFn: (id: string) => {
    console.log("id: ", id);
    return mutationFn(`products/${id}`, "DELETE");
  },
};

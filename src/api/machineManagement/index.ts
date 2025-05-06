import { mutationFn, queryFn } from "@/app/utils/axios";
import { AddMachineType } from "./types";


export const addMachineApi = {
    mutationFn: (body: AddMachineType) => {
        return mutationFn('products', 'POST', body);
    },
};

export const getMachinesApi = () => ({
    queryKey: ['machines'],
    queryFn: () => queryFn(`products`),
});

export const DeleteMachineByID = {
    mutationFn: (id: string) => {
        console.log("id: ",id)
        return mutationFn(`products/${id}`, 'DELETE');
    },
};
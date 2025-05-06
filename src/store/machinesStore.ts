import { create } from "zustand";

interface MachineItem {
  id: number;
  title: string;
  description: string;
  price: string;
  dailyIncome: string;
  fee: string;
  rentalDays: number;
  image: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface MachineStore {
  machines: MachineItem[];
  setAllMachines: (machines: MachineItem[]) => void;
  addMachine: (machine: MachineItem) => void;
  deleteMachineById: (id: number) => void;
}

export const useMachineStore = create<MachineStore>((set) => ({
  machines: [],

  setAllMachines: (machines) =>
    set(() => ({
      machines: machines,
    })),

  addMachine: (machine) =>
    set((state) => ({
      machines: [...state.machines, machine],
    })),

  deleteMachineById: (id) =>
    set((state) => ({
      machines: state.machines.filter((machine) => machine.id !== id),
    })),
}));

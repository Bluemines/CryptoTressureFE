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

interface Machine {
  machines: MachineItem[];
  setMachines: (newMachines: MachineItem) => void;
  deleteMachine: (id: number) => void;
}
export const useMachineStore = create<Machine>((set) => ({
  machines: [],
  setMachines: (newMachine) =>
    set((state) => ({ machines: [...state.machines, newMachine] })),
  deleteMachine: (id) =>
    set((state) => ({
      machines: state.machines.filter((mac) => mac.id !== id),
    })),
}));

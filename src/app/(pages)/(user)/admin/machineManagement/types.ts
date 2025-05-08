export interface AddMachineFormType {
    title: string;
    description: string;
    price: string;
    dailyIncome: string;
    fee: string;
    rentalDays: number;
    image?: File; 
  }
  
  export interface MachineData {
    id: number;
    title: string;
    description: string;
    price: string;
    dailyIncome: string;
    fee: string;
    rentalDays: number;
    roiPercent: number;
    image: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    userId: number;
  }
  
  export interface MachineResponse {
    data: MachineData;
  }
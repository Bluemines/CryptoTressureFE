// api/levels.ts
import { mutationFn, queryFn } from "@/app/utils/axios";
import { RawLevel } from "@/store/levelsStore";

interface IAddLevelValue {
  level: number;
  points: number;
}

export const addLevelApi = {
  mutationFn: (body: IAddLevelValue) => {
    return mutationFn("levels", "POST", body);
  },
};

export const getAllLevelsApi = () => ({
    queryKey: ["levels-admin"],
    queryFn: async (): Promise<RawLevel[]> => {
      const response = await queryFn<{ data: RawLevel[] }>("levels");
      return response.data; // 👈 extract the array
    },
  });
  

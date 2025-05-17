// types/levels.ts
import { create } from "zustand";

export interface RawLevel {
    id: number;
    level: number;
    points: number;
  }
  
  export interface FlatLevel {
    id: number;
    level: number;
    points: number;
  }
// store/useLevelStore.ts

interface LevelStore {
  levels: FlatLevel[];
  setAllLevels: (items: RawLevel[]) => void;
  addLevel: (item: RawLevel) => void;
}

export const useLevelStore = create<LevelStore>((set) => ({
  levels: [],
  setAllLevels: (items) =>
    set(() => ({
      levels: items.map((i) => ({
        id: i.id,
        level: i.level,
        points: i.points,
      })),
    })),
  addLevel: (item) =>
    set((state) => ({
      levels: [
        ...state.levels,
        {
          id: item.id,
          level: item.level,
          points: item.points,
        },
      ],
    })),
}));
  
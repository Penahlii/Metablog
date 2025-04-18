import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      darkmode: false,
      toggle: () => set((state) => ({ darkmode: !state.darkmode })),
    }),
    {
      name: "darkmode",
    }
  )
);

import { create } from "zustand";

const useDashboardStore =
  create((set) => ({
    activeHub:
      "Preparation Status",

    setActiveHub:
      (activeHub) =>
        set({
          activeHub,
        }),
  }));

export default
  useDashboardStore;
import { create } from "zustand";

type role = {
  role: "admin" | "viewer" | null;
  setRole: (role: "admin" | "viewer" | null) => void;
};

export const useRole = create<role>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));

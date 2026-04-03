import { create } from "zustand"

type store = {
    role: "admin" | "viewer" | null;
    setRole: (role: "admin" | "viewer" | null) => void
}

export const useStore = create<store>((set) => ({
    role: null,
    setRole: (role) => set({ role })
}))
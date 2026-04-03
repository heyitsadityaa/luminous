import { useStore } from "@/store/useStore";

export default function useIsAdmin() {
    const role = useStore((state) => state.role)

    return role === "admin"
}
import { useStore } from "@/store/useRole";

export default function useIsAdmin() {
    const role = useStore((state) => state.role)

    return role === "admin"
}
import { useRole } from "@/store/useRole";

export default function useIsAdmin() {
    const role = useRole((state) => state.role)

    return role === "admin"
}
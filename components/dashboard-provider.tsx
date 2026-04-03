import React, { useEffect } from 'react'

import { useStore } from '@/store/useStore'

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const setRole = useStore((state) => state.setRole)

    useEffect(() => {
        const role = localStorage.getItem("ledger-role") as "admin" | "viewer" | null;

        setRole(role)
    }, [setRole])

    return (
        <>
            {children}
        </>
    )
}

export default DashboardProvider

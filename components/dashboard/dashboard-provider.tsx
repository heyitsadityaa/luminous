"use client"

import React, { useEffect } from 'react'

import { useRole } from '@/store/useRole'

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const setRole = useRole((state) => state.setRole)

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

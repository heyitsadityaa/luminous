"use client"

import { Skeleton } from "@/components/ui/skeleton"

const DashboardSkeleton = () => {
    return (
        <div className="px-4 py-6 md:px-6 md:py-8">
            <div className="mx-auto grid w-full max-w-350 grid-cols-1 gap-8 md:grid-cols-12 md:auto-rows-[90px]">
                <div className="md:col-span-12 md:row-span-1">
                    <Skeleton className="h-24 w-full rounded-xl ring-1 ring-foreground/10 md:h-full" />
                </div>

                <div className="md:col-span-4 md:row-span-7 w-full h-full">
                    <Skeleton className="h-72 w-full rounded-xl ring-1 ring-foreground/10 md:h-full" />
                </div>

                <div className="md:col-span-5 md:row-span-4 w-full h-full">
                    <Skeleton className="h-60 w-full rounded-xl ring-1 ring-foreground/10 md:h-full" />
                </div>

                <div className="md:col-span-3 md:row-span-2 w-full h-full">
                    <Skeleton className="h-36 w-full rounded-xl ring-1 ring-foreground/10 md:h-full" />
                </div>

                <div className="md:col-span-3 md:row-span-2 w-full h-full">
                    <Skeleton className="h-36 w-full rounded-xl ring-1 ring-foreground/10 md:h-full" />
                </div>

                <div className="md:col-span-4 md:row-span-3 w-full h-full">
                    <Skeleton className="h-44 w-full rounded-xl ring-1 ring-foreground/10 md:h-full" />
                </div>

                <div className="md:col-span-4 md:row-span-6 grid gap-8 md:auto-rows-[90px] md:grid-cols-1">
                    <div className="md:row-span-5 md:col-span-4">
                        <Skeleton className="h-52 w-full rounded-xl ring-1 ring-foreground/10 md:h-full" />
                    </div>
                    <div className="md:row-span-2 md:col-span-4">
                        <Skeleton className="h-32 w-full rounded-xl ring-1 ring-foreground/10 md:h-full" />
                    </div>
                </div>

                <div className="md:col-span-8 md:row-span-4 w-full h-full">
                    <Skeleton className="h-64 w-full rounded-xl ring-1 ring-foreground/10 md:h-full" />
                </div>
            </div>
        </div>
    )
}

export default DashboardSkeleton;
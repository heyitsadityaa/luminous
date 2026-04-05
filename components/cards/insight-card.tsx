import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { cn } from '@/lib/utils'

type InsightVariant = "rings" | "dots" | "diagonal" | "brackets"

const patterns: Record<InsightVariant, React.ReactNode> = {
    rings: (
        <>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border border-border opacity-40" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full border border-border opacity-30" />
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />
        </>
    ),
    dots: (
        <>
            <div className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                }}
            />
            <div className="absolute top-3 right-3 w-8 h-8 rounded-lg border border-primary opacity-60" />
            <div className="absolute top-5 right-5 w-4 h-4 rounded-md bg-primary opacity-40" />
        </>
    ),
    diagonal: (
        <>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary opacity-10" />
            <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.06]"
                style={{
                    backgroundImage: "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
                    backgroundSize: "8px 8px",
                }}
            />
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-primary" />
            <div className="absolute bottom-7 right-7 w-1.5 h-1.5 rounded-full bg-primary opacity-50" />
        </>
    ),
    brackets: (
        <>
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary opacity-60 rounded-tr-sm" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary opacity-60 rounded-bl-sm" />
            <div className="absolute bottom-6 right-6 w-16 h-16 rounded-full border border-border opacity-20" />
        </>
    ),
}

const InsightCard = ({
    cardHeader,
    cardDescription,
    variant = "rings",
    className,
}: {
    cardHeader: string
    cardDescription: string
    variant?: InsightVariant
    className?: string
}) => {
    return (
        <Card className={cn("aspect-square w-full h-full relative overflow-hidden", className)}>

            {patterns[variant]}

            <CardHeader className="pb-0">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                    Insight
                </p>
            </CardHeader>

            <CardContent className="flex flex-col justify-end h-[calc(100%-60px)]">
                <div className="space-y-1.5">
                    <p className="text-2xl font-bold leading-tight tracking-tight">
                        {cardHeader}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        {cardDescription}
                    </p>
                </div>
            </CardContent>

        </Card>
    )
}

export default InsightCard
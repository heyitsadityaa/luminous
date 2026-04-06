"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

export const description = "Portfolio allocation vs returns performance"

export const chartData = [
    { category: "Finance", invested: 12300, returns: 9000 },
    { category: "FMCG", invested: 5475, returns: 8757 },
    { category: "Defense", invested: 16000, returns: 25000 },
    { category: "Energy", invested: 7659, returns: 9780 },
    { category: "IT", invested: 8900, returns: 12345 },
]

export const chartConfig = {
    invested: {
        label: "Invested",
        color: "var(--chart-1)",
    },
    returns: {
        label: "Returns",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function InvestmentsCard({ className }: { className: string }) {
    return (
        <Card className={cn("w-full h-full", className)}>
            <CardHeader className="items-center pb-4">
                <CardTitle className="font-semibold text-lg">Portfolio Snapshot</CardTitle>
                <CardDescription>
                    Sectoral investment mix and return momentum.
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-60"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <PolarAngleAxis dataKey="category" />
                        <PolarGrid radialLines={false} />
                        <Radar
                            dataKey="invested"
                            fill="var(--color-invested)"
                            fillOpacity={0}
                            stroke="var(--color-invested)"
                            strokeWidth={4}
                        />
                        <Radar
                            dataKey="returns"
                            fill="var(--color-returns)"
                            fillOpacity={0}
                            stroke="var(--color-returns)"
                            strokeWidth={4}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

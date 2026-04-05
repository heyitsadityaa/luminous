"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TREND_DESCRIPTION, TREND_NAME } from "@/constant/trend-chart"
import { cn } from "@/lib/utils"

// Realistic data — spikes explained:
// Jun: Goa trip 🏖️
// Aug: Laptop purchased
// Oct: Dussehra/Diwali shopping + travel home
// Dec: Christmas vacation + gifts
// Feb: Relatively quiet month, stayed in
const chartData = [
    { month: "2024-05", expense: 36400 },
    { month: "2024-06", expense: 61800 }, // Goa vacation
    { month: "2024-07", expense: 38200 },
    { month: "2024-08", expense: 67400 }, // Laptop + accessories
    { month: "2024-09", expense: 35100 },
    { month: "2024-10", expense: 58900 }, // Diwali + travel home
    { month: "2024-11", expense: 41200 },
    { month: "2024-12", expense: 72600 }, // Christmas vacation + gifts
    { month: "2025-01", expense: 37600 },
    { month: "2025-02", expense: 29800 }, // Quiet month
    { month: "2025-03", expense: 44100 },
    { month: "2025-04", expense: 34350 },
]

const chartConfig = {
    expense: {
        label: "Expenses",
        color: "var(--primary)",
    },
} satisfies ChartConfig

export function TrendChart({ className }: { className?: string }) {
    const [timeRange, setTimeRange] = React.useState("6m")

    const filteredData = chartData.filter((item) => {
        const [year, month] = item.month.split("-").map(Number)
        const itemDate = new Date(year, month - 1)
        const now = new Date(2025, 3)
        const monthsToSubtract = timeRange === "3m" ? 3 : timeRange === "6m" ? 6 : 12
        const startDate = new Date(now)
        startDate.setMonth(now.getMonth() - monthsToSubtract)
        return itemDate >= startDate
    })

    const formatCurrency = (value: number) =>
        `₹${(value / 1000).toFixed(0)}k`

    const formatMonth = (value: string) => {
        const [year, month] = value.split("-")
        return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-IN", {
            month: "short",
            year: "2-digit",
        })
    }

    // spike annotation labels
    const spikeReasons: Record<string, string> = {
        "2024-06": "Goa Trip",
        "2024-08": "Laptop",
        "2024-10": "Diwali",
        "2024-12": "Vacation",
    }

    return (
        <Card className={cn("", className)}>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle className="font-semibold text-lg">{TREND_NAME}</CardTitle>
                    <CardDescription>
                        {TREND_DESCRIPTION}
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select time range"
                    >
                        <SelectValue placeholder="Last 6 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl p-2">
                        <SelectItem value="3m" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="6m" className="rounded-lg">
                            Last 6 months
                        </SelectItem>
                        <SelectItem value="12m" className="rounded-lg">
                            Last 12 months
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-62.5 w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--primary)"
                                    stopOpacity={0.25}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--primary)"
                                    stopOpacity={0.0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={formatMonth}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={formatCurrency}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        const reason = spikeReasons[value]
                                        return `${formatMonth(value)}${reason ? ` · ${reason}` : ""}`
                                    }}
                                    formatter={(value) =>
                                        `₹${Number(value).toLocaleString("en-IN")}`
                                    }
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="expense"
                            type="natural"
                            fill="url(#fillExpense)"
                            stroke="var(--primary)"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{
                                r: 5,
                                fill: "var(--primary)",
                                strokeWidth: 0,
                            }}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
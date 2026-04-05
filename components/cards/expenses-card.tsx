"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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
} from "@/components/ui/chart"
import { EXPENSE_NAME, EXPENSE_DESCRIPTION, EXPENSE_CONFIG, EXPENSE_DATA } from "@/constant/expense"
import { cn } from "@/lib/utils"

export default function ExpensesCard({ className }: { className?: string }) {
    const totalExpense = React.useMemo(() => {
        return EXPENSE_DATA.reduce((acc, curr) => acc + curr.amount, 0)
    }, [])

    return (
        <Card className={cn("flex flex-col max-w-xs", className)}>
            <CardHeader className="items-center">
                <CardTitle className="font-semibold text-lg">{EXPENSE_NAME}</CardTitle>
                <CardDescription>{EXPENSE_DESCRIPTION}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={EXPENSE_CONFIG}
                    className="mx-auto aspect-square max-h-60"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={EXPENSE_DATA}
                            dataKey="amount"
                            nameKey="category"
                            innerRadius={60}
                            strokeWidth={20}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    ₹{totalExpense.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Expenses
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

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
    ChartLegend,
    ChartLegendContent,
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
        <Card className={cn("flex flex-col ", className)}>
            <CardHeader className="items-center">
                <CardTitle className="font-semibold text-lg">{EXPENSE_NAME}</CardTitle>
                <CardDescription>{EXPENSE_DESCRIPTION}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 items-center justify-center pb-0">
                <ChartContainer
                    config={EXPENSE_CONFIG}
                    className="mx-auto aspect-square max-h-64 md:max-h-72 lg:max-h-80"
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
                                        const cx = viewBox.cx
                                        const cy = viewBox.cy

                                        return (
                                            <text
                                                x={cx}
                                                y={cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={cx}
                                                    y={cy - 20}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    ₹{totalExpense.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={cx}
                                                    y={cy - 2}
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
                        <ChartLegend
                            content={<ChartLegendContent nameKey="category" />}
                            className="flex-wrap gap-2 justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

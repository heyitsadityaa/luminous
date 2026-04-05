"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    TrendingUp,
    TrendingDown,
    Wifi,
    ShieldCheck,
    Bell,
    BarChart2,
    Landmark,
} from "lucide-react"
import { cn } from "@/lib/utils"

const OVERVIEW_DATA = {
    totalBalance: 284500,
    totalIncome: 85000,
    totalExpense: 34350,
    creditOutstanding: 24800,
    creditDueDate: "Apr 15, 2025",
    creditLimit: 100000,
    savingsGoal: 500000,
    currentSavings: 284500,
    investments: [
        {
            label: "Nifty 50 SIP",
            icon: BarChart2,
            amount: 10000,
            returns: "+12.4%",
            positive: true,
            sub: "Auto on 10th",
        },
        {
            label: "PPF Account",
            icon: Landmark,
            amount: 15000,
            returns: "+7.1%",
            positive: true,
            sub: "Locked till 2031",
        }
    ],
    recentAlerts: [
        { label: "Credit bill due in 3 days", type: "warning" },
        { label: "SIP debited successfully", type: "success" },
    ],
}

const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount)

const totalInvested = OVERVIEW_DATA.investments.reduce(
    (acc, i) => acc + i.amount,
    0
)

const savingsProgress = Math.round(
    (OVERVIEW_DATA.currentSavings / OVERVIEW_DATA.savingsGoal) * 100
)

const creditUsed = Math.round(
    (OVERVIEW_DATA.creditOutstanding / OVERVIEW_DATA.creditLimit) * 100
)

export function OverviewCard({ className }: { className?: string }) {
    return (
        <Card className={cn("max-w-xl dark:bg-primary dark:text-black bg-foreground text-background", className)}>
            <CardHeader className="pb-2">
                <span className="text-xs font-medium uppercase tracking-widest opacity-60">
                    Total Balance
                </span>
                <div className="flex items-end gap-1">
                    <span className="font-mono text-4xl font-bold tracking-tight">
                        {formatINR(OVERVIEW_DATA.totalBalance).replace("₹", "")}
                    </span>
                    <span className="font-mono text-lg font-semibold mb-0.5 opacity-70">
                        ₹
                    </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs opacity-60">vs last month</span>
                    <Badge className="text-xs px-1.5 py-0 dark:bg-black/20 bg-white/20 dark:text-black text-background border-0">
                        ↑ 8.2%
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-5">

                {/* Income / Expense / Savings row */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs opacity-60">Income</span>
                        <span className="font-mono font-semibold text-sm">
                            {formatINR(OVERVIEW_DATA.totalIncome)}
                        </span>
                        <span className="text-xs opacity-50">This month</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs opacity-60">Expenses</span>
                        <span className="font-mono font-semibold text-sm">
                            {formatINR(OVERVIEW_DATA.totalExpense)}
                        </span>
                        <span className="text-xs opacity-50">This month</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs opacity-60">Saved</span>
                        <span className="font-mono font-semibold text-sm">
                            {formatINR(OVERVIEW_DATA.totalIncome - OVERVIEW_DATA.totalExpense)}
                        </span>
                        <span className="text-xs opacity-50">
                            {Math.round(
                                ((OVERVIEW_DATA.totalIncome - OVERVIEW_DATA.totalExpense) /
                                    OVERVIEW_DATA.totalIncome) *
                                100
                            )}% rate
                        </span>
                    </div>
                </div>

                <Separator className="dark:bg-black/20 bg-white/20" />

                {/* Savings Goal Progress */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold">Savings Goal</span>
                        <span className="font-mono text-xs opacity-70">
                            {formatINR(OVERVIEW_DATA.currentSavings)} / {formatINR(OVERVIEW_DATA.savingsGoal)}
                        </span>
                    </div>
                    <Progress
                        value={savingsProgress}
                        className="h-1.5 dark:bg-black/20 bg-white/20 *:data-[slot=progress-indicator]:bg-primary dark:*:data-[slot=progress-indicator]:bg-black"
                    />
                    <span className="text-xs opacity-50">{savingsProgress}% of annual goal reached</span>
                </div>

                <Separator className="dark:bg-black/20 bg-white/20" />

                {/* Debit Card Mockup */}
                <div className="relative rounded-2xl p-4 overflow-hidden dark:bg-black/20 bg-white/10 border dark:border-black/10 border-white/10">
                    <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full dark:bg-black/10 bg-white/10" />
                    <div className="absolute -bottom-8 -right-2 w-36 h-36 rounded-full dark:bg-black/10 bg-white/5" />
                    <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-widest opacity-70">
                                Ledger Bank
                            </span>
                            <Wifi className="w-4 h-4 rotate-90 opacity-60" />
                        </div>
                        <div className="w-8 h-6 rounded-md dark:bg-black/30 bg-white/30 border dark:border-black/20 border-white/20 grid grid-cols-2 grid-rows-2 gap-px p-1">
                            <div className="rounded-sm dark:bg-black/40 bg-white/40" />
                            <div className="rounded-sm dark:bg-black/40 bg-white/40" />
                            <div className="rounded-sm dark:bg-black/40 bg-white/40" />
                            <div className="rounded-sm dark:bg-black/40 bg-white/40" />
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="font-mono text-xs opacity-60 mb-0.5 tracking-widest">
                                    •••• •••• •••• 4455
                                </div>
                                <div className="font-semibold text-sm">Aditya Prakash</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs opacity-60 mb-0.5">Expires</div>
                                <div className="font-mono text-xs font-semibold">08/27</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Credit Card Usage */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold">Credit Card</span>
                            <Badge className="text-xs px-1.5 py-0 dark:bg-black/20 bg-white/20 border-0 dark:text-black text-background">
                                Due {OVERVIEW_DATA.creditDueDate}
                            </Badge>
                        </div>
                        <span className="font-mono text-xs font-semibold">
                            {formatINR(OVERVIEW_DATA.creditOutstanding)}
                        </span>
                    </div>
                    <Progress
                        value={creditUsed}
                        className="h-1.5 dark:bg-black/20 bg-white/20 *:data-[slot=progress-indicator]:bg-primary dark:*:data-[slot=progress-indicator]:bg-black"
                    />
                    <div className="flex justify-between">
                        <span className="text-xs opacity-50">{creditUsed}% of limit used</span>
                        <span className="text-xs opacity-50">Limit {formatINR(OVERVIEW_DATA.creditLimit)}</span>
                    </div>
                </div>

                <Separator className="dark:bg-black/20 bg-white/20" />

                {/* Investments */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-widest opacity-60">
                            Investments
                        </span>
                        <span className="font-mono text-xs font-bold">
                            {formatINR(totalInvested)} total
                        </span>
                    </div>
                    {OVERVIEW_DATA.investments.map((inv) => (
                        <div
                            key={inv.label}
                            className="flex items-center justify-between rounded-xl dark:bg-black/10 bg-white/10 border dark:border-black/10 border-white/10 px-3 py-2.5"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg dark:bg-black/20 bg-white/20 flex items-center justify-center shrink-0">
                                    <inv.icon className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold">{inv.label}</span>
                                    <span className="text-xs opacity-50">{inv.sub}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-0.5">
                                <span className="font-mono text-sm font-bold">
                                    {formatINR(inv.amount)}
                                </span>
                                <div className={`flex items-center gap-0.5 text-xs font-medium ${inv.positive ? "opacity-80" : "opacity-60"}`}>
                                    {inv.positive
                                        ? <TrendingUp className="w-3 h-3" />
                                        : <TrendingDown className="w-3 h-3" />
                                    }
                                    {inv.returns}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Separator className="dark:bg-black/20 bg-white/20" />

                {/* Alerts */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                        <Bell className="w-3.5 h-3.5 opacity-60" />
                        <span className="text-xs font-semibold uppercase tracking-widest opacity-60">
                            Alerts
                        </span>
                    </div>
                    {OVERVIEW_DATA.recentAlerts.map((alert) => (
                        <div
                            key={alert.label}
                            className="flex items-center gap-2.5 rounded-xl dark:bg-black/10 bg-white/10 border dark:border-black/10 border-white/10 px-3 py-2.5"
                        >
                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${alert.type === "warning"
                                ? "bg-orange-400"
                                : alert.type === "success"
                                    ? "bg-green-400"
                                    : "bg-blue-400"
                                }`} />
                            <span className="text-xs">{alert.label}</span>
                        </div>
                    ))}
                </div>

                <Separator className="dark:bg-black/20 bg-white/20" />

                {/* Security Footer */}
                <div className="flex items-center justify-center gap-2 opacity-50">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="text-xs">256-bit encrypted · Data never leaves your device</span>
                </div>

            </CardContent>
        </Card>
    )
}
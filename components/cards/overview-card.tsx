"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  Wifi,
  ShieldCheck,
  Bell,
  BarChart2,
  Landmark,
  Download,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import exportFromJSON from "export-from-json";
import useIsAdmin from "@/hooks/useIsAdmin";

type AlertType = "warning" | "success" | "info";

type OverviewData = {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  creditOutstanding: number;
  creditDueDate: string;
  creditLimit: number;
  savingsGoal: number;
  currentSavings: number;
  investments: Array<{
    label: string;
    icon: typeof BarChart2;
    amount: number;
    returns: string;
    positive: boolean;
    sub: string;
  }>;
  recentAlerts: Array<{
    label: string;
    type: AlertType;
  }>;
};

const INITIAL_OVERVIEW_DATA: OverviewData = {
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
    },
  ],
  recentAlerts: [
    { label: "Credit bill due in 3 days", type: "warning" },
    { label: "SIP debited successfully", type: "success" },
  ],
};

const fileName = "dashboard_overview";
const exportType = exportFromJSON.types.csv;

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export function OverviewCard({ className }: { className?: string }) {
  const isAdmin = useIsAdmin();
  const [overviewData, setOverviewData] = useState<OverviewData>(
    INITIAL_OVERVIEW_DATA,
  );
  const [draftData, setDraftData] = useState<OverviewData>(
    INITIAL_OVERVIEW_DATA,
  );
  const [isEditing, setIsEditing] = useState(false);

  const totalInvested = useMemo(
    () => overviewData.investments.reduce((acc, i) => acc + i.amount, 0),
    [overviewData.investments],
  );

  const savingsProgress = Math.round(
    (overviewData.currentSavings / overviewData.savingsGoal) * 100,
  );
  const creditUsed = Math.round(
    (overviewData.creditOutstanding / overviewData.creditLimit) * 100,
  );

  const exportFile = () => {
    const exportData = [
      {
        totalBalance: overviewData.totalBalance,
        totalIncome: overviewData.totalIncome,
        totalExpense: overviewData.totalExpense,
        creditOutstanding: overviewData.creditOutstanding,
        creditDueDate: overviewData.creditDueDate,
        creditLimit: overviewData.creditLimit,
        savingsGoal: overviewData.savingsGoal,
        currentSavings: overviewData.currentSavings,
        investments: overviewData.investments
          .map((i) => `${i.label} (${i.returns}) - ${i.amount}`)
          .join(" | "),
        recentAlerts: overviewData.recentAlerts.map((a) => a.label).join(" | "),
      },
    ];

    exportFromJSON({ data: exportData, fileName, exportType });
  };

  const startEdit = () => {
    setDraftData(overviewData);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraftData(overviewData);
    setIsEditing(false);
  };

  const saveEdit = () => {
    setOverviewData(draftData);
    setIsEditing(false);
  };

  const updateDraftNumber = (key: keyof OverviewData, value: string) => {
    const parsed = Number(value);
    setDraftData((prev) => ({
      ...prev,
      [key]: Number.isNaN(parsed) ? 0 : parsed,
    }));
  };

  const updateDraftString = (key: keyof OverviewData, value: string) => {
    setDraftData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const viewData = isEditing ? draftData : overviewData;
  const viewTotalInvested = isEditing
    ? draftData.investments.reduce((acc, i) => acc + i.amount, 0)
    : totalInvested;
  const viewSavingsProgress = Math.round(
    (viewData.currentSavings / viewData.savingsGoal) * 100,
  );
  const viewCreditUsed = Math.round(
    (viewData.creditOutstanding / viewData.creditLimit) * 100,
  );

  return (
    <Card
      className={cn(
        "dark:bg-primary/80 dark:text-black bg-foreground text-background",
        className,
      )}
    >
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest opacity-60">
            Total Balance
          </span>
          <div className="flex items-end gap-1">
            {isEditing ? (
              <Input
                value={String(viewData.totalBalance)}
                onChange={(e) =>
                  updateDraftNumber("totalBalance", e.target.value)
                }
                className="h-8 w-36 bg-transparent border-white/30 text-white dark:text-black"
              />
            ) : (
              <span className="font-mono text-4xl font-bold tracking-tight">
                {formatINR(viewData.totalBalance).replace("₹", "")}
              </span>
            )}
            <span className="font-mono text-lg font-semibold mb-0.5 opacity-70">
              ₹
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && !isEditing && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon-lg"
                  onClick={startEdit}
                  className="shrink-0 text-black cursor-pointer hover:text-black"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-background dark:bg-white dark:text-black text-foreground"
              >
                <span>Edit</span>
              </TooltipContent>
            </Tooltip>
          )}

          {isAdmin && isEditing && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon-lg"
                    onClick={saveEdit}
                    className="shrink-0 text-black cursor-pointer hover:text-black"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-background dark:bg-white dark:text-black text-foreground"
                >
                  <span>Save</span>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon-lg"
                    onClick={cancelEdit}
                    className="shrink-0 text-black cursor-pointer hover:text-black"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-background dark:bg-white dark:text-black text-foreground"
                >
                  <span>Cancel</span>
                </TooltipContent>
              </Tooltip>
            </>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={exportFile}
                variant="outline"
                size="icon-lg"
                className="shrink-0 text-black cursor-pointer hover:text-black"
              >
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="bg-background dark:bg-white dark:text-black text-foreground"
            >
              <span>Export CSV</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs opacity-60">Income</span>
            {isEditing ? (
              <Input
                value={String(viewData.totalIncome)}
                onChange={(e) =>
                  updateDraftNumber("totalIncome", e.target.value)
                }
                className="h-8 bg-transparent border-white/30 text-white dark:text-black"
              />
            ) : (
              <span className="font-mono font-semibold text-sm">
                {formatINR(viewData.totalIncome)}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs opacity-60">Expenses</span>
            {isEditing ? (
              <Input
                value={String(viewData.totalExpense)}
                onChange={(e) =>
                  updateDraftNumber("totalExpense", e.target.value)
                }
                className="h-8 bg-transparent border-white/30 text-white dark:text-black"
              />
            ) : (
              <span className="font-mono font-semibold text-sm">
                {formatINR(viewData.totalExpense)}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs opacity-60">Saved</span>
            <span className="font-mono font-semibold text-sm">
              {formatINR(viewData.totalIncome - viewData.totalExpense)}
            </span>
          </div>
        </div>

        <Separator className="dark:bg-black/20 bg-white/20" />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold">Savings Goal</span>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  value={String(viewData.currentSavings)}
                  onChange={(e) =>
                    updateDraftNumber("currentSavings", e.target.value)
                  }
                  className="h-8 w-24 bg-transparent border-white/30 text-white dark:text-black"
                />
                <span>/</span>
                <Input
                  value={String(viewData.savingsGoal)}
                  onChange={(e) =>
                    updateDraftNumber("savingsGoal", e.target.value)
                  }
                  className="h-8 w-24 bg-transparent border-white/30 text-white dark:text-black"
                />
              </div>
            ) : (
              <span className="font-mono text-xs opacity-70">
                {formatINR(viewData.currentSavings)} /{" "}
                {formatINR(viewData.savingsGoal)}
              </span>
            )}
          </div>
          <Progress
            value={viewSavingsProgress}
            className="h-1.5 dark:bg-black/20 bg-white/20 *:data-[slot=progress-indicator]:bg-primary dark:*:data-[slot=progress-indicator]:bg-black"
          />
          <span className="text-xs opacity-50">
            {viewSavingsProgress}% of annual goal reached
          </span>
        </div>

        <Separator className="dark:bg-black/20 bg-white/20" />

        <div className="relative rounded-2xl p-4 overflow-hidden dark:bg-black/20 bg-white/10 border dark:border-black/10 border-white/10">
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full dark:bg-black/10 bg-white/10" />
          <div className="absolute -bottom-8 -right-2 w-36 h-36 rounded-full dark:bg-black/10 bg-white/5" />
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest opacity-70">
                State Bank of India
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold">Credit Card</span>
              <Badge className="text-xs px-1.5 py-0 dark:bg-black/20 bg-white/20 border-0 dark:text-black text-background">
                Due{" "}
                {isEditing ? (
                  <Input
                    value={viewData.creditDueDate}
                    onChange={(e) =>
                      updateDraftString("creditDueDate", e.target.value)
                    }
                    className="h-7 w-28 ml-1 bg-transparent border-white/30 text-white dark:text-black"
                  />
                ) : (
                  viewData.creditDueDate
                )}
              </Badge>
            </div>
            {isEditing ? (
              <Input
                value={String(viewData.creditOutstanding)}
                onChange={(e) =>
                  updateDraftNumber("creditOutstanding", e.target.value)
                }
                className="h-8 w-24 bg-transparent border-white/30 text-white dark:text-black"
              />
            ) : (
              <span className="font-mono text-xs font-semibold">
                {formatINR(viewData.creditOutstanding)}
              </span>
            )}
          </div>
          <Progress
            value={viewCreditUsed}
            className="h-1.5 dark:bg-black/20 bg-white/20 *:data-[slot=progress-indicator]:bg-primary dark:*:data-[slot=progress-indicator]:bg-black"
          />
          <div className="flex justify-between">
            <span className="text-xs opacity-50">
              {viewCreditUsed}% of limit used
            </span>
            {isEditing ? (
              <Input
                value={String(viewData.creditLimit)}
                onChange={(e) =>
                  updateDraftNumber("creditLimit", e.target.value)
                }
                className="h-8 w-28 bg-transparent border-white/30 text-white dark:text-black"
              />
            ) : (
              <span className="text-xs opacity-50">
                Limit {formatINR(viewData.creditLimit)}
              </span>
            )}
          </div>
        </div>

        <Separator className="dark:bg-black/20 bg-white/20" />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest opacity-60">
              Investments
            </span>
            <span className="font-mono text-xs font-bold">
              {formatINR(viewTotalInvested)} total
            </span>
          </div>
          {viewData.investments.map((inv) => (
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
              </div>
            </div>
          ))}
        </div>

        <Separator className="dark:bg-black/20 bg-white/20" />

        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 opacity-60" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-60">
              Alerts
            </span>
          </div>
          {viewData.recentAlerts.map((alert) => (
            <div
              key={alert.label}
              className="flex items-center gap-2.5 font-semibold rounded-xl dark:bg-black/10 bg-white/10 border dark:border-black/10 border-white/10 px-3 py-2.5"
            >
              <div
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  alert.type === "warning"
                    ? "bg-orange-400"
                    : alert.type === "success"
                      ? "bg-green-400"
                      : "bg-blue-400"
                }`}
              />
              <span className="text-xs">{alert.label}</span>
            </div>
          ))}
        </div>

        <Separator className="dark:bg-black/20 bg-white/20" />

        <div className="flex items-center justify-center gap-2 opacity-50">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="text-xs">
            256-bit encrypted · Data never leaves your device
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

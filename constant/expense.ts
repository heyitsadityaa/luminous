import type { ChartConfig } from "@/components/ui/chart";

export const EXPENSE_NAME = "Expense Distribution";

export const EXPENSE_DESCRIPTION = "Where your money went this month";

export const EXPENSE_DATA = [
  { category: "food", amount: 12400, fill: "var(--color-food)" },
  { category: "bills", amount: 8900, fill: "var(--color-bills)" },
  { category: "transport", amount: 4200, fill: "var(--color-transport)" },
  { category: "shopping", amount: 6750, fill: "var(--color-shopping)" },
  { category: "healthcare", amount: 2100, fill: "var(--color-healthcare)" },
];

export const EXPENSE_CONFIG = {
  amount: {
    label: "Amount",
  },
  food: {
    label: "Food & Dining",
    color: "var(--chart-1)",
  },
  bills: {
    label: "Bills & Utilities",
    color: "var(--chart-2)",
  },
  transport: {
    label: "Transport",
    color: "var(--chart-3)",
  },
  shopping: {
    label: "Shopping",
    color: "var(--chart-4)",
  },
  healthcare: {
    label: "Healthcare",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

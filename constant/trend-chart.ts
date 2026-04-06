import type { ChartConfig } from "@/components/ui/chart";

export const TREND_NAME = "Leisure Spending";

export const TREND_DESCRIPTION = "Your fun money — last 12 months";

export const TREND_DATA = [
  { month: "2024-05", expense: 8400 },
  { month: "2024-06", expense: 21800 },
  { month: "2024-07", expense: 6200 },
  { month: "2024-08", expense: 9800 },
  { month: "2024-09", expense: 7100 },
  { month: "2024-10", expense: 14900 },
  { month: "2024-11", expense: 6800 },
  { month: "2024-12", expense: 28600 },
  { month: "2025-01", expense: 5400 },
  { month: "2025-02", expense: 4200 },
  { month: "2025-03", expense: 11800 },
  { month: "2025-04", expense: 9200 },
];

export const TREND_CONFIG = {
  expense: {
    label: "Expenses",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import ExpensesCard from "@/components/cards/expenses-card";
import InsightCard from "@/components/cards/insight-card";
import { OverviewCard } from "@/components/cards/overview-card";
import TransactionsCard from "@/components/cards/transactions-card";
import { TrendChart } from "@/components/cards/trend-chart";
import GreetingsCard from "@/components/cards/greetings-card";
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";
import { InvestmentsCard } from "@/components/cards/investments-card";

const Dashboard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hoverEndTimerRef = useRef<number | null>(null);

  const handleHoverStart = () => {
    if (hoverEndTimerRef.current !== null) {
      window.clearTimeout(hoverEndTimerRef.current);
      hoverEndTimerRef.current = null;
    }
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    if (hoverEndTimerRef.current !== null) {
      window.clearTimeout(hoverEndTimerRef.current);
    }

    hoverEndTimerRef.current = window.setTimeout(() => {
      setIsHovered(false);
      hoverEndTimerRef.current = null;
    }, 400);
  };

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      window.clearTimeout(loadingTimer);
      if (hoverEndTimerRef.current !== null) {
        window.clearTimeout(hoverEndTimerRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto grid w-full max-w-350 grid-cols-1 gap-8 md:grid-cols-12 md:auto-rows-[90px]">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="md:col-span-12 md:row-span-1"
        >
          <GreetingsCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="md:col-span-4 md:row-span-7"
        >
          <OverviewCard className="w-full h-full" />
        </motion.div>

        <ExpensesCard className="md:col-span-5 md:row-span-4 w-full h-full" />

        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="md:col-span-3 md:row-span-2"
        >
          <InsightCard
            className="w-full h-full"
            variant="brackets"
            cardHeader="Mutual Funds and Stocks lead your returns"
            cardDescription="Mutual Funds, Stocks, and PPF are generating returns above allocation, while Crypto and Real Estate is underperforming and dragging the portfolio average.

"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="md:col-span-3 md:row-span-2"
        >
          <InsightCard
            className="w-full h-full"
            variant="dots"
            cardHeader="Disciplined investing is compounding ahead of schedule"
            cardDescription="Regular contributions are building momentum faster than expected, creating a stronger long-term base without disrupting day-to-day spending."
          />
        </motion.div>

        <InvestmentsCard className="md:col-span-4 md:row-span-3 w-full h-full" />

        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="md:col-span-4 md:row-span-6 grid gap-8 md:auto-rows-[90px] md:grid-cols-1"
        >
          <motion.div
            layout
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 24,
              mass: 0.7,
            }}
            className={
              isHovered ? "md:row-span-4" : "md:row-span-5 md:col-span-4"
            }
          >
            <TransactionsCard className="w-full h-full" />
          </motion.div>

          <motion.div
            layout
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 24,
              mass: 0.7,
            }}
            className={
              isHovered ? "md:row-span-3" : "md:row-span-2 md:col-span-4"
            }
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          >
            <InsightCard
              variant="diagonal"
              cardHeader="Strong cashflow cushion despite lifestyle spending swings"
              cardDescription="Recurring salary inflows and periodic side-project payouts create a reliable surplus after rent, bills, groceries, and transport are covered each month. This cushion helps you handle seasonal leisure spikes like trips, festivals, or outings without hurting core savings targets. Consistent income diversification also lowers stress, protects liquidity, and keeps long-term financial momentum stable through fluctuations in uncertain markets and cycles."
            />
          </motion.div>
        </motion.div>

        <TrendChart className="md:col-span-8 md:row-span-4 w-full h-full" />
      </div>
    </div>
  );
};

export default Dashboard;

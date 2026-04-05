"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import ExpensesCard from "@/components/cards/expenses-card"
import InsightCard from "@/components/cards/insight-card"
import { OverviewCard } from "@/components/cards/overview-card"
import TransactionsCard from "@/components/cards/transactions-card"
import { TrendChart } from "@/components/cards/trend-chart"
import GreetingsCard from "@/components/cards/greetings-card"

const Dashboard = () => {
    const [expandBottom, setExpandBottom] = useState(false)
    const hoverEndTimerRef = useRef<number | null>(null)

    const handleHoverStart = () => {
        if (hoverEndTimerRef.current !== null) {
            window.clearTimeout(hoverEndTimerRef.current)
            hoverEndTimerRef.current = null
        }
        setExpandBottom(true)
    }

    const handleHoverEnd = () => {
        if (hoverEndTimerRef.current !== null) {
            window.clearTimeout(hoverEndTimerRef.current)
        }

        hoverEndTimerRef.current = window.setTimeout(() => {
            setExpandBottom(false)
            hoverEndTimerRef.current = null
        }, 400)
    }

    useEffect(() => {
        return () => {
            if (hoverEndTimerRef.current !== null) {
                window.clearTimeout(hoverEndTimerRef.current)
            }
        }
    }, [])

    return (
        <div className="px-4 py-6 md:px-6 md:py-8">
            <div className="mx-auto grid w-full max-w-350 grid-cols-1 gap-8 md:grid-cols-12 md:auto-rows-[90px]">
                <div className="md:col-span-12 md:row-span-1">
                    <GreetingsCard />
                </div>

                <OverviewCard className="md:col-span-4 md:row-span-7 w-full h-full" />
                <ExpensesCard className="md:col-span-5 md:row-span-4 w-full h-full" />
                <InsightCard
                    className="md:col-span-3 md:row-span-2 w-full h-full"
                    variant="brackets"
                    cardHeader="Investments"
                    cardDescription="Portfolio snapshot"
                />
                <InsightCard
                    className="md:col-span-3 md:row-span-2 w-full h-full"
                    variant="dots"
                    cardHeader="Insight 1"
                    cardDescription="..."
                />
                <InsightCard
                    className="md:col-span-4 md:row-span-3 w-full h-full"
                    variant="diagonal"
                    cardHeader="Insight 2"
                    cardDescription="..."
                />

                <div className="md:col-span-4 md:row-span-6 grid gap-8 md:auto-rows-[90px] md:grid-cols-1">
                    <motion.div
                        layout
                        transition={{ type: "tween", duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className={expandBottom ? "md:row-span-4" : "md:row-span-5 md:col-span-4"}
                    >
                        <TransactionsCard className="w-full h-full" />
                    </motion.div>

                    <motion.div
                        layout
                        transition={{ type: "tween", duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className={expandBottom ? "md:row-span-3" : "md:row-span-2 md:col-span-4"}
                        onHoverStart={handleHoverStart}
                        onHoverEnd={handleHoverEnd}>
                        <InsightCard
                            className=""
                            variant="dots"
                            cardHeader="Insight 2"
                            cardDescription="..."
                        />
                    </motion.div>
                </div>
                <TrendChart className="md:col-span-8 md:row-span-4 w-full h-full" />
            </div>
        </div>
    )
}

export default Dashboard


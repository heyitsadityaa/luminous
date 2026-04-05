import ExpensesCard from "@/components/cards/expenses-card"
import InsightCard from "@/components/cards/insight-card"
import { OverviewCard } from "@/components/cards/overview-card"
import TransactionsCard from "@/components/cards/transactions-card"
import { TrendChart } from "@/components/cards/trend-chart"

const Dashboard = () => {
    return (
        <div className="px-4 py-6 md:px-6 md:py-8">
            <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-8 md:grid-cols-12 md:auto-rows-[90px]">
                <div className="md:col-span-12 md:row-span-1 rounded-2xl border border-border/60 bg-card p-4">
                    greetings-card.tsx
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

                <TransactionsCard className="md:col-span-4 md:row-span-5 w-full h-full" />

                <TrendChart className="md:col-span-8 md:row-span-4 w-full h-full" />

                <InsightCard className="md:col-span-4 md:row-span-2 w-full h-full" variant="dots" cardHeader="Insight 2"
                    cardDescription="..." />
            </div>
        </div>
    )
}

export default Dashboard


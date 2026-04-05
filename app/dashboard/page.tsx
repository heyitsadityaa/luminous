import ExpensesCard from "@/components/cards/expenses-card"
import InsightCard from "@/components/cards/insight-card"
import { OverviewCard } from "@/components/cards/overview-card"
import TransactionsCard from "@/components/cards/transactions-card"
import { TrendChart } from "@/components/cards/trend-chart"

const Dashboard = () => {
    return (
        <div className="px-6 py-8">
            <OverviewCard />
            <ExpensesCard />
            <div className="flex flex-row">
                <InsightCard variant="dots" cardHeader="Random Header" cardDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. " />
                <InsightCard variant="diagonal" cardHeader="Random Header" cardDescription="vel cupiditate consequatur vitae reprehenderit quisquam, excepturi veniam dolorum quos earum qui amet quod cumque saepe expedita ipsam distinctio." />
            </div>
            <TransactionsCard />
            <TrendChart />
        </div>
    )
}

export default Dashboard


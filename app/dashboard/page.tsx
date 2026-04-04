import Expenses from "@/components/cards/expenses"
import InsightCard from "@/components/cards/insight-card"
import Transactions from "@/components/cards/transactions"

const Dashboard = () => {
    return (
        <div className="">
            <Expenses />
            <InsightCard cardHeader="Random Header" cardDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, cupiditate. Dolorem vel cupiditate consequatur vitae reprehenderit quisquam, excepturi veniam dolorum quos earum qui amet quod cumque saepe expedita ipsam distinctio." />
            <Transactions />
        </div>
    )
}

export default Dashboard


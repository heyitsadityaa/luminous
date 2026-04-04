import Expenses from "@/components/cards/expenses"
import Transactions from "@/components/cards/transactions"

const Dashboard = () => {
    return (
        <div className="my-8">
            <Expenses />
            <Transactions />
        </div>
    )
}

export default Dashboard

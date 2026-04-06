import { Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TRANSACTIONS } from '@/constant/transaction'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const TransactionsCard = ({ className }: { className?: string }) => {
    const [inputValue, setInputValue] = useState<string | null>("")

    const firstEightTransactions = TRANSACTIONS.slice(0, 6)

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            income: 'bg-green-100 text-green-800',
            expense: 'bg-red-100 text-red-800',
            investment: 'bg-blue-100 text-blue-800',
            leisure: 'bg-amber-100 text-amber-800',
        }
        return colors[category] || 'bg-gray-100 text-gray-800'
    }

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount)
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
    }

    return (
        <Card className={cn('w-full h-full', className)}>
            <CardHeader>
                <CardTitle className='font-semibold text-lg mb-2'>Recent Transactions</CardTitle>

                <div className="flex-1 px-2 flex justify-center">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                        <Input
                            type="text"
                            placeholder="Search Transactions..."
                            className="h-9 rounded-lg pl-9 w-full"
                        />
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {firstEightTransactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="flex items-center justify-between pb-4 last:border-b-0 last:pb-0"
                        >
                            <div className="flex-1">
                                <p className="font-medium text-sm">{transaction.name}</p>
                                {/* <p className="text-xs text-muted-foreground">
                                    {transaction.description}
                                </p> */}
                                <p className="text-xs text-muted-foreground mt-1">
                                    {formatDate(transaction.date)}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span
                                    className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(
                                        transaction.category
                                    )}`}
                                >
                                    {transaction.category.charAt(0).toUpperCase() +
                                        transaction.category.slice(1)}
                                </span>
                                <span className="font-mono font-medium text-sm min-w-fit">
                                    {formatAmount(transaction.amount)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default TransactionsCard

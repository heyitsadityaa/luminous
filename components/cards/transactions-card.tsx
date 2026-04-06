import { Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { useTransactions } from "@/store/useTransactions";

type CategoryFilter = "all" | "income" | "expense" | "investment" | "leisure";

const TransactionsCard = ({ className }: { className?: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const { transactions } = useTransactions();

  const displayTransactions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return transactions.filter((t) => {
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);

      const matchesCategory =
        categoryFilter === "all" || t.category === categoryFilter;

      return matchesQuery && matchesCategory;
    });
  }, [transactions, searchQuery, categoryFilter]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      income: "bg-green-100 text-green-800",
      expense: "bg-red-100 text-red-800",
      investment: "bg-blue-100 text-blue-800",
      leisure: "bg-amber-100 text-amber-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <Card className={cn("w-full h-full", className)}>
      <CardHeader>
        <CardTitle className="font-semibold text-lg mb-2">
          Recent Transactions
        </CardTitle>

        <div className="flex gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or description"
              className="h-9 rounded-lg pl-9 w-full"
            />
          </div>

          <Select
            value={categoryFilter}
            onValueChange={(value) => setCategoryFilter(value as CategoryFilter)}
          >
            <SelectTrigger className="h-9 w-9 md:w-9 lg:w-auto rounded-lg px-0 lg:px-2.5 gap-0 lg:gap-1.5 justify-center lg:justify-between [&>svg:last-child]:hidden lg:[&>svg:last-child]:block">
              <Filter className="h-4 w-4 shrink-0" />
              <span className="hidden lg:inline-flex">
                <SelectValue placeholder="Category" />
              </span>
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="investment">Investment</SelectItem>
              <SelectItem value="leisure">Leisure</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 px-0">
        <div className="h-full overflow-y-auto px-4 pr-2 transactions-scroll">
          {displayTransactions.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">
              No transactions match this filter.
            </p>
          ) : (
            displayTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between pb-4 last:pb-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{transaction.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(transaction.date)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 hidden lg:block rounded text-xs font-medium ${getCategoryColor(
                      transaction.category,
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsCard;

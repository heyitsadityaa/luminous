export type TRANSACTIONS =
    {
        id: number,
        name: string,
        description: string,
        date: string,
        amount: number,
        category: "income" | "expense" |
        "investment" | "leisure"
    }

export const TRANSACTIONS: TRANSACTIONS[] = [
    {
        id: 1,
        name: "Salary - January",
        description: "Monthly salary credited",
        date: "2025-01-05",
        amount: 85000,
        category: "income",
    },
    {
        id: 2,
        name: "Freelance UI Work",
        description: "Dashboard redesign project payment",
        date: "2025-01-12",
        amount: 22000,
        category: "income",
    },
    {
        id: 3,
        name: "Groceries",
        description: "Weekly supermarket shopping",
        date: "2025-01-09",
        amount: 3200,
        category: "expense",
    },
    {
        id: 4,
        name: "Mutual Fund SIP",
        description: "Monthly SIP investment",
        date: "2025-01-10",
        amount: 10000,
        category: "investment",
    },
    {
        id: 5,
        name: "Movie Night",
        description: "Cinema tickets and snacks",
        date: "2025-01-20",
        amount: 1800,
        category: "leisure",
    },
    {
        id: 6,
        name: "Rent",
        description: "Monthly apartment rent",
        date: "2025-01-01",
        amount: 18000,
        category: "expense",
    },
    {
        id: 7,
        name: "Stocks - Nifty ETF",
        description: "Bought ETF units",
        date: "2025-01-18",
        amount: 7000,
        category: "investment",
    },
    {
        id: 8,
        name: "Dinner Out",
        description: "Weekend dinner with friends",
        date: "2025-01-22",
        amount: 2600,
        category: "leisure",
    },
    {
        id: 9,
        name: "Electricity Bill",
        description: "Home electricity payment",
        date: "2025-01-14",
        amount: 2400,
        category: "expense",
    },
    {
        id: 10,
        name: "Groceries",
        description: "Weekly supermarket shopping",
        date: "2025-01-09",
        amount: 3200,
        category: "expense",
    },
];

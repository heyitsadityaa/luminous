<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Ledger Finance Dashboard

This file contains the complete finalized specification for the Ledger Finance Dashboard project. Every decision in this file has been explicitly discussed and approved. Do not deviate from these specs without explicit instruction.

---

## Project Overview

A frontend-only finance dashboard built to evaluate UI design, component architecture, state management, and RBAC simulation. Not production-ready or backend-dependent. Initial/seed data lives in the constants folder. Admin mutations are managed in-memory via Zustand (resets on refresh). Role and theme are persisted to localStorage.

---

## Tech Stack

| Concern          | Choice                                                  |
| ---------------- | ------------------------------------------------------- |
| Framework        | Next.js (App Router)                                    |
| State Management | Zustand (no persist middleware)                         |
| UI Components    | Shadcn/ui                                               |
| Charts           | Shadcn Charts (Recharts under the hood)                 |
| Animations       | Motion (`motion/react`)                                 |
| Theme            | next-themes (light/dark, persisted to localStorage)     |
| Fonts            | Plus Jakarta Sans + Urbanist (UI text) — see layout.tsx |
| Styling          | Tailwind CSS + CSS Variables                            |

---

## Pages

### `/` — Role Selection (Login)

- Two buttons: **Sign in as Admin** and **Sign in as Viewer**
- On click: saves selected role to `localStorage` under key `ledger-role` AND as a cookie `ledger-role`
- Redirects to `/dashboard` after role selection
- No real authentication — purely simulated RBAC

### `/dashboard` — Main Dashboard (Protected)

- On mount: reads role from `localStorage`
- If no role found: redirected back to `/` via `proxy.ts`
- Single page with sidebar navigation
- Sections in order: **Overview → Insights → Transactions**

---

## Route Protection

### `proxy.ts` (at project root, alongside `src/`)

- Intercepts all requests to `/dashboard`
- Reads `ledger-role` cookie
- If cookie absent: redirects to `/`
- Prevents users from manually typing `/dashboard` in the URL bar
- Role must be written to both `localStorage` AND a cookie on login (`proxy.ts` cannot read localStorage — cookies only)

---

## Layout

### Sidebar (Desktop)

- App logo/name at top left
- Nav links: Overview, Insights, Transactions — **navigation behavior TBD** (smooth scroll vs route not yet confirmed)
- Light/Dark mode toggle
- Role badge at bottom showing current role (Admin / Viewer)
- Sign out button — clears `ledger-role` from both localStorage and cookie, redirects to `/`

### Mobile Layout

- Sidebar collapses to hamburger menu
- Top bar: Hamburger (left) + Search bar (center) + Theme toggle (right)
- Sections stack vertically: Overview → Insights → Transactions

---

## Sections

### 1. Overview

- **Three stat values**: Total Balance, Total Income, Total Expenses
  - Displayed inline within the overview section — **not three separate cards**
  - Numbers rendered in monospace font (`font-mono`)
  - All values derived from `transactions[]` in Zustand store
- **Radial Arc Chart**: breakdown across Expense / Investment / Leisure
  - Each arc segment = one type
  - Uses Recharts `RadialBarChart`
  - Shows "No data" state when no transactions exist

### 2. Insights

- **Line Graph**: monthly spending trend
  - Filter toggle: **3 / 6 / 12 months** (default: 6 months)
  - X-axis = months, Y-axis = total spend
  - Shows "No data" state when no transactions in range
- **Three text insight pointers** (auto-calculated):
  1. Highest spending category (e.g. "Food is your top expense at ₹12,400")
  2. Month-over-month comparison (e.g. "You spent 23% more in March than February")
  3. Income vs Expense ratio or largest single transaction this month

### 3. Transactions

- Table columns: Date, Title/Description, Category, Type badge, Amount
- **Color-coded Type Badge**:
  - Income → Green (`#22C55E`)
  - Expense → Red (`#EF4444`)
  - Investment → Blue (`#3B82F6`)
  - Leisure → Amber (`#F59E0B`)
- **Search**: by name, description, or amount
- **Filter**: by type and category
- **Sort**: by date or amount (asc/desc)
- **Export**: CSV and JSON (both roles)
- **Empty state UI**: when search/filter returns nothing — not a blank div
- **Admin only — Add**: opens Shadcn Sheet modal with form
- **Admin only — Edit**: Sheet modal prefilled with row data
- **Admin only — Delete**: Shadcn `AlertDialog` confirm before deletion
- Form validation: no empty title, no negative amount, date required

---

## RBAC Simulation

| Feature               | Admin         | Viewer         |
| --------------------- | ------------- | -------------- |
| View all sections     | ✅            | ✅             |
| Export CSV / JSON     | ✅            | ✅             |
| Add transaction       | ✅            | ❌             |
| Edit transaction      | ✅            | ❌             |
| Delete transaction    | ✅            | ❌             |
| Role badge in sidebar | Shows "Admin" | Shows "Viewer" |

- Role stored in `localStorage` (key: `ledger-role`) AND cookie (key: `ledger-role`)
- Role read into Zustand on dashboard mount
- No backend, no JWT — frontend simulation only

---

## State Management (Zustand)

### Store shape

```ts
{
  transactions: Transaction[]       // initialized from SEED_TRANSACTIONS on every load
  role: 'admin' | 'viewer' | null   // read from localStorage on mount
  filters: {
    search: string
    type: 'all' | 'income' | 'expense' | 'investment'
    category: string
    sortBy: 'date' | 'amount'
    sortOrder: 'asc' | 'desc'
  }
  isHydrated: boolean               // false on mount, true after 200ms minimum
}
```

### What lives where

| Data                        | Storage                                  |
| --------------------------- | ---------------------------------------- |
| `transactions[]`            | Zustand only — resets to seed on refresh |
| `filters`, `search`, `sort` | Zustand only — ephemeral                 |
| `role`                      | Zustand + localStorage + cookie          |
| `theme`                     | localStorage via next-themes only        |
| `isHydrated`                | Zustand only                             |

### Rules

- No Zustand persist middleware
- All chart/insight values derived from `transactions[]` — never stored separately
- `theme` not in Zustand — next-themes owns it entirely

---

## Data Architecture

### Folder

```
src/
├── constants/
│   ├── data.ts          # SEED_TRANSACTIONS (~35-40 entries, last 12 months)
│   ├── categories.ts    # category names, types, colors
│   └── config.ts        # DEFAULT_MONTH_FILTER = 6, APP_NAME = 'Ledger'
├── lib/
│   ├── utils.ts         # cn(), formatCurrency(), formatDate()
│   └── derive.ts        # all computed logic
└── hooks/
    └── useHydration.ts  # isHydrated flag for skeleton timing
```

### derive.ts functions

```ts
getTotalByType(transactions, type); // overview stat values
groupByMonth(transactions, months); // line graph
getRadialData(transactions); // radial arc chart
getTopCategory(transactions); // insight pointer 1
getMonthComparison(transactions); // insight pointer 2
getIncomeExpenseRatio(transactions); // insight pointer 3
```

### Transaction type

```ts
type Transaction = {
  id: string;
  title: string;
  description: string;
  amount: number;
  type: "income" | "expense" | "investment";
  category: string;
  date: string; // ISO format
};
```

### Seed data rules

- ~35-40 entries spanning last 12 months
- Mix of all three types with category variety
- Designed (not random) for consistent, non-trivial chart output

---

## Design System

### Aesthetic

- **Bento Grid layout** — asymmetric cards, varying sizes
- **Light mode**: Soft Minimal (clean, subtle shadows, Stripe-like)
- **Dark mode**: Data-Dense Editorial (tight, monospace accents, Vercel/Linear-like)

### Typography

```
Plus Jakarta Sans  → primary UI font       (--font-sans)
Urbanist           → display / secondary   (--font-serif)
monospace          → all numbers, amounts, dates, % (--font-mono)
```

### `layout.tsx` (confirmed — see `src/app/layout.tsx`)

- Loads `Plus_Jakarta_Sans` as `--font-sans` and `Urbanist` as `--font-serif` via `next/font/google`
- `suppressHydrationWarning` on `<html>` is required for next-themes to work without hydration mismatch
- Do not modify this file

### `globals.css` (confirmed — see `src/app/globals.css`)

- Full Shadcn v4 token system using OKLCH color format
- Light and dark mode tokens defined under `:root` and `.dark`
- Primary accent (electric lime) is `oklch(0.9359 0.2226 120.3259)` — same in both modes
- `@custom-variant dark (&:is(.dark *))` handles dark mode class toggling via next-themes
- Do not modify this file

### Semantic Colors (hardcoded in components, not CSS variables)

```
Income      → #22C55E
Expense     → #EF4444
Investment  → #3B82F6
Leisure     → #F59E0B
```

### Accent Usage Rules

- `--primary` (electric lime) as background → always pair with black text
- `--primary` as text/icon → only on dark surfaces
- `--primary` as text on white → never

---

## UX Details

### Loading State

- `isHydrated` starts `false` on mount
- Skeleton loaders shown for all cards and charts
- Minimum skeleton duration: 200ms
- After 200ms: `isHydrated` → `true`, content renders with Motion entry animation

### Empty States

- No filtered transactions → intentional UI (not a blank div)
- Charts with no data → "No data for this period" inside chart area
- Covers: line graph, radial arc, transaction table

### Animations (Motion — `motion/react`)

- Page entry: staggered card reveals on dashboard load
- Section transitions: fade + slide up on scroll into view
- Chart transitions: animate on month filter change
- Sheet modal: slide in from right
- Role selection page: entrance animation on role cards

### Responsiveness

- Breakpoint: `lg` (1024px) — sidebar visible above, hamburger below
- Transaction table → card list on mobile
- Bento grid → single column on mobile

---

## What is NOT Included

- No backend or API calls
- No real authentication or JWT
- No Zustand persist middleware
- No mock API integration
- No advanced grouping
- Transactions reset to seed on every refresh by design

---

## Build Order

| Step | Task                                                               |
| ---- | ------------------------------------------------------------------ |
| 1    | Project setup — init Next.js, install all dependencies             |
| 2    | Paste confirmed `globals.css` and `layout.tsx`                     |
| 3    | `constants/data.ts` — seed transactions                            |
| 4    | `constants/categories.ts` + `constants/config.ts`                  |
| 5    | `lib/utils.ts` + `lib/derive.ts`                                   |
| 6    | `store/useStore.ts` — Zustand store                                |
| 7    | `proxy.ts` — route guard                                           |
| 8    | `/` page — role selection, writes role to localStorage + cookie    |
| 9    | `/dashboard` shell — reads role on mount, redirect if missing      |
| 10   | `Sidebar.tsx` + `MobileNav.tsx`                                    |
| 11   | Overview section — stat values + RadialChart                       |
| 12   | Insights section — LineGraph + MonthFilter + InsightPointers       |
| 13   | Transactions section — table, search, filter, sort, badges         |
| 14   | Admin CRUD — AddEditSheet + DeleteDialog                           |
| 15   | Export — CSV and JSON                                              |
| 16   | Empty states — table and charts                                    |
| 17   | Skeleton loaders — useHydration + skeleton components              |
| 18   | Motion animations — entry, stagger, chart transitions, sheet slide |
| 19   | Responsive — mobile layout, hamburger, table → card list           |
| 20   | README                                                             |

---

## README Checklist

- [ ] Project overview and purpose
- [ ] Tech stack with justification
- [ ] Setup and run instructions
- [ ] Feature walkthrough
- [ ] RBAC explanation (how roles work, what each can do)
- [ ] State management approach and reasoning
- [ ] Design decisions (Bento Grid, color system, typography)
- [ ] Known limitations

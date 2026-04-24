# Finance Dashboard Web App

A frontend-only React app that simulates a personal finance dashboard. It provides a summary view, transaction management, smart spending insights, and role-based behavior for Admin and Viewer users.

## Features Implemented

- Dashboard with 3 summary cards:
  - Total Balance
  - Total Income
  - Total Expenses
- Time-based chart (area chart) for income and expenses by month
- Category-based chart (donut/pie) for expense distribution
- Transactions section with:
  - Search
  - Filter by category
  - Filter by type (income/expense)
  - Sorting by date and amount
- Role-based UI:
  - Viewer: read-only
  - Admin: add, edit, delete transactions
- Insights section with calculated logic:
  - Highest spending category
  - Monthly comparison (this month vs last month)
  - Spending trend message
- Responsive UI using Tailwind CSS
- Empty state for no transactions
- Dark mode toggle
- LocalStorage persistence for transactions, role, and theme

## Tech Stack

- React (Vite)
- Tailwind CSS
- Recharts
- Context API + useState/useMemo

## Folder Structure

```text
src/
  components/
    CategoryPieChart.jsx
    SummaryCard.jsx
    TimeTrendChart.jsx
    TransactionForm.jsx
    TransactionTable.jsx
  context/
    AppContext.jsx
  data/
    mockData.js
  pages/
    Dashboard.jsx
    Insights.jsx
    Transactions.jsx
  App.jsx
  main.jsx
```

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Notes

- All data is frontend-managed (no backend).
- Existing sample data is provided in `src/data/mockData.js`.

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialTransactions } from "../data/mockData";

const AppContext = createContext(null);

const STORAGE_KEYS = {
  transactions: "finance_dashboard_transactions",
  role: "finance_dashboard_role",
  darkMode: "finance_dashboard_dark_mode",
};

const formatMonth = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.transactions);
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [role, setRole] = useState(() => localStorage.getItem(STORAGE_KEYS.role) || "admin");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(STORAGE_KEYS.darkMode) === "true");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dateDesc");
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.role, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.darkMode, String(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const summary = useMemo(() => {
    const income = transactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0);
    const expenses = transactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    let data = [...transactions];

    if (categoryFilter !== "all") {
      data = data.filter((tx) => tx.category === categoryFilter);
    }

    if (typeFilter !== "all") {
      data = data.filter((tx) => tx.type === typeFilter);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      data = data.filter(
        (tx) =>
          tx.category.toLowerCase().includes(query) ||
          tx.note.toLowerCase().includes(query) ||
          String(tx.amount).includes(query),
      );
    }

    if (sortBy === "dateAsc") data.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortBy === "dateDesc") data.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sortBy === "amountAsc") data.sort((a, b) => a.amount - b.amount);
    if (sortBy === "amountDesc") data.sort((a, b) => b.amount - a.amount);

    return data;
  }, [transactions, categoryFilter, typeFilter, search, sortBy]);

  const monthlyTrendData = useMemo(() => {
    const grouped = transactions.reduce((acc, tx) => {
      const monthKey = formatMonth(tx.date);
      if (!acc[monthKey]) {
        acc[monthKey] = { month: monthKey, income: 0, expense: 0, balance: 0 };
      }
      if (tx.type === "income") acc[monthKey].income += tx.amount;
      if (tx.type === "expense") acc[monthKey].expense += tx.amount;
      acc[monthKey].balance = acc[monthKey].income - acc[monthKey].expense;
      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) => a.month.localeCompare(b.month));
  }, [transactions]);

  const expenseByCategoryData = useMemo(() => {
    const grouped = transactions
      .filter((tx) => tx.type === "expense")
      .reduce((acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
        return acc;
      }, {});

    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const insights = useMemo(() => {
    const expenseByCategory = expenseByCategoryData.sort((a, b) => b.value - a.value);
    const topCategory = expenseByCategory[0];
    const latestMonth = monthlyTrendData[monthlyTrendData.length - 1];
    const previousMonth = monthlyTrendData[monthlyTrendData.length - 2];
    const thisMonthExpense = latestMonth?.expense || 0;
    const lastMonthExpense = previousMonth?.expense || 0;
    const diff = thisMonthExpense - lastMonthExpense;
    const diffPercent = lastMonthExpense > 0 ? Math.round((diff / lastMonthExpense) * 100) : 0;

    return {
      highestSpendingCategory: topCategory
        ? `${topCategory.name} (Rs ${topCategory.value.toLocaleString("en-IN")})`
        : "No expense data",
      monthlyComparison: `This month: Rs ${thisMonthExpense.toLocaleString("en-IN")} | Last month: Rs ${lastMonthExpense.toLocaleString("en-IN")}`,
      trendMessage:
        diff === 0
          ? "Your monthly spending is steady compared to last month."
          : diff > 0
            ? `You spent ${diffPercent}% more this month.`
            : `You spent ${Math.abs(diffPercent)}% less this month.`,
    };
  }, [expenseByCategoryData, monthlyTrendData]);

  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [{ ...newTransaction, id: crypto.randomUUID() }, ...prev]);
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions((prev) => prev.map((tx) => (tx.id === id ? { ...tx, ...updatedTransaction } : tx)));
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const value = {
    role,
    setRole,
    darkMode,
    setDarkMode,
    transactions,
    summary,
    filteredTransactions,
    monthlyTrendData,
    expenseByCategoryData,
    insights,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    typeFilter,
    setTypeFilter,
    sortBy,
    setSortBy,
    activeTab,
    setActiveTab,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

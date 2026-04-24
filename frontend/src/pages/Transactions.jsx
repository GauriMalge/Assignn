import { useMemo, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import { useAppContext } from "../context/AppContext";

const Transactions = () => {
  const {
    role,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    filteredTransactions,
    transactions,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    typeFilter,
    setTypeFilter,
    sortBy,
    setSortBy,
  } = useAppContext();

  const [editingTransaction, setEditingTransaction] = useState(null);
  const isAdmin = role === "admin";

  const categories = useMemo(() => {
    const unique = [...new Set(transactions.map((tx) => tx.category))];
    return ["all", ...unique];
  }, [transactions]);

  const handleSubmit = (formData) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, formData);
      setEditingTransaction(null);
      return;
    }
    addTransaction(formData);
  };

  const exportToCsv = () => {
    if (!filteredTransactions.length) return;

    const headers = ["Date", "Category", "Amount", "Type", "Note"];
    const rows = filteredTransactions.map((tx) => [
      tx.date,
      tx.category,
      tx.amount,
      tx.type,
      tx.note ? tx.note.replace(/"/g, '""') : "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `transactions-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-4">
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-4 dark:border-slate-700 dark:bg-slate-800">
        <input
          type="text"
          placeholder="Search by category, note or amount"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All Categories" : item}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        >
          <option value="dateDesc">Sort: Date (Newest)</option>
          <option value="dateAsc">Sort: Date (Oldest)</option>
          <option value="amountDesc">Sort: Amount (High-Low)</option>
          <option value="amountAsc">Sort: Amount (Low-High)</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          onClick={exportToCsv}
          disabled={!filteredTransactions.length}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Export CSV
        </button>
      </div>

      {isAdmin && (
        <TransactionForm
          onSubmit={handleSubmit}
          onCancel={() => setEditingTransaction(null)}
          editingTransaction={editingTransaction}
        />
      )}

      <TransactionTable
        transactions={filteredTransactions}
        isAdmin={isAdmin}
        onEdit={setEditingTransaction}
        onDelete={deleteTransaction}
      />
    </section>
  );
};

export default Transactions;

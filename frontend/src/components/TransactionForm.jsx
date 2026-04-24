import { useEffect, useState } from "react";
import { defaultCategories } from "../data/mockData";

const emptyForm = {
  date: "",
  category: "Food",
  amount: "",
  type: "expense",
  note: "",
};

const TransactionForm = ({ onSubmit, onCancel, editingTransaction }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        date: editingTransaction.date,
        category: editingTransaction.category,
        amount: editingTransaction.amount,
        type: editingTransaction.type,
        note: editingTransaction.note,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingTransaction]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.date || !form.category || !form.amount) return;
    onSubmit({ ...form, amount: Number(form.amount) });
    setForm(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {editingTransaction ? "Edit Transaction" : "Add Transaction"}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="date"
          className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          value={form.date}
          onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
          required
        />
        <select
          className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          value={form.category}
          onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
        >
          {defaultCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          placeholder="Amount"
          className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          value={form.amount}
          onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
          required
        />
        <select
          className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          value={form.type}
          onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Note"
        className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        value={form.note}
        onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
      />
      <div className="flex gap-2">
        <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-white dark:bg-indigo-500">
          {editingTransaction ? "Update" : "Add"}
        </button>
        {editingTransaction && (
          <button type="button" onClick={onCancel} className="rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-600 dark:text-white">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;

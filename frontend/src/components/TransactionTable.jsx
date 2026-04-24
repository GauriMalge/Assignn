const TransactionTable = ({ transactions, isAdmin, onEdit, onDelete }) => {
  if (!transactions.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-600 dark:text-slate-300">
        No transactions found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-600 dark:bg-slate-900 dark:text-slate-300">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Note</th>
            {isAdmin && <th className="px-4 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-t border-slate-200 dark:border-slate-700">
              <td className="px-4 py-3 dark:text-white">{new Date(tx.date).toLocaleDateString("en-IN")}</td>
              <td className="px-4 py-3 dark:text-white">{tx.category}</td>
              <td className="px-4 py-3 font-semibold dark:text-white">Rs {tx.amount.toLocaleString("en-IN")}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2 py-1 text-xs ${tx.type === "income" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                  {tx.type}
                </span>
              </td>
              <td className="px-4 py-3 dark:text-white">{tx.note || "-"}</td>
              {isAdmin && (
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(tx)} className="rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:text-white">
                      Edit
                    </button>
                    <button onClick={() => onDelete(tx.id)} className="rounded-md bg-rose-500 px-2 py-1 text-white">
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;

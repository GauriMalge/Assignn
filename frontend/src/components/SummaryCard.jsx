const SummaryCard = ({ label, value, tone }) => {
  const toneClasses = {
    neutral: "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700",
    income: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800",
    expense: "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800",
  };

  return (
    <div className={`rounded-xl border p-4 shadow-sm ${toneClasses[tone] || toneClasses.neutral}`}>
      <p className="text-sm text-slate-500 dark:text-slate-300">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Rs {value.toLocaleString("en-IN")}</p>
    </div>
  );
};

export default SummaryCard;

import { useAppContext } from "../context/AppContext";

const InsightCard = ({ title, value }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
    <p className="text-sm text-slate-500 dark:text-slate-300">{title}</p>
    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{value}</p>
  </div>
);

const Insights = () => {
  const { insights } = useAppContext();

  return (
    <section className="space-y-4">
      <InsightCard title="Highest spending category" value={insights.highestSpendingCategory} />
      <InsightCard title="Monthly comparison" value={insights.monthlyComparison} />
      <InsightCard title="Spending trend insight" value={insights.trendMessage} />
    </section>
  );
};

export default Insights;

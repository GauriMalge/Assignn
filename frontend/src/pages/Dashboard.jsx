import CategoryPieChart from "../components/CategoryPieChart";
import SummaryCard from "../components/SummaryCard";
import TimeTrendChart from "../components/TimeTrendChart";
import { useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const { summary, monthlyTrendData, expenseByCategoryData } = useAppContext();

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard label="Total Balance" value={summary.balance} tone="neutral" />
        <SummaryCard label="Total Income" value={summary.income} tone="income" />
        <SummaryCard label="Total Expenses" value={summary.expenses} tone="expense" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <TimeTrendChart data={monthlyTrendData} />
        <CategoryPieChart data={expenseByCategoryData} />
      </div>
    </section>
  );
};

export default Dashboard;

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#eab308", "#14b8a6", "#ec4899", "#6366f1", "#ef4444"];

const CategoryPieChart = ({ data }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
    <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Expense by Category</h3>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={95} paddingAngle={3}>
            {data.map((entry, index) => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `Rs ${Number(value).toLocaleString("en-IN")}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default CategoryPieChart;

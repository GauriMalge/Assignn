import { AppProvider, useAppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Transactions from "./pages/Transactions";

const TabButton = ({ id, label, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
      active ? "bg-slate-900 text-white dark:bg-indigo-500" : "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
    }`}
  >
    {label}
  </button>
);

const AppLayout = () => {
  const { role, setRole, darkMode, setDarkMode, activeTab, setActiveTab } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between dark:border-slate-700 dark:bg-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Finance Dashboard</h1>
            <p className="text-sm text-slate-500 dark:text-slate-300">Track your money with clean insights and role-based actions.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm text-slate-700 dark:text-slate-300">Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded-lg border border-slate-300 px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            >
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="rounded-lg border border-slate-300 px-3 py-1 text-sm text-slate-800 dark:border-slate-600 dark:text-white"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </header>

        <nav className="flex flex-wrap gap-2">
          <TabButton id="dashboard" label="Dashboard" active={activeTab === "dashboard"} onClick={setActiveTab} />
          <TabButton id="transactions" label="Transactions" active={activeTab === "transactions"} onClick={setActiveTab} />
          <TabButton id="insights" label="Insights" active={activeTab === "insights"} onClick={setActiveTab} />
        </nav>

        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "transactions" && <Transactions />}
        {activeTab === "insights" && <Insights />}
      </div>
    </div>
  );
};

const App = () => (
  <AppProvider>
    <AppLayout />
  </AppProvider>
);

export default App;

import { useEffect, useState } from "react";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(null);
  const [query, setQuery] = useState({});

  const load = async (q = {}) => {
    const r = await api.get("/tasks", { params: q });
    setTasks(r.data.tasks);
  };

  useEffect(()=>{ load(query); }, [query]);

  const create = async (data) => {
    if (edit) {
      const r = await api.put(`/tasks/${edit._id}`, data);
      setEdit(null);
      setTasks(prev => prev.map(t => t._id === r.data.task._id ? r.data.task : t));
    } else {
      const r = await api.post("/tasks", data);
      setTasks(prev => [r.data.task, ...prev]);
    }
  };

  const remove = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  return (
    <div className="p-4 grid gap-4">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <SearchBar onChange={setQuery} />
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">{edit ? "Edit task" : "New task"}</h3>
          <TaskForm onSubmit={create} initial={edit || undefined} />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Your tasks</h3>
          <TaskList tasks={tasks} onEdit={setEdit} onDelete={remove} />
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

export default function SearchBar({ onChange }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [minP, setMinP] = useState("");
  const [maxP, setMaxP] = useState("");

  const apply = () => onChange({ q, status, minPriority: minP, maxPriority: maxP });

  return (
    <div className="flex flex-wrap gap-2 items-end">
      <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search" className="border p-2 rounded" />
      <select value={status} onChange={(e)=>setStatus(e.target.value)} className="border p-2 rounded">
        <option value="">status</option>
        <option value="todo">todo</option>
        <option value="in_progress">in_progress</option>
        <option value="done">done</option>
      </select>
      <input value={minP} onChange={(e)=>setMinP(e.target.value)} placeholder="min priority" className="border p-2 rounded w-28" />
      <input value={maxP} onChange={(e)=>setMaxP(e.target.value)} placeholder="max priority" className="border p-2 rounded w-28" />
      <button onClick={apply} className="border px-3 py-2 rounded">Apply</button>
    </div>
  );
}

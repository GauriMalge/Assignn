export default function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="grid gap-3">
      {tasks.map(t => (
        <div key={t._id} className="border rounded p-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{t.title}</h3>
            <div className="flex gap-2">
              <button onClick={()=>onEdit(t)} className="border px-2 py-1 rounded">Edit</button>
              <button onClick={()=>onDelete(t._id)} className="border px-2 py-1 rounded">Delete</button>
            </div>
          </div>
          <p className="text-sm">{t.description}</p>
          <div className="text-xs mt-1">status: {t.status} • priority: {t.priority}</div>
        </div>
      ))}
    </div>
  );
}

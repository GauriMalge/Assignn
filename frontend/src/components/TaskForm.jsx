import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(1, "Title required"),
  description: z.string().optional(),
  status: z.enum(["todo","in_progress","done"]).default("todo"),
  priority: z.coerce.number().min(1).max(5).default(3),
  dueDate: z.string().optional()
});

export default function TaskForm({ onSubmit, initial }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initial || { title: "", description: "", status: "todo", priority: 3, dueDate: "" }
  });

  return (
    <form onSubmit={handleSubmit((d)=>{ onSubmit(d); reset(); })} className="flex flex-col gap-2">
      <input {...register("title")} placeholder="Title" className="border p-2 rounded" />
      {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
      <textarea {...register("description")} placeholder="Description" className="border p-2 rounded" />
      <div className="flex gap-2">
        <select {...register("status")} className="border p-2 rounded">
          <option value="todo">todo</option>
          <option value="in_progress">in_progress</option>
          <option value="done">done</option>
        </select>
        <input type="number" {...register("priority")} min="1" max="5" className="border p-2 rounded w-24" />
        <input type="date" {...register("dueDate")} className="border p-2 rounded" />
      </div>
      <button className="border px-3 py-2 rounded w-fit">Save</button>
    </form>
  );
}

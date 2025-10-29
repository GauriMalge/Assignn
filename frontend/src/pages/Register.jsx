import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export default function Register() {
  const nav = useNavigate();
  const { register: formReg, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const { register } = useAuth();

  const onSubmit = async (data) => {
    await register({ name: data.name, email: data.email, password: data.password });
    nav("/dashboard");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input {...formReg("name")} placeholder="Name" className="border p-2 rounded"/>
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        <input {...formReg("email")} placeholder="Email" className="border p-2 rounded"/>
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        <input type="password" {...formReg("password")} placeholder="Password" className="border p-2 rounded"/>
        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        <button className="border px-3 py-2 rounded w-fit">Create account</button>
      </form>
    </div>
  );
}

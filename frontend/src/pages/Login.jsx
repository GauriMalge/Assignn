import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { register: reg, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    await login({ email: data.email, password: data.password });
    nav("/dashboard");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input {...reg("email")} placeholder="Email" className="border p-2 rounded"/>
        <input type="password" {...reg("password")} placeholder="Password" className="border p-2 rounded"/>
        <button className="border px-3 py-2 rounded w-fit">Login</button>
      </form>
    </div>
  );
}

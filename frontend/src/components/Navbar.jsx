import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = async () => {
    await logout();
    nav("/login");
  };

  return (
    <nav className="w-full px-4 py-3 border-b flex items-center justify-between">
      <Link to="/" className="font-bold">Scalable WebApp</Link>
      <div className="flex gap-4">
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user && <Link to="/profile">Profile</Link>}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user && <button onClick={onLogout} className="px-3 py-1 border rounded">Logout</button>}
      </div>
    </nav>
  );
}

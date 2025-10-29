import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    api.get("/profile").then(r => {
      setUser(r.data.user);
      setName(r.data.user.name);
    });
  }, []);

  const save = async () => {
    const r = await api.put("/profile", { name });
    setUser(r.data.user);
  };

  if (!user) return null;
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-2">Profile</h2>
      <div className="mb-2">Email: {user.email}</div>
      <input className="border p-2 rounded mb-2 w-full" value={name} onChange={(e)=>setName(e.target.value)} />
      <button onClick={save} className="border px-3 py-2 rounded">Save</button>
    </div>
  );
}

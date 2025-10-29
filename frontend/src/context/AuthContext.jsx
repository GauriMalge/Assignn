import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { authStore } from "../store/authStore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // bootstrap on mount
  useEffect(() => {
    const boot = async () => {
      try {
        if (!authStore.token) return;
        const r = await api.get("/auth/me");
        setUser(r.data.user);
      } catch {
        authStore.token = null;
        setUser(null);
      } finally {
        setReady(true);
      }
    };
    boot();
  }, []);

  const login = async ({ email, password }) => {
    const r = await api.post("/auth/login", { email, password });
    authStore.token = r.data.token;
    setUser(r.data.user);
    return r.data.user;
  };

  const register = async ({ name, email, password }) => {
    const r = await api.post("/auth/register", { name, email, password });
    authStore.token = r.data.token;
    setUser(r.data.user);
    return r.data.user;
  };

  const logout = async () => {
    try { await api.post("/auth/logout"); } catch {}
    authStore.token = null;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, ready, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

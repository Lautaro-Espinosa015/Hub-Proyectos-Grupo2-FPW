import { createContext, useState, useEffect, useCallback, useMemo, useContext } from "react";
import axios from "axios";

export const AutorizacionContext = createContext(null);
const LS_KEY = "auth:user";
const BASE_URL = "http://localhost:5000/api/usuarios";

export function AutorizacionProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      localStorage.removeItem(LS_KEY);
      return null;
    }
  });

  // ✅ Login
  const login = useCallback(async (credenciales) => {
    try {
      console.log("Credenciales enviadas:", credenciales);
      const res = await axios.post(`${BASE_URL}/login`, credenciales, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.data.success) {
        setUser(res.data.user);
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      console.error("Error en login:", err);
      return { success: false, message: "Error interno" };
    }
  }, []);

  // ✅ Registro
  const register = useCallback(async (datos) => {
    try {
      const res = await axios.post(`${BASE_URL}/register`, datos, {
        headers: { 'Content-Type': 'application/json' }
      });
      return res.data;
    } catch (err) {
      console.error("Error en registro:", err);
      return { success: false, message: "Error interno" };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(LS_KEY);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(LS_KEY, JSON.stringify(user));
    else localStorage.removeItem(LS_KEY);
  }, [user]);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout
  }), [user, login, register, logout]);

  return (
    <AutorizacionContext.Provider value={value}>
      {children}
    </AutorizacionContext.Provider>
  );
}

export const useAutorizacion = () => useContext(AutorizacionContext);
export default AutorizacionProvider;
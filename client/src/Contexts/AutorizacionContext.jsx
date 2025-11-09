import { createContext, useState, useEffect, useCallback, useMemo, useContext } from "react";
import axios from "axios";

export const AutorizacionContext = createContext(null);
const LS_KEY = "auth:user";
const BASE_URL = "http://localhost:5000/api/usuarios";

export function AutorizacionProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      localStorage.removeItem(LS_KEY);
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);

  // ✅ Login
  const login = useCallback(async (credenciales) => {
    try {
      console.log("Credenciales enviadas:", credenciales);
      const res = await axios.post(`${BASE_URL}/login`, credenciales, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.data.success) {
        setCurrentUser(res.data.user);
        setIsLoggedIn(true);
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
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem(LS_KEY);
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(LS_KEY, JSON.stringify(currentUser));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem(LS_KEY);
      setIsLoggedIn(false);
    }
  }, [currentUser]);

  const contextValue = useMemo(() => ({
    currentUser,
    isLoggedIn,
    login,
    logout,
    register,
  }), [currentUser, isLoggedIn, login, logout, register]);

  return (
    <AutorizacionContext.Provider value={contextValue}>
      {children}
    </AutorizacionContext.Provider>
  );
}

export const useAutorizacion = () => useContext(AutorizacionContext);
export default AutorizacionProvider;

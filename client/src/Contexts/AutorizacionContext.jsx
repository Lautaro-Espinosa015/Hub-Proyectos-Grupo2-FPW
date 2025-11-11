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

  //  Login
  const login = useCallback(async (credenciales) => {
    try {
      console.log("Credenciales enviadas:", credenciales);
      const res = await axios.post(`${BASE_URL}/login`, credenciales, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.data.success) {
        // Asegurarse de que el rol esté presente
        const userData = {
          ...res.data.user,
          rol: res.data.user.rol || 'normal' // Valor por defecto si no existe
        };
        console.log('Usuario autenticado:', userData); // Para debugging
        setCurrentUser(userData);
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

  //  Registro
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

  //  Actualizar puntaje del usuario
  const updateScore = useCallback(async (points) => {
    // Solo proceder si hay un usuario logueado
    if (!currentUser || !currentUser._id) {
      console.error("No hay usuario logueado para actualizar puntaje.");
      return { success: false, message: "Usuario no autenticado." };
    }
    try {
      // Llamada al nuevo endpoint del backend
      const res = await axios.put(`${BASE_URL}/update-score`, {
        userId: currentUser._id,
        points: points, // Puntos a sumar
      });
      if (res.data.success) {
        // Actualizar el estado del usuario con los datos que devuelve el backend
        setCurrentUser(res.data.user);
      }
      return res.data;
    } catch (err) {
      console.error("Error al actualizar puntaje:", err);
      return { success: false, message: "Error interno al actualizar puntaje." };
    }
  }, [currentUser]); // Depende de currentUser para obtener el ID

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(LS_KEY, JSON.stringify(currentUser));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem(LS_KEY);
      setIsLoggedIn(false);
    }
  }, [currentUser]);

  // Función auxiliar para verificar el rol del usuario
  const hasRole = useCallback((role) => {
    return currentUser?.rol === role;
  }, [currentUser]);

  // Función auxiliar para verificar si el usuario es admin
  const isAdmin = useCallback(() => {
    return hasRole('admin');
  }, [hasRole]);

  const contextValue = useMemo(() => ({
    currentUser,
    isLoggedIn,
    login,
    logout,
    register,
    updateScore, // Exponemos la nueva función
    hasRole,
    isAdmin,
  }), [currentUser, isLoggedIn, login, logout, register, updateScore, hasRole, isAdmin]);

  return (
    <AutorizacionContext.Provider value={contextValue}>
      {children}
    </AutorizacionContext.Provider>
  );
}

export const useAutorizacion = () => useContext(AutorizacionContext);
export default AutorizacionProvider;

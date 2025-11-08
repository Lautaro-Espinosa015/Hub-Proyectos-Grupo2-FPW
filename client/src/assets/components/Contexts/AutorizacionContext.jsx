import { createContext, useContext, useState, useEffect } from 'react';
import { adminUsers } from '../ListaUsuarios';

const AutorizacionContext = createContext();

export const useAutorizacion = () => {
  return useContext(AutorizacionContext);
};

export const AutorizacionProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem('registeredUsers');
      return savedUsers ? JSON.parse(savedUsers) : [];
    } catch (error) {
      console.error('Error loading users from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        // Validar la estructura del usuario antes de establecerlo
        if (parsedUser && parsedUser.username && parsedUser.role) {
          setCurrentUser(parsedUser);
        }
      }
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
    }
  }, [registeredUsers]);

  const login = (identifier, password) => {
    if (!identifier || typeof identifier !== 'string' || !password) {
      return { success: false, message: 'Usuario o contraseña inválidos.' };
    }

    const normalizedIdentifier = identifier.toLowerCase().trim();

    // Buscar en la lista de administradores (solo por username)
    const admin = adminUsers.find(u => u.username.toLowerCase() === normalizedIdentifier);
    if (admin && admin.password === password) {
      const { password: _, ...adminData } = admin; // Excluir contraseña
      const userToStore = { ...adminData, lastLogin: new Date().toISOString() };
      setCurrentUser(userToStore);
      try {
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
      }
      return { success: true };
    } else if (admin) {
      return { success: false, message: 'Contraseña incorrecta.' };
    }

    // Buscar en la lista de usuarios registrados por username O email
    const user = registeredUsers.find(u => 
      u.username.toLowerCase() === normalizedIdentifier || 
      (u.email && u.email.toLowerCase() === normalizedIdentifier)
    );
    if (user && user.password === password) {
      const { password: _, ...userData } = user; // Excluir contraseña
      const userToStore = { ...userData, lastLogin: new Date().toISOString() };
      setCurrentUser(userToStore);
      try {
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
      }
      return { success: true };
    } else if (user) {
      return { success: false, message: 'Contraseña incorrecta.' };
    }

    return { success: false, message: 'Usuario no encontrado.' };
  };

  const register = (username, email, password, role, level) => {
    if (!username || !email || typeof email !== 'string' || !password) {
      return { success: false, message: 'Todos los campos son requeridos.' };
    }

    const normalizedUsername = username.toLowerCase().trim();
    const normalizedEmail = email.toLowerCase().trim();
    
    if (normalizedUsername.length < 3) {
      return { success: false, message: 'El nombre de usuario debe tener al menos 3 caracteres.' };
    }
    if (password.length < 6) {
      return { success: false, message: 'La contraseña debe tener al menos 6 caracteres.' };
    }

    const isAdmin = adminUsers.some(u => u.username.toLowerCase() === normalizedUsername);
    const isUsernameTaken = registeredUsers.some(u => u.username.toLowerCase() === normalizedUsername);
    const isEmailTaken = registeredUsers.some(u => u.email && u.email.toLowerCase() === normalizedEmail);

    if (isAdmin || isUsernameTaken) {
      return { success: false, message: 'El nombre de usuario ya está en uso.' };
    }
    if (isEmailTaken) {
      return { success: false, message: 'El correo electrónico ya está en uso.' };
    }

    const newUser = {
      username: username.trim(),
      email: email.trim(),
      password: password, // ¡Inseguro! Solo para demostración.
      role: role, // 'normal' o 'student'
      englishLevel: level, // 0, 1, 2, o 3
      createdAt: new Date().toISOString(),
    };

    const { password: _, ...userData } = newUser; // Excluir contraseña para el estado y currentUser

    try {
      setRegisteredUsers(prevUsers => [...prevUsers, newUser]);
      setCurrentUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return { success: true, message: '¡Registro e inicio de sesión exitosos!' };
    } catch (error) {
      console.error('Error during registration:', error);
      return { success: false, message: 'Error interno al registrar el usuario.' };
    }
  };

  const logout = (onClose) => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Error during logout:', error);
    }
    onClose?.(); // Llamamos a la función de cierre si se proporciona
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    isAdmin: currentUser?.role === 'admin',
    isLoggedIn: !!currentUser,
  };

  return (
    <AutorizacionContext.Provider value={value}>
      {children}
    </AutorizacionContext.Provider>
  );
};

export default AutorizacionContext;

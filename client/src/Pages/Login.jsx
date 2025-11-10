// Importa React y el hook useState para manejar el estado del componente.
import React, { useState } from 'react';
// Importa el hook personalizado para acceder al contexto de autorización.
import { useAutorizacion } from '../Contexts/AutorizacionContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
// Importa los iconos para mostrar/ocultar la contraseña.
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Componente funcional para el inicio de sesión. Recibe props para cerrar el panel y cambiar a registro.
export default function Login({ onClose, onSwitchToRegister }) {
  // Obtiene el usuario actual y las funciones de login/logout del contexto de autorización.
  const { currentUser, login, logout } = useAutorizacion();
  // Estados para almacenar los valores de los campos del formulario.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Estado para controlar la visibilidad de la contraseña.
  const [showPassword, setShowPassword] = useState(false);
  // Estados para mostrar mensajes de error o éxito al usuario.
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Función que se ejecuta al enviar el formulario de login.
  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que la página se recargue.
    // Limpia los mensajes de error/éxito anteriores.
    setError('');
    setSuccess('');
    // Llama a la función 'login' del contexto con las credenciales.
    const result = await login({ username, password }); // ✅ Enviar objeto
    // Si el resultado no es exitoso, muestra el mensaje de error.
    if (!result.success) {
      setError(result.message);
    } else {
      setSuccess('¡Inicio de sesión exitoso!'); // Muestra un mensaje de éxito.
      setTimeout(() => onClose(), 1000); // Cierra el panel de login después de 1 segundo.
    }
  };

  // Funciones para alternar la visibilidad de la contraseña.
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // --- VISTA CONDICIONAL: SI EL USUARIO YA ESTÁ LOGUEADO ---
  // Si 'currentUser' existe, significa que el usuario ya ha iniciado sesión.
  if (currentUser) {
    return (
      <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
        {/* Muestra un mensaje de bienvenida y el rol del usuario. */}
        <Typography variant="h6">¡Bienvenido, {currentUser.username}!</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          (Rol: {currentUser.rol})
        </Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {/* Botón para cerrar sesión. */}
        <Button variant="contained" color="error" onClick={() => {
          logout();
          if (onClose) onClose(); // Cierra el panel si la función está disponible.
        }}>
          Cerrar Sesión
        </Button>
      </Paper>
    );
  }

  return (
    // --- VISTA CONDICIONAL: SI EL USUARIO NO ESTÁ LOGUEADO ---
    // Muestra el formulario de inicio de sesión.
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 } }}>
      {/* Muestra alertas de error o éxito si existen. */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      
      <Box component="form" onSubmit={handleLogin} noValidate>
        <Typography variant="h5" gutterBottom>Iniciar Sesión</Typography>
        <TextField
          // Campo para el nombre de usuario.
          margin="normal"
          required
          fullWidth
          id="username"
          label="Nombre de Usuario"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          // Campo para la contraseña.
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // InputProps para añadir el icono de visibilidad de contraseña.
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* Botón para enviar el formulario. */}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
          Entrar
        </Button>
        <Typography variant="body2" align="center">
          {/* Enlace para cambiar al formulario de registro. */}
          ¿No tienes una cuenta?{' '}
          <Link component="button" type="button" onClick={onSwitchToRegister} sx={{ verticalAlign: 'baseline' }}>
            Regístrate aquí
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
}

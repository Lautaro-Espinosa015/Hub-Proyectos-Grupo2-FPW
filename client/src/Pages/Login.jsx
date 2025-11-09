import React, { useState } from 'react';
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
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login({ onClose, onSwitchToRegister }) {
  const { currentUser, login, logout } = useAutorizacion();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const result = await login({ username, password }); // ✅ Enviar objeto
    if (!result.success) {
      setError(result.message);
    } else {
      setSuccess('¡Inicio de sesión exitoso!');
      setTimeout(() => onClose(), 1000); // Cierra el panel después de 1s
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  if (currentUser) {
    return (
      <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">¡Bienvenido, {currentUser.username}!</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          (Rol: {currentUser.rol})
        </Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Button variant="contained" color="error" onClick={() => {
          logout();
          if (onClose) onClose();
        }}>
          Cerrar Sesión
        </Button>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 } }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      
      <Box component="form" onSubmit={handleLogin} noValidate>
        <Typography variant="h5" gutterBottom>Iniciar Sesión</Typography>
        <TextField
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
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
          Entrar
        </Button>
        <Typography variant="body2" align="center">
          ¿No tienes una cuenta?{' '}
          <Link component="button" type="button" onClick={onSwitchToRegister} sx={{ verticalAlign: 'baseline' }}>
            Regístrate aquí
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
}

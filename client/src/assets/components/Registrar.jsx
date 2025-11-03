import React, { useState } from 'react';
import { useAutorizacion } from './Contexts/AutorizacionContext';
import { Box, TextField, Button, Typography, Alert, Link } from '@mui/material';

function Registrar({ onClose, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAutorizacion();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const result = register(username, password);

    if (result.success) {
      // El registro fue exitoso, el usuario ya está logueado por el contexto.
      // Podemos cerrar el formulario.
      if (onClose) {
        onClose();
      }
    } else {
      setError(result.message || 'Ocurrió un error durante el registro.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
        Ingresa Tus Datos
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        margin="normal"
        required
        fullWidth
        id="register-username"
        label="Nombre de usuario"
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
        type="password"
        id="register-password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Registrarse
      </Button>
      <Typography variant="body2" align="center">
        ¿Ya tienes una cuenta?{' '}
        <Link component="button" type="button" onClick={onSwitchToLogin} sx={{ verticalAlign: 'baseline' }}>
          Inicia sesión aquí
        </Link>
      </Typography>
    </Box>
  );
}

export default Registrar;
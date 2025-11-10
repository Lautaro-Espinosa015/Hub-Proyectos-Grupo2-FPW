import React, { useState } from 'react';
import { useAutorizacion } from '../Contexts/AutorizacionContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Modal,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PlacementModalContent from './PlacementModalContent'; // Importamos el contenido del modal

// Componente funcional para el registro de nuevos usuarios.
function Registrar({ onClose, onSwitchToLogin }) {
  // Hook para acceder a la función de registro del contexto de autorización.
  const { register } = useAutorizacion();
  
  // Estados para los campos del formulario.
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('normal'); // 'normal' o 'student'
  
  // Estado para controlar la visibilidad del modal de selección de nivel.
  const [isPlacementModalOpen, setIsPlacementModalOpen] = useState(false);

  // Estados para manejar mensajes de error y éxito.
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Estados para mostrar/ocultar las contraseñas.
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Función que se ejecuta al enviar el formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    // Validación básica: las contraseñas deben coincidir.
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Lógica condicional basada en el rol
    if (role === 'normal') {
      // Si es un usuario 'normal', se llama a la función de registro directamente con nivel 0.
      const result = await register({
        username,
        email,
        password,
        rol: 'normal',
        nivel: 0,
      });
      if (result.success) {
        setSuccess(result.message); // Muestra mensaje de éxito.
        setTimeout(() => onClose(), 2000); // Cierra el panel de registro después de 2 segundos.
      } else {
        setError(result.message);
      }
    } else {
      // Si es un 'student', no se registra todavía, sino que se abre el modal para que seleccione su nivel.
      // No registramos todavía.
      setIsPlacementModalOpen(true);
    }
  };

  // Esta función se llama desde el modal cuando se selecciona un nivel.
  const handleLevelSelectAndRegister = async (level) => {
    // Ahora sí, con el nivel seleccionado, se llama a la función de registro.
    const result = await register({
      username,
      email,
      password,
      rol: 'student',
      nivel: level,
    });
    if (result.success) {
      setSuccess(result.message); // Muestra mensaje de éxito.
      setIsPlacementModalOpen(false); // Cierra el modal de selección de nivel.
      setTimeout(() => onClose(), 2000); // Cierra todo el panel de registro después de 2 segundos.
    } else {
      setError(result.message); // Muestra el error.
      setIsPlacementModalOpen(false); // Cierra el modal incluso si hay error
    }
  };

  // Estilo para el Box dentro del Modal
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', md: '70%', lg: '60%' },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
  };

  return (
    <>
      {/* Muestra alertas de error o éxito si existen. */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* Campos de texto para el formulario de registro. */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Nombre de Usuario"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Correo Electrónico"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirmar Contraseña"
          type={showConfirmPassword ? 'text' : 'password'}
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Selección de tipo de cuenta (rol). */}
        <FormControl component="fieldset" margin="normal" fullWidth>
          <FormLabel component="legend">Tipo de Cuenta</FormLabel>
          <RadioGroup row aria-label="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <FormControlLabel value="normal" control={<Radio />} label="Usuario Normal" />
            <FormControlLabel value="student" control={<Radio />} label="Alumno de Inglés" />
          </RadioGroup>
        </FormControl>

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
          Registrar
        </Button>
        {/* Enlace para cambiar al formulario de inicio de sesión. */}
        <Typography variant="body2" align="center">
          ¿Ya tienes una cuenta?{' '}
          <Link component="button" type="button" onClick={onSwitchToLogin} sx={{ verticalAlign: 'baseline' }}>
            Inicia sesión aquí
          </Link>
        </Typography>
      </Box>

      {/* Modal para la selección de nivel de inglés, se muestra solo si isPlacementModalOpen es true. */}
      <Modal open={isPlacementModalOpen} onClose={() => setIsPlacementModalOpen(false)} aria-labelledby="placement-test-modal-title">
        <Box sx={modalStyle}>
          <PlacementModalContent onLevelSelect={handleLevelSelectAndRegister} />
        </Box>
      </Modal>
    </>
  );
}

// Exporta el componente para ser usado en otras partes de la aplicación.
export default Registrar;
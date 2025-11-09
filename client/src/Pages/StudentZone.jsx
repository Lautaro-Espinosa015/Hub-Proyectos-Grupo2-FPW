import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAutorizacion } from '../Contexts/AutorizacionContext';
import { Container, Typography, Paper, Box, Alert } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import BuildIcon from '@mui/icons-material/Build';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

// Información de cada nivel
const nivelesInfo = {
  1: { titulo: 'Nivel Explorador', icono: <ExploreIcon fontSize="large" color="primary" /> },
  2: { titulo: 'Nivel Constructor', icono: <BuildIcon fontSize="large" color="secondary" /> },
  3: { titulo: 'Nivel Conversador', icono: <RecordVoiceOverIcon fontSize="large" style={{ color: '#2e7d32' }} /> },
};

function StudentZone() {
  const { currentUser, isLoggedIn } = useAutorizacion();
  const { level } = useParams(); // Obtiene el nivel de la URL (ej: /student-zone/1)
  const userLevel = currentUser?.nivel;

  // 1. Proteger la ruta: si no está logueado o no es estudiante, no puede entrar.
  if (!isLoggedIn || currentUser?.rol !== 'student') {
    // Podríamos redirigir a la home o mostrar un error.
    // Por ahora, una simple alerta.
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Acceso denegado. Esta zona es solo para estudiantes registrados.</Alert>
      </Container>
    );
  }

  // 2. Consistencia: si el usuario intenta acceder a un nivel que no es el suyo, lo redirigimos.
  if (userLevel && userLevel.toString() !== level) {
    return <Navigate to={`/student-zone/${userLevel}`} replace />;
  }

  const infoNivel = nivelesInfo[userLevel];

  if (!infoNivel) {
    return <Container sx={{ py: 4 }}><Alert severity="warning">No se encontró información para tu nivel.</Alert></Container>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper elevation={4} sx={{ p: { xs: 2, md: 4 }, textAlign: 'center' }}>
        <Box sx={{ mb: 2 }}>{infoNivel.icono}</Box>
        <Typography variant="h3" component="h1" gutterBottom>
          {infoNivel.titulo}
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          ¡Bienvenido a tu zona de aprendizaje, {currentUser.username}!
        </Typography>
        
        <Typography variant="body1">
          Aquí pronto encontrarás juegos y actividades diseñados especialmente para ti.
        </Typography>
        
        {/* Aquí es donde en el futuro listarás los juegos para este nivel */}
        <Box mt={4} p={2} border="1px dashed grey" borderRadius={2}>
          <Typography>Próximamente: Lista de Juegos</Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default StudentZone;

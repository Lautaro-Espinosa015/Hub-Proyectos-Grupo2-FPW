import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useAutorizacion } from '../Contexts/AutorizacionContext';
import { Container, Typography, Paper, Box, Alert, Grid, Card, CardContent, Button } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import BuildIcon from '@mui/icons-material/Build';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';


// --- Definimos los juegos para cada nivel ---
const juegosPorNivel = {
  1: [
    {
      nombre: 'Arrastra la Imagen',
      descripcion: 'Aprende vocabulario básico relacionando imágenes con sus nombres en inglés.',
      ruta: '/ArrastraLaImagen'
    },


     {
      nombre: 'Adivina el Día',
      descripcion: 'Aprende los días de la semana en inglés jugando a adivinar el día correcto.',
      ruta: '/AdivinaDia'
    },

{
      nombre: 'Juego de Memoria ',
      descripcion: 'Aprende vocabulario básico en inglés con este divertido juego de memoria.',
      ruta: '/juegomemoria'
    },

    {
      nombre: 'Quiz de Vocabulario',
      descripcion: 'Pon a prueba tu conocimiento con este quiz de opción múltiple.',
      ruta: '/QuizSimulator'
    },

    {
      nombre: 'Juego de Sí y No',
      descripcion: 'Aprende a responder preguntas básicas en inglés con este juego interactivo.',
      ruta: '/YesNo'
    },

    {
      nombre: 'Juego de Conversación',
      descripcion: 'Practica diálogos simples en inglés con este juego interactivo.',
      ruta: '/ConversacionJuego'
    },

    // Aquí podrías añadir más juegos para el Nivel 1 en el futuro
  ],
  2: [
  {
    nombre: 'Las Partes Del Cuerpo',
      descripcion: 'Aprende las partes del cuerpo relacionando imágenes con sus nombres en inglés.',
      ruta: '/BodyClickGame'
  },

{
      nombre: 'Juego de Verbos',
      descripcion: 'Aprende la utilizacion de verbos básicos en Ingles',
      ruta: '/JuegoVerbosD'
    },

], // Juegos para Nivel 2
  3: [{


      nombre: 'Dialoga con el Simulador',
      descripcion: 'Aprende pronunciacion con el simulador de conversacion.',
      ruta: '/ConversationalSimulator'
    },
    

    {
      nombre: 'Quiz Avanzado',
      descripcion: 'Desafía tus conocimientos con preguntas más complejas y con más opciones.',
      ruta: '/AdvancedQuizSimulator'
    


  }]  // Juegos para Nivel 3
};

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

  // 1. Proteger la ruta: si no está logueado o no es estudiante/admin, no puede entrar.
  if (!isLoggedIn || (currentUser?.rol !== 'student' && currentUser?.rol !== 'admin')) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Acceso denegado. Esta zona es solo para usuarios registrados.</Alert>
      </Container>
    );
  }

  // 2. Consistencia para ESTUDIANTES: si intenta acceder a un nivel que no es el suyo, lo redirigimos.
  // Los administradores pueden ver cualquier nivel.
  if (currentUser?.rol === 'student' && userLevel && userLevel.toString() !== level) {
    return <Navigate to={`/student-zone/${userLevel}`} replace />;
  }

  // 3. Obtener la información del nivel desde la URL, no desde el usuario.
  const currentLevel = level || userLevel;
  const infoNivel = nivelesInfo[currentLevel];


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
        
        {/* --- Sección de Juegos --- */}
        <Grid container spacing={4} mt={2} justifyContent="center">
          {juegosPorNivel[currentLevel]?.length > 0 ? (
            juegosPorNivel[currentLevel].map((juego) => (
              <Grid item key={juego.nombre} xs={12} sm={8} md={6}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {juego.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {juego.descripcion}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button component={Link} to={juego.ruta} variant="contained" color="secondary">
                      ¡A Jugar!
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box mt={4} p={3} border="1px dashed grey" borderRadius={2}>
                <Typography variant="h6">¡Pronto habrá nuevos juegos para ti!</Typography>
                <Typography color="text.secondary">Estamos trabajando en más actividades para tu nivel.</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}

export default StudentZone;

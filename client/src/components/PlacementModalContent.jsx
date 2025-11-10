// Importa React y los componentes necesarios de Material-UI para la interfaz.
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  ListItemIcon,
} from '@mui/material';
// Importa los iconos que se usarán en las tarjetas de selección.
import ExploreIcon from '@mui/icons-material/Explore';
import BuildIcon from '@mui/icons-material/Build';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

// Array de objetos que define los datos para cada nivel de inglés.
// Centralizar estos datos facilita la modificación y el mantenimiento del componente.
const levels = [
  {
    level: 1,
    title: 'Explorador',
    description: 'Quiero empezar desde cero y aprender lo básico.',
    icon: <ExploreIcon fontSize="large" color="primary" />,
  },
  {
    level: 2,
    title: 'Constructor',
    description: 'Ya sé un poco, quiero construir frases y entender más.',
    icon: <BuildIcon fontSize="large" color="secondary" />,
  },
  {
    level: 3,
    title: 'Conversador',
    description: 'Entiendo bien, mi meta es hablar con más fluidez.',
    icon: <RecordVoiceOverIcon fontSize="large" style={{ color: '#2e7d32' }} />,
  },
];

/**
 * Componente que renderiza el contenido del modal para la selección de nivel de inglés.
 * Muestra tres tarjetas, una para cada nivel, y permite al usuario elegir una.
 * @param {object} props - Las propiedades del componente.
 * @param {(level: number) => void} props.onLevelSelect - Función callback que se ejecuta cuando el usuario selecciona un nivel. Pasa el número del nivel seleccionado como argumento.
 */
function PlacementModalContent({ onLevelSelect }) {
  return (
    // Contenedor principal con padding y texto centrado.
    <Box sx={{ p: { xs: 2, sm: 4 }, textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Elige tu punto de partida
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Selecciona el nivel que mejor describa tu conocimiento actual de inglés.
      </Typography>

      {/* Grid container para alinear las tarjetas de los niveles. */}
      <Grid container spacing={3} justifyContent="center">
        {/* Itera sobre el array 'levels' para crear una tarjeta por cada nivel. */}
        {levels.map((item) => (
          // Cada tarjeta se coloca en un item del grid. Ocupa todo el ancho en pantallas pequeñas (xs) y un tercio en medianas (md).
          <Grid item key={item.level} xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                // Añade una transición suave para los efectos de hover.
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              {/* CardActionArea hace que toda la tarjeta sea clickeable. */}
              <CardActionArea
                // Al hacer clic, se llama a la función 'onLevelSelect' pasada por props con el nivel correspondiente.
                onClick={() => onLevelSelect(item.level)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 3,
                }}
              >
                {/* Muestra el icono del nivel. */}
                <ListItemIcon sx={{ minWidth: 'auto', mb: 2 }}>
                  {item.icon}
                </ListItemIcon>
                {/* Contenido de la tarjeta con el título y la descripción. */}
                <CardContent sx={{ p: 0 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// Exporta el componente para que pueda ser utilizado en otros archivos, como en el componente de Registro.
export default PlacementModalContent;
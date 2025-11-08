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
import ExploreIcon from '@mui/icons-material/Explore';
import BuildIcon from '@mui/icons-material/Build';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

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
 * Contenido del modal para la selección de nivel de inglés.
 * @param {object} props
 * @param {(level: number) => void} props.onLevelSelect - Función que se llama al seleccionar un nivel.
 */
function PlacementModalContent({ onLevelSelect }) {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Elige tu punto de partida
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Selecciona el nivel que mejor describa tu conocimiento actual de inglés.
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {levels.map((item) => (
          <Grid item key={item.level} xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea
                onClick={() => onLevelSelect(item.level)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 3,
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', mb: 2 }}>
                  {item.icon}
                </ListItemIcon>
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

export default PlacementModalContent;
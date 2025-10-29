import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box
} from '@mui/material';

import imageBrian from '../Ing/Logo_BrianXD.png';
import imageWalter from '../Ing/Logo_Walter.jpg';
import imageMel from '../Ing/Logo_Melani.jpg';
import imageMauro from '../Ing/Logo_Mauro.jpg';
import imageLautaro from '../Ing/Logo_Lautaro.jpg';


// Paso 1: Estructura de datos del equipo.
// En una aplicación real, esto podría venir de una API.
const teamMembers = [
  {
    id: 1,
    nameTag: 'Lautii',
    name: 'Espinosa Lautaro Eduardo',
    image: imageLautaro
  },
  {
    id: 2,
    name: 'Morales Pappalardo Mauro Francisco',
    nameTag: 'TerrorDaemonum',
    image: imageMauro
  },
  {
    id: 3,
    name: 'Cussi Walter Leonel',
    nameTag: 'EnderJack379',
    image: imageWalter
  },
  {
    id: 4,
    name: 'Estrada Luis Brian Gabriel',
    nameTag: 'BrianXD',
    image: imageBrian
  },
  {
    id: 5,
    name: 'Silva Melani Isabel',
    nameTag: 'Milanesa',
    image: imageMel
  }
];

function AboutUs() {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Presentación del Grupo 2
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Conoce al equipo detrás de los proyectos de FPW.
        </Typography>
      </Box>

      {/* Grid container para las tarjetas de los miembros */}
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member) => (
          // Grid item para cada tarjeta, con breakpoints para responsividad
          <Grid item key={member.id} xs={12} sm={6} md={4} lg>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                alignSelf: 'stretch', // Asegura que el Card se estire si el Grid item es más alto
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6, // Eleva la sombra en hover
                },
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={member.image}
                alt={`Foto de ${member.name}`}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {member.nameTag}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AboutUs;


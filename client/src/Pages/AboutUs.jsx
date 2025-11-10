import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  CardActionArea
} from '@mui/material';

import imageBrian from '../assets/Img/Logo_BrianXD.png';
import imageWalter from '../assets/Img/Logo_Walter.jpg';
import imageMel from '../assets/Img/Logo_Melani.jpg';
import imageMauro from '../assets/Img/Logo_Mauro.jpg';
import imageLautaro from '../assets/Img/Logo_Lautaro.jpg';

// Atajo para gestionar las rutas de los perfiles de usuario.
const profileRoutes = {
  1: '/LautaroEspinosaProfile',
  2: '/MauroMoralesProfile',
  3: '/WalterCussiProfile',
  4: '/BrianEstradaProfile',
  5: '/MelaniSilvaProfile',
};

// Paso 1: Estructura de datos del equipo.
// En una aplicación real, esto podría venir de una API.
const teamMembers = [
  {
    id: 1,
    nameTag: 'Lautaro Espinosa',
    name: 'Espinosa Lautaro Eduardo',
    image: imageLautaro,
    profileRoute: profileRoutes[1],
  },
  {
    id: 2,
    name: 'Morales Pappalardo Mauro Francisco',
    nameTag: 'TerrorDaemonum',
    image: imageMauro,
    profileRoute: profileRoutes[2],
  },
  {
    id: 3,
    name: 'Cussi Walter Leonel',
    nameTag: 'EnderJack379',
    image: imageWalter,
    profileRoute: profileRoutes[3],
  },
  {
    id: 4,
    name: 'Estrada Luis Brian Gabriel',
    nameTag: 'BrianXD',
    image: imageBrian,
    profileRoute: profileRoutes[4],
  },
  {
    id: 5,
    name: 'Silva Melani Isabel',
    nameTag: 'Milanesa',
    image: imageMel,
    profileRoute: profileRoutes[5],
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
          <Grid item key={member.id} xs={12} sm={6} md={4} lg={2.4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea component={Link} to={member.profileRoute}>
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
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AboutUs;

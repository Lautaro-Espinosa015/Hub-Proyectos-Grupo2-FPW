import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container, 
    Paper, 
    Box, 
    Typography, 
    Grid, 
    Chip, 
    Button, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Avatar, 
    Divider 
} from '@mui/material';
import Stack from '@mui/material/Stack';

// Importa los iconos de MUI
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import CodeIcon from '@mui/icons-material/Code'; // Para programación
import PeopleIcon from '@mui/icons-material/People'; // Para trabajo en equipo
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'; // Para Electricidad
import ComputerIcon from '@mui/icons-material/Computer'; // Para Informática
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'; // Para Fabril
import SolarPowerIcon from '@mui/icons-material/SolarPower'; // Para Paneles Solares
import PrintIcon from '@mui/icons-material/Print'; // Para Sublimación

// Datos del perfil de Luis
const profileDataLuis = {
    name: "Estrada Luis Brian Gabriel",
    title: "Técnico en Electricidad e Informática",
    phone: "3883147397",
    email: "luisbriangabrielestrada.gmail.com",
    github: "https://github.com/BrianXD1504",
    githubHandle: "BrianXD1504",
    summary: "Técnico con experiencia práctica en Electricidad (instalación y solución de fallas en sistemas domiciliarios e industriales) e Informática/Sistemas (reparación completa de PC hardware y software). Conocimiento en técnicas de producción por Sublimación.",
    experience: [ // Áreas de Experiencia
        { area: "Electricidad Domiciliaria", icon: <ElectricBoltIcon /> },
        { area: "Electricidad Fabril", icon: <PrecisionManufacturingIcon /> },
        { area: "Reparación de PC (Hardware y Software)", icon: <ComputerIcon /> },
        { area: "Paneles Solares", icon: <SolarPowerIcon /> },
        { area: "Sublimación", icon: <PrintIcon /> }
    ],
    education: [
        { school: "Escuela Nº 23 Gral. Belgrano", degree: "Formación Técnica", years: "Titulado" }
    ],
    skills: {
        software: ["JavaScript", "Java", "C#"],
        soft: ["Trabajo en Equipo"]
    },
    languages: [
        { lang: "Español", level: "Nativo" },
        { lang: "Inglés", level: "Muy Básico" }
    ]
};

// Componente del Perfil de Luis
export default function LuisEstradaProfile() {
  return (
    <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
      <Button 
        component={Link} 
        to="/aboutus" 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 2 }}
      >
        Volver a Sobre Nosotros
      </Button>
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        
        {/* --- Encabezado --- */}
        <Box 
          sx={{ 
            p: 4, 
            bgcolor: 'primary.main', 
            color: 'primary.contrastText', 
            borderTopLeftRadius: 8, 
            borderTopRightRadius: 8 
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.light' }}>
                <PersonIcon sx={{ fontSize: 60 }} />
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" component="h1" fontWeight="bold">
                {profileDataLuis.name}
              </Typography>
              <Typography variant="h6" component="p" color="primary.contrastText" sx={{ opacity: 0.9 }}>
                {profileDataLuis.title}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* --- Cuerpo del Perfil --- */}
        <Box sx={{ p: 4 }}>
          
          {/* --- Información de Contacto --- */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
             <Grid item xs={12} sm={6}>
              <Button 
                variant="outlined" 
                startIcon={<GitHubIcon />} 
                fullWidth 
                href={profileDataLuis.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileDataLuis.githubHandle}
              </Button>
            </Grid>
             <Grid item xs={12} sm={6}>
              <Button 
                variant="outlined" 
                startIcon={<EmailIcon />} 
                fullWidth 
                href={`mailto:${profileDataLuis.email}`}
              >
                {profileDataLuis.email}
              </Button>
            </Grid>
            <Grid item xs={12}>
               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1, border: '1px solid rgba(255, 255, 255, 0.23)', borderRadius: 1, height: '100%' }}>
                    <PhoneIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">{profileDataLuis.phone}</Typography>
                </Box>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 3 }} />

          {/* --- Contenedor Principal de dos columnas --- */}
          <Grid container spacing={4} sx={{ mt: 1 }}>
            {/* --- Columna Izquierda --- */}
            <Grid item xs={12} md={5}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                  Perfil Profesional
                </Typography>
                <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                  {profileDataLuis.summary}
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                  Habilidades
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profileDataLuis.skills.software.map(skill => (
                    <Chip key={skill} icon={<CodeIcon />} label={skill} color="secondary" />
                  ))}
                  {profileDataLuis.skills.soft.map(skill => (
                    <Chip key={skill} icon={<PeopleIcon />} label={skill} color="primary" variant="outlined" />
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                  Idiomas
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profileDataLuis.languages.map((lang, index) => (
                    <Chip key={index} icon={<LanguageIcon />} label={`${lang.lang}: ${lang.level}`} />
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* --- Columna Derecha --- */}
            <Grid item xs={12} md={7}>
              <Box>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                  Áreas de Experiencia
                </Typography>
                <Stack spacing={2}>
                  {profileDataLuis.experience.map((exp, index) => (
                    <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs="auto">
                          <Avatar sx={{ bgcolor: 'action.selected' }}>{exp.icon}</Avatar>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="body1" fontWeight="bold">{exp.area}</Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Stack>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                  Formación Académica
                </Typography>
                <Stack spacing={2}>
                  {profileDataLuis.education.map((edu, index) => (
                    <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs="auto">
                          <Avatar sx={{ bgcolor: 'action.selected' }}><SchoolIcon /></Avatar>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="body1" fontWeight="bold">{edu.degree}</Typography>
                          <Typography variant="body2" color="text.secondary">{edu.school}</Typography>
                        </Grid>
                        <Grid item xs="auto">
                          <Typography variant="caption" color="text.secondary">{edu.years}</Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

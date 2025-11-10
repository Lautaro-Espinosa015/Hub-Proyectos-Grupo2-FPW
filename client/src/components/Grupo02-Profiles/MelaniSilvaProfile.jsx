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
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import CodeIcon from '@mui/icons-material/Code'; // Para programación
import StorageIcon from '@mui/icons-material/Storage'; // Para bases de datos
import AnalyticsIcon from '@mui/icons-material/Analytics'; // Para análisis
import PeopleIcon from '@mui/icons-material/People'; // Para trabajo en equipo
import HomeIcon from '@mui/icons-material/Home'; // Para la dirección
import PaletteIcon from '@mui/icons-material/Palette'; // --- NUEVO: Icono para Artista ---

// --- CORRECCIÓN: Datos del perfil de Melani actualizados ---
const profileDataMelani = {
    name: "Melani Isabel Silva",
    title: "Estudiante TUDIVJ y Artista Digital", // <-- Título cambiado
    address: "Calle Mina Rio turbio, Barrio Paso de jama, 778",
    phone: "3886855102",
    email: "melanisilva2010@gmail.com",
    blipHandle: "melanisilva2010-blip", 
    // --- NUEVO: Link de GitHub añadido ---
    github: "https://github.com/melanisilva2010-blip",
    summary: "Estudiante de Tecnicatura Universitaria en Diseño Integral de Videojuegos (TUDIVJ) y Artista Digital. Comprometida con el desarrollo continuo y la excelencia en el trabajo.", // <-- Resumen cambiado
    experience: [
        // La experiencia anterior de "Ingeniera" fue eliminada.
        // Puedes añadir sus proyectos de arte aquí.
        { role: "Artista Digital", company: "Proyectos Personales", year: "Actualidad" } 
    ],
    education: [
        // <-- Formación actualizada para TUDIVJ
        { school: "FI-UNJU", degree: "Tecnicatura Univ. en Diseño Integral de Videojuegos", years: "Estudiante de primer año (En curso)" }
    ],
    skills: {
        technical: ["JavaScript"],
        tools: ["MySQL", "Análisis de Datos"], 
        soft: ["Trabajo en Equipo"],
        creative: ["Arte Digital", "Ilustración"] // <-- Habilidad de Artista añadida
    },
    languages: [
        { lang: "Español", level: "Nativo" },
        { lang: "Inglés", level: "Básico" }
    ]
};

// Componente del Perfil de Melani
export default function MelaniSilvaProfile() {
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
                {profileDataMelani.name}
              </Typography>
              <Typography variant="h6" component="p" color="primary.contrastText" sx={{ opacity: 0.9 }}>
                {profileDataMelani.title} 
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
                startIcon={<EmailIcon />} 
                fullWidth 
                href={`mailto:${profileDataMelani.email}`}
              >
                {profileDataMelani.email}
              </Button>
            </Grid>
            {/* --- CORRECCIÓN: Convertido en Botón de GitHub --- */}
            <Grid item xs={12} sm={6}>
              <Button 
                variant="outlined" 
                startIcon={<GitHubIcon />} 
                fullWidth 
                href={profileDataMelani.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileDataMelani.blipHandle}
              </Button>
            </Grid>
             <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1, border: '1px solid rgba(255, 255, 255, 0.23)', borderRadius: 1, height: '100%' }}>
                    <PhoneIcon sx={{ mr: 1 }} />
                    <Typography>{profileDataMelani.phone}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1, border: '1px solid rgba(255, 255, 255, 0.23)', borderRadius: 1, height: '100%' }}>
                    <HomeIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">{profileDataMelani.address}</Typography>
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
                  {profileDataMelani.summary}
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                  Habilidades
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profileDataMelani.skills.creative.map(skill => (
                    <Chip key={skill} icon={<PaletteIcon />} label={skill} color="secondary" />
                  ))}
                  {profileDataMelani.skills.technical.map(skill => (
                    <Chip key={skill} icon={<CodeIcon />} label={skill} color="secondary" />
                  ))}
                  {profileDataMelani.skills.tools.map(skill => (
                    skill === "MySQL" ? <Chip key={skill} icon={<StorageIcon />} label={skill} color="primary" /> : 
                    <Chip key={skill} icon={<AnalyticsIcon />} label={skill} color="primary" />
                  ))}
                  {profileDataMelani.skills.soft.map(skill => (
                    <Chip key={skill} icon={<PeopleIcon />} label={skill} color="primary" variant="outlined" />
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                  Idiomas
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profileDataMelani.languages.map((lang, index) => (
                    <Chip key={index} icon={<LanguageIcon />} label={`${lang.lang}: ${lang.level}`} />
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* --- Columna Derecha --- */}
            <Grid item xs={12} md={7}>
              <Box>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                  Experiencia
                </Typography>
                <Stack spacing={2}>
                  {profileDataMelani.experience.map((exp, index) => (
                    <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs="auto">
                          <Avatar sx={{ bgcolor: 'action.selected' }}><PaletteIcon /></Avatar>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="body1" fontWeight="bold">{exp.role}</Typography>
                          <Typography variant="body2" color="text.secondary">{exp.company}</Typography>
                        </Grid>
                        <Grid item xs="auto">
                          <Typography variant="caption" color="text.secondary">{exp.year}</Typography>
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
                  {profileDataMelani.education.map((edu, index) => (
                    <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs="auto">
                          <Avatar sx={{ bgcolor: 'action.selected' }}><SchoolIcon /></Avatar>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="body1" fontWeight="bold">{edu.degree || edu.school}</Typography>
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

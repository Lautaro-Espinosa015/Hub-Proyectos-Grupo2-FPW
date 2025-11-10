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

// Importa los iconos de MUI que usaremos
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person'; // Icono de Avatar genérico
import LanguageIcon from '@mui/icons-material/Language';
import CodeIcon from '@mui/icons-material/Code';
import DnsIcon from '@mui/icons-material/Dns';
import PeopleIcon from '@mui/icons-material/People';

// Datos del perfil
const profileData = {
    name: "Lautaro Eduardo Espinosa",
    title: "Ingeniero en Sistemas", // Corregí el "ing en Sistemas"
    phone: "+543884447165",
    email: "espinosalautii@outlook.com",
    github: "https://github.com/Lautaro-Espinosa015",
    summary: "Profesional Ingeniero en Sistemas con experiencia en gestión de proyectos y desarrollo de videojuegos. Destacado por Liderazgo, decisiones y responsabilidad. Comprometido con el desarrollo continuo y la excelencia en el trabajo.",
    experience: [
        { role: "Departamento de Sistemas", company: "UTN FRT", year: "2024" },
        { role: "Desarrollo (Game Jam FI-UNJU)", company: "La Luz de Mandinga (Unity 3D)", year: "2024" }
    ],
    education: [
        { school: "UNJU FI", years: "2025 - Actualidad" },
        { school: "UTN FRT", years: "2021 - 2025" }
    ],
    skills: {
        technical: ["C", "JavaScript", "Java", "C#", "Haskell", "Prolog"],
        tools: ["Excel Avanzado", "Bases de Datos"],
        soft: ["Liderazgo", "Trabajo en Equipo", "Gestión de Proyectos"]
    },
    languages: [
        { lang: "Español", level: "Nativo" },
        { lang: "Inglés", level: "Básico" }
    ]
};

// Componente del Perfil
export default function LautaroEspinosaProfile() {
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
            bgcolor: 'primary.main', // Asumiendo que tu darkTheme tiene un 'primary.main'
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
                {profileData.name}
              </Typography>
              <Typography variant="h6" component="p" color="primary.contrastText" sx={{ opacity: 0.9 }}>
                {profileData.title}
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
                href={`mailto:${profileData.email}`}
              >
                {profileData.email}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                variant="outlined" 
                startIcon={<GitHubIcon />} 
                fullWidth 
                href={profileData.github}
                target="_blank" // Abre en nueva pestaña
                rel="noopener noreferrer"
              >
                Lautaro-Espinosa015
              </Button>
            </Grid>
            {/* El teléfono lo ponemos como texto, ya que es sensible */}
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1, border: '1px solid rgba(255, 255, 255, 0.23)', borderRadius: 1 }}>
                    <PhoneIcon sx={{ mr: 1 }} />
                    <Typography>{profileData.phone}</Typography>
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
                  {profileData.summary}
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                  Habilidades
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profileData.skills.technical.map(skill => (
                    <Chip key={skill} icon={<CodeIcon />} label={skill} color="secondary" />
                  ))}
                  {profileData.skills.tools.map(skill => (
                    <Chip key={skill} icon={<DnsIcon />} label={skill} color="primary" />
                  ))}
                  {profileData.skills.soft.map(skill => (
                    <Chip key={skill} icon={<PeopleIcon />} label={skill} color="primary" variant="outlined" />
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                  Idiomas
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profileData.languages.map((lang, index) => (
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
                  {profileData.experience.map((exp, index) => (
                    <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs="auto">
                          <Avatar sx={{ bgcolor: 'action.selected' }}><WorkIcon /></Avatar>
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
                  {profileData.education.map((edu, index) => (
                    <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs="auto">
                          <Avatar sx={{ bgcolor: 'action.selected' }}><SchoolIcon /></Avatar>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="body1" fontWeight="bold">{edu.school}</Typography>
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

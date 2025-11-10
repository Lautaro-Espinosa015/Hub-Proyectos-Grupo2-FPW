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
    Divider ,
} from '@mui/material';
import Stack from '@mui/material/Stack';

// Importa los iconos de MUI
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build'; // Para Herramientas
import EditIcon from '@mui/icons-material/Edit'; // Para Documentación
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConstructionIcon from '@mui/icons-material/Construction'; // Para Hardware
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'; // Para Videojuegos
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import StorageIcon from '@mui/icons-material/Storage'; // Para SQL/Bases de Datos
import ComputerIcon from '@mui/icons-material/Computer'; // Icono para Reparación de PCs

// Datos del perfil (Basados en el formulario final)
const profileDataWalter = {
    name: "Walter Leonel Cussi",
    title: "Técnico en Automotores y Reparación de PCs",
    subtitle: "Estudiante: TUDIVJ & APU - FI-UNJU",
    location: "El Carmen, Jujuy, Argentina",
    phones: ["2996343725", "3885088715"],
    emails: ["leonelcussi9@gmail.com", "waltercussi9@gmail.com"],
    github: "https://github.com/EnderJack379?tab=repositories",
    instagram: "https://www.instagram.com/ender.jack?igsh=dnJuYW45Y2xhYXdl",
    summary: "Técnico en Automotores Titulado y Técnico en Reparación y Mantenimiento de PCs (Experiencia Laboral). Estudiante de primer año de Tecnicatura Universitaria en Diseño Integral de Videojuegos (TUDIVJ) y Analista Programador Universitario (APU) en la FI-UNJU. Especializado en documentación técnica, dirección creativa, desarrollo frontend y robótica práctica.",
    experience: [ // Proyectos Clave y Experiencia
        { role: "Técnico en Reparación y Mantenimiento de PCs", company: "Experiencia Laboral", icon: <ComputerIcon /> },
        { role: "Concepto y Diseño de Videojuego 2D", company: "Proyecto Sam", icon: <SportsEsportsIcon /> },
        { role: "Desarrollo (Game Jam FI-UNJU)", company: "La Luz de Mandinga (Unity 3D)", icon: <SportsEsportsIcon /> },
        { role: "Líder de Iluminación y Animatrónicos", company: "Jefatura FNE (Desfile técnico)", icon: <BuildIcon /> },
        { role: "Desarrollador de Robótica", company: "Animatrónico FNE (Arduino)", icon: <ConstructionIcon /> }
    ],
    education: [
        { school: "FI-UNJU", degree: "Tecnicatura Univ. en Diseño Integral de Videojuegos", years: "Estudiante de primer año (En curso)" },
        { school: "FI-UNJU", degree: "Analista Programador Universitario", years: "Estudiante de primer año (En curso)" },
        { school: "Escuela de Educación Técnica N1 Ing Luis Michaud", degree: "Técnico en Automotores", years: "Titulado" }
    ],
    skills: {
        software: ["JavaScript", "React", "POO", "Unity", "C#", "C++ (Arduino)", "Processing", "Git", "HTML", "CSS"],
        tools: ["SQL (MySQL)", "Excel intermedio", "Linux", "AutoCAD", "Impresión 3D"],
        hardware: ["Arduino", "Servomotores", "Electrónica Básica"],
        specialties: ["Reparación de PCs", "Documentación Técnica", "Dirección Creativa", "Desarrollo Frontend", "Robótica Práctica", "Síntesis Didáctica"]
    },
    languages: [
        { lang: "Español", level: "Nativo" },
        { lang: "Inglés", level: "Básico (Cursando)" }
    ]
};

// Componente del Perfil de Walter
export default function WalterCussiProfile() {
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
                {profileDataWalter.name}
              </Typography>
              <Typography variant="h6" component="p" color="primary.contrastText" sx={{ opacity: 1 }}>
                {profileDataWalter.title}
              </Typography>
              <Typography variant="subtitle1" component="p" color="primary.contrastText" sx={{ opacity: 0.8 }}>
                {profileDataWalter.subtitle}
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
                href={profileDataWalter.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub (EnderJack379)
              </Button>
            </Grid>
             <Grid item xs={12} sm={6}>
              <Button 
                variant="outlined" 
                startIcon={<InstagramIcon />} 
                fullWidth 
                href={profileDataWalter.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram (ender.jack)
              </Button>
            </Grid>
            {/* Primer correo electrónico */}
            <Grid item xs={12} sm={6}>
              <Button 
                variant="outlined" 
                startIcon={<EmailIcon />} 
                fullWidth 
                href={`mailto:${profileDataWalter.emails[0]}`}
              >
                {profileDataWalter.emails[0]}
              </Button>
            </Grid>
            {/* Segundo correo electrónico */}
            <Grid item xs={12} sm={6}>
              <Button 
                variant="outlined" 
                startIcon={<EmailIcon />} 
                fullWidth 
                href={`mailto:${profileDataWalter.emails[1]}`}
              >
                {profileDataWalter.emails[1]}
              </Button>
            </Grid>
            {/* Teléfonos (en una fila) */}
            <Grid item xs={12}>
               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1, border: '1px solid rgba(255, 255, 255, 0.23)', borderRadius: 1, height: '100%' }}>
                    <PhoneIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">{profileDataWalter.phones.join(' / ')}</Typography>
                </Box>
            </Grid>
            {/* Ubicación (en una fila) */}
             <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1, border: '1px solid rgba(255, 255, 255, 0.23)', borderRadius: 1 }}>
                    <LocationOnIcon sx={{ mr: 1 }} />
                    <Typography>{profileDataWalter.location}</Typography>
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
                  {profileDataWalter.summary}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                  Habilidades Clave
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profileDataWalter.skills.specialties.map(skill => (
                    <Chip key={skill} icon={skill.includes('Reparación') ? <ComputerIcon /> : <EditIcon />} label={skill} color="primary" variant="outlined" />
                  ))}
                  {profileDataWalter.skills.software.map(skill => (
                    <Chip key={skill} icon={<CodeIcon />} label={skill} color="secondary" />
                  ))}
                  {profileDataWalter.skills.tools.map(skill => (
                    <Chip key={skill} icon={skill.includes('SQL') ? <StorageIcon /> : <BuildIcon />} label={skill} color="primary" />
                  ))}
                  {profileDataWalter.skills.hardware.map(skill => (
                    <Chip key={skill} icon={<ConstructionIcon />} label={skill} color="default" />
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                  Idiomas
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profileDataWalter.languages.map((lang, index) => (
                    <Chip key={index} icon={<LanguageIcon />} label={`${lang.lang}: ${lang.level}`} />
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* --- Columna Derecha --- */}
            <Grid item xs={12} md={7}>
              <Grid container spacing={4}>
                {/* Sub-columna de Experiencia */}
                <Grid item xs={12} lg={6}>
                  <Box>
                    <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                      Experiencia y Proyectos
                    </Typography>
                    <Stack spacing={2}>
                      {profileDataWalter.experience.map((exp, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 2, pl: 2, borderLeft: 3, borderColor: 'divider' }}>
                          <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>{exp.icon || <WorkIcon />}</Avatar>
                          <Box>
                            <Typography variant="body1" fontWeight="bold">{exp.role}</Typography>
                            <Typography variant="body2" color="text.secondary">{exp.company}</Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Grid>
                {/* Sub-columna de Formación */}
                <Grid item xs={12} lg={6}>
                  <Box>
                    <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                      Formación Académica
                    </Typography>
                    <Stack spacing={2}>
                      {profileDataWalter.education.map((edu, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 2, pl: 2, borderLeft: 3, borderColor: 'divider' }}>
                          <Avatar sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText' }}><SchoolIcon /></Avatar>
                          <Box>
                            <Typography variant="body1" fontWeight="bold">{edu.degree}</Typography>
                            <Typography variant="body2" color="text.secondary">{edu.school}</Typography>
                            <Typography variant="caption" color="text.secondary">{edu.years}</Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

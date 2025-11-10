import React from 'react';
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
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

// Importa los iconos de MUI
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub'; // Usamos GitHubIcon para el 'blip' si es un handle similar
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import CodeIcon from '@mui/icons-material/Code'; // Para programación
import StorageIcon from '@mui/icons-material/Storage';
import PeopleIcon from '@mui/icons-material/People'; // Para trabajo en equipo
import HomeIcon from '@mui/icons-material/Home'; // Para la dirección
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArticleIcon from '@mui/icons-material/Article';

// --- DATOS CORREGIDOS PARA MAURO MORALES ---
const profileDataMauro = {
    name: "Mauro Francisco Martin Morales Pappalardo",
    title: "Estudiante de Ing. Química y TUDIVJ",
    address: "Calle Soto N°274 B° Cnel. Arias – San Salvador de Jujuy",
    phones: ["Personal: 3885066019", "Trabajo: 3885089207"],
    email: "mauropappalardo2911@gmail.com",
    github: "https://github.com/TerrorDaemonum",
    githubHandle: "TerrorDaemonum (Mauro Pappalardo)",
    linkedin: "https://www.linkedin.com/in/mauro-pappalardo-b95213268",
    summary: "Estudiante de Ingeniería Química y TUDIVJ con habilidades en desarrollo (Python, JavaScript) y análisis de datos (MySQL, MongoDB). Sólida experiencia en liderazgo y gestión operativa de personal adquirida en el Colegio Militar de la Nación.",
    experience: [
        { role: "Cadete de IIdo Año de Infantería", company: "Colegio Militar de la Nación", year: "", icon: <MilitaryTechIcon /> }
    ],
    education: [
        { school: "Universidad Nacional de Jujuy", degree: "Ingeniería Química", years: "En curso" },
        { school: "Universidad Nacional de Jujuy", degree: "Tecnicatura Univ. en Diseño Integral de Videojuegos", years: "En curso" },
    ],
    certifications: [
        { name: "Introducción de la Ciberseguridad", issuer: "Cisco Networking Academy", link: "https://www.credly.com/badges/9c548af0-9e9e-442a-be4c-8f4b657b7f28/public_url" },
        { name: "Programación con Python", issuer: "ITAA", link: null },
        { name: "Combatiente Individual", issuer: "Colegio Militar de la Nación", link: null }
    ],
    skills: {
        technical: ["Python", "JavaScript", "SQL"],
        tools: ["Office Avanzado", "MySQL", "MongoDB"],
        soft: ["Liderazgo", "Trabajo en equipo", "Conducción", "Gestión operativa"]
    },
    languages: [
        { lang: "Español", level: "Nativo" },
        { lang: "Inglés", level: "Intermedio" },
        { lang: "Italiano", level: "A1-B1" }
    ]
};

// Componente del Perfil de Mauro
export default function MauroMoralesProfile() {
  return (
    <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
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
                {profileDataMauro.name}
              </Typography>
              <Typography variant="h6" component="p" color="primary.contrastText" sx={{ opacity: 0.9 }}>
                {profileDataMauro.title}
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
                href={`mailto:${profileDataMauro.email}`}
              >
                {profileDataMauro.email}
              </Button>
            </Grid>
            {/* --- BOTÓN LINKEDIN AÑADIDO --- */}
            <Grid item xs={12} sm={6}>
              <Button 
                variant="outlined" 
                startIcon={<LinkedInIcon />} 
                fullWidth 
                href={profileDataMauro.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                variant="outlined" 
                startIcon={<GitHubIcon />} 
                fullWidth 
                href={profileDataMauro.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileDataMauro.githubHandle}
              </Button>
            </Grid>
            {/* --- NÚMEROS DE TELÉFONO AÑADIDOS --- */}
             <Grid item xs={12} sm={6}>
               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 1, border: '1px solid rgba(255, 255, 255, 0.23)', borderRadius: 1, height: '100%' }}>
                   <PhoneIcon sx={{ mb: 0.5 }} />
                   <Typography variant="body2">{profileDataMauro.phones[0]}</Typography>
                    <Typography variant="body2">{profileDataMauro.phones[1]}</Typography>
               </Box>
             </Grid>
             <Grid item xs={12}>
                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1, border: '1px solid rgba(255, 255, 255, 0.23)', borderRadius: 1 }}>
                     <HomeIcon sx={{ mr: 1 }} />
                     <Typography variant="body2">{profileDataMauro.address}</Typography>
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
                  {profileDataMauro.summary}
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                  Habilidades
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profileDataMauro.skills.technical.map(skill => (
                    <Chip key={skill} icon={<CodeIcon />} label={skill} color="secondary" />
                  ))}
                  {profileDataMauro.skills.tools.map(skill => (
                    <Chip 
                        key={skill} 
                        icon={skill.includes('Office') ? <ArticleIcon /> : <StorageIcon />} 
                        label={skill} 
                        color="primary" 
                    />
                  ))}
                  {profileDataMauro.skills.soft.map(skill => (
                    <Chip key={skill} icon={<PeopleIcon />} label={skill} color="primary" variant="outlined" />
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                  Idiomas
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profileDataMauro.languages.map((lang, index) => (
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
                  {profileDataMauro.experience.map((exp, index) => (
                    <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs="auto">
                          <Avatar sx={{ bgcolor: 'action.selected' }}>{exp.icon || <WorkIcon />}</Avatar>
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
                  {profileDataMauro.education.map((edu, index) => (
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

            {/* --- SECCIÓN DE CURSOS AÑADIDA --- */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                  Cursos y Certificaciones
                </Typography>
                <List dense>
                  {profileDataMauro.certifications.map((cert, index) => (
                    <ListItem 
                        key={index} 
                        button 
                        component={cert.link ? "a" : "div"} // Es un link si 'cert.link' existe
                        href={cert.link || undefined} 
                        target={cert.link ? "_blank" : undefined}
                        rel={cert.link ? "noopener noreferrer" : undefined}
                    >
                        <ListItemIcon>
                            <VerifiedUserIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText 
                            primary={cert.name} 
                            secondary={cert.issuer} 
                        />
                    </ListItem>
                  ))}
                </List>
              </Box>

            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

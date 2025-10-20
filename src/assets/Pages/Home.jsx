import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Paper
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MemoryIcon from '@mui/icons-material/Memory';
import CodeIcon from '@mui/icons-material/Code';
import PetsIcon from '@mui/icons-material/Pets';

function Home() {
  return (
    <Box>
      {/* 1. Sección Principal ("Hero Section") */}
      <Paper elevation={0} sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            component="h1"
            variant="h2"
            fontWeight="bold"
            gutterBottom
          >
            Portafolio Digital: Grupo 2
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 4, maxWidth: '750px', mx: 'auto' }}>
            Explora nuestros proyectos en una Single Page Application construida con React, que ofrece una experiencia de usuario fluida, diseño moderno y navegación sin interrupciones.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              // Este botón podría llevar a la primera sección de proyectos en el futuro
              onClick={() => {
                const projectsSection = document.getElementById('proyectos-destacados');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Explorar Proyectos
            </Button>
            <Button
              component={Link}
              to="/aboutus"
              variant="outlined"
              size="large"
              sx={{
                color: 'secondary.main',
                borderColor: 'secondary.main',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                  color: 'secondary.contrastText',
                  borderColor: 'secondary.main',
                }
              }}
            >
              Conocer al Equipo
            </Button>
          </Stack>
        </Container>
      </Paper>

      {/* 2. Sección "Arquitectura Inteligente" */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
              <MemoryIcon sx={{ fontSize: 60, color: 'primary.main' }} />
            </Grid>
            <Grid item xs={12} md={10}>
              <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                Integración Eficiente de Proyectos
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Para mostrar nuestros proyectos estáticos (HTML/CSS) sin reescribirlos, desarrollamos un componente contenedor en React que los carga dinámicamente dentro de un `&lt;iframe&gt;`, leyendo la ruta para mostrar el trabajo correcto. Es una solución pragmática que demuestra nuestra capacidad para resolver problemas de integración.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 3. Sección "Proyectos Destacados" */}
      <Box id="proyectos-destacados" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'action.hover' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" fontWeight="bold" gutterBottom sx={{ mb: 6 }}>
            Nuestros Trabajos Destacados
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {/* Tarjeta 1 */}
            <Grid item xs={12} sm={6} md={5}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'scale(1.03)', boxShadow: 6 } }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 200, // Un fondo suave para el placeholder
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CodeIcon sx={{ fontSize: 60, color: 'grey.500' }} />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">Proyecto de E-commerce</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Una réplica de una tienda de componentes de PC, maquetada con HTML y CSS puro.
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label="HTML5" size="small" />
                    <Chip label="CSS3" size="small" />
                  </Stack>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button component={Link} to="/Proyecto01_Cussi" size="small" variant="contained">Ver Demo</Button>
                </Box>
              </Card>
            </Grid>
            {/* Tarjeta 2 */}
            <Grid item xs={12} sm={6} md={5}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'scale(1.03)', boxShadow: 6 } }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 200, // Mismo fondo suave
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <PetsIcon sx={{ fontSize: 60, color: 'grey.500' }} />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">Registro de Mascotas</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Aplicación interactiva construida con React para gestionar un registro de mascotas.
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label="React" color="primary" size="small" />
                    <Chip label="Material-UI" size="small" />
                  </Stack>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button component={Link} to="/pet-registry" size="small" variant="contained">Ver Demo</Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 4. Sección "Micro-Presentación del Grupo 2" */}
      <Box sx={{ py: { xs: 6, md: 10 }, textAlign: 'center', bgcolor: 'background.paper' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
            Somos el Grupo 2
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Un equipo de estudiantes apasionados por transformar ideas en soluciones web funcionales. La colaboración es nuestro motor.
          </Typography>
          <Button component={Link} to="/aboutus" variant="contained" size="large">
            Conoce a los Integrantes
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
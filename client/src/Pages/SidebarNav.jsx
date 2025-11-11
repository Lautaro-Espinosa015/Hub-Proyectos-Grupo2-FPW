// Importa React y el hook useState para manejar el estado de los menús desplegables.
import React, { useState } from 'react';
// Importa NavLink para la navegación, que añade estilos a los enlaces activos.
import { NavLink } from 'react-router-dom';
// Importa componentes de Material-UI para construir la interfaz de la barra de navegación.
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
// Importa los iconos que se usarán en la barra de navegación.
import { Home, Folder, Code, CodeSharp, Pets, People, SportsEsports, ArrowDropDown, Add, Login, Logout, Explore, Build, RecordVoiceOver } from '@mui/icons-material';

// Importa el hook personalizado para acceder al contexto de autorización (estado de login, datos del usuario, etc.).
import { useAutorizacion } from '../Contexts/AutorizacionContext';


// 1. Estructura de datos para los elementos de navegación generales.
// Centralizar esto en un array de objetos hace que la barra de navegación sea fácil de mantener y modificar.
const navItems = [
  { text: 'Inicio', icon: <Home />, to: '/' },
  
  { text: 'Sobre Nosotros', icon: <People />, to: '/aboutus' },

 // P1royecto 01
  { text: "Proyecto 01", icon: <Code /> , 
    subItems: [
      { text: 'Proyecto HTML : Espinosa Lautaro Eduardo', to: '/Proyecto01_Espinosa' },
      { text: 'Proyecto HTML : Cussi Walter Leonel', to: '/Proyecto01_Cussi' },
      { text: 'Proyecto HTML : Morales Pappalardo Mauro Francisco', to: '/Proyecto01_Morales' },
      { text: 'Proyecto HTML : Estrada Luis Brian Gabriel', to: '/Proyecto01_Estrada' },
      { text: 'Proyecto HTML : Silva Melani Isabel', to: '/Proyecto01_Silva' },
    ],
  },   



  { text: 'Proyecto 2', icon: <CodeSharp />, to: '/proyecto2' },
  { text: 'Proyecto 3: Registro de Mascotas', icon: <Pets />, to: '/PetRegistry' },
  { text: 'Proyecto 4', icon: <SportsEsports />, to: '/proyecto4' },





  {
    text: 'Proyecto 5',
    icon: <Folder />,
    subItems: [
      { text: 'Juego Estrella', to: '/games' },
      { text: 'Formulario', to: '/formulario' },
    ],
  },
  
  {
    text: 'Más Proyectos',
    icon: <Add />,
    subItems: [
      { text: 'Próximamente...', to: '#', disabled: true },
    ],
  },
];

// 2. Configuración de los menús específicos para estudiantes, organizados por nivel.
// Esto permite mostrar un menú diferente según el nivel del estudiante logueado.
const studentNavConfig = {
  1: {
    text: 'Zona Explorador',
    icon: <Explore />,
    subItems: [{ text: 'Juegos de Nivel 1', to: '/student-zone/1' }],
  },
  2: {
    text: 'Zona Constructor',
    icon: <Build />,
    subItems: [{ text: 'Juegos de Nivel 2', to: '/student-zone/2' }],
  },
  3: {
    text: 'Zona Conversador',
    icon: <RecordVoiceOver />,
    subItems: [{ text: 'Juegos de Nivel 3', to: '/student-zone/3' }],
  },
};

// 3. Configuración del menú especial para administradores, que les da acceso a todos los niveles de inglés.
const adminEnglishMenu = {
  text: 'English Levels',
  icon: <Explore />,
  subItems: [
    { text: 'Nivel 1 - Explorador', icon: <Explore />, to: '/student-zone/1' },
    { text: 'Nivel 2 - Constructor', icon: <Build />, to: '/student-zone/2' },
    { text: 'Nivel 3 - Conversador', icon: <RecordVoiceOver />, to: '/student-zone/3' },
  ],
};

// Componente principal de la barra de navegación.
function SidebarNav({ onLoginClick }) {
  // Obtiene el estado de autenticación y los datos del usuario del contexto.
  const { isLoggedIn, currentUser, isAdmin } = useAutorizacion();
  // Estado para gestionar qué menú desplegable está abierto y dónde debe anclarse.
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuText, setOpenMenuText] = useState('');
  
  // Logs de depuración para verificar el estado de autenticación en la consola del navegador.
  console.log('Estado de autenticación:', {
    isLoggedIn,
    currentUser,
    isAdmin: isAdmin(),
    rol: currentUser?.rol
  });

  // Función para abrir un menú desplegable.
  const handleMenuClick = (event, item) => {
    // 'event.currentTarget' es el elemento del DOM que se clickeó (el botón), que sirve como ancla para el menú.
    setAnchorEl(event.currentTarget);
    // Guarda el texto del item para saber qué menú está abierto.
    setOpenMenuText(item.text);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenuText('');
  };

  // Filtra los items de navegación generales. Solo muestra los que no tienen la propiedad 'auth'
  // o si el usuario ha iniciado sesión. (Actualmente no se usa la propiedad 'auth', pero es una buena práctica tenerlo).
  const visibleNavItems = navItems.filter(item => !item.auth || isLoggedIn);

  return (
    // Contenedor principal de la barra de navegación.
    <Box
      component="nav"
      sx={{
        width: '100%', // Ocupa todo el ancho
        borderBottom: '1px solid', // Borde inferior en lugar de derecho
        borderColor: 'divider', // Usa el color de borde del tema
        overflowX: 'auto', // Permite scroll horizontal si no caben los elementos
        whiteSpace: 'nowrap', // Evita que los elementos salten de línea
      }}
    >
      <List sx={{ display: 'flex', flexDirection: 'row', p: 0 }}>
        {/* --- MENÚ DE ESTUDIANTE --- */}
        {/* Se renderiza solo si el usuario está logueado, es un 'student' y tiene un nivel asignado (> 0). */}
        {isLoggedIn && currentUser?.rol === 'student' && currentUser?.nivel > 0 && (
          (() => {
            // Obtiene la configuración del menú correspondiente al nivel del estudiante.
            const studentNavItem = studentNavConfig[currentUser.nivel];
            if (!studentNavItem) return null;

            // Obtener la ruta directa del primer (y único) sub-item
            const directLink = studentNavItem.subItems[0].to;

            return (
              <ListItem key={studentNavItem.text} disablePadding>
                <ListItemButton
                  component={NavLink} // Usar NavLink para la navegación directa
                  to={directLink} // Enlazar directamente a la página de juegos del nivel
                  sx={{
                    py: 1,
                    px: 2,
                    flexDirection: 'column',
                    minWidth: '140px',
                    textAlign: 'center',
                    bgcolor: 'primary.dark',
                    color: 'primary.contrastText',
                    '&.active': { // Estilo para cuando la ruta está activa
                      bgcolor: 'action.selected',
                      color: 'primary.main',
                      '& .MuiListItemIcon-root': { color: 'primary.main' }
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'center', color: 'inherit' }}>
                    {studentNavItem.icon}
                  </ListItemIcon>
                  <ListItemText primary={studentNavItem.text} primaryTypographyProps={{ variant: 'caption', noWrap: true, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                </ListItemButton>
              </ListItem>
            );
          })()
        )}

        {/* Separador visual si el menú de estudiante está presente. */}
        {isLoggedIn && currentUser?.rol === 'student' && currentUser?.nivel > 0 && (
          <Box sx={{ borderLeft: '1px solid', borderColor: 'divider', mx: 1 }} />
        )}

        {/* --- MENÚ DE ADMINISTRADOR --- */}
        {console.log('Evaluando condición admin:', { isLoggedIn, isAdmin: isAdmin() })}
        {/* Se renderiza solo si el usuario está logueado y la función isAdmin() devuelve true. */}
        {isLoggedIn && isAdmin() && (
          <>
            <ListItem disablePadding>
              <ListItemButton
                onClick={(e) => handleMenuClick(e, adminEnglishMenu)}
                sx={{
                  py: 1,
                  px: 2,
                  flexDirection: 'column',
                  minWidth: '160px',
                  textAlign: 'center',
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { 
                    bgcolor: 'primary.dark',
                    transform: 'scale(1.02)',
                    transition: 'all 0.2s'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'center', color: 'inherit' }}>
                  {adminEnglishMenu.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      {adminEnglishMenu.text}
                      <ArrowDropDown sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle' }} />
                    </>
                  }
                  primaryTypographyProps={{ 
                    variant: 'button', 
                    noWrap: true, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}
                />
              </ListItemButton>
              <Menu
                anchorEl={anchorEl}
                open={openMenuText === adminEnglishMenu.text}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    width: '250px'
                  }
                }}
              >
                {adminEnglishMenu.subItems.map((subItem) => (
                  <MenuItem 
                    key={subItem.text} 
                    component={NavLink} 
                    to={subItem.to} 
                    onClick={handleMenuClose}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      py: 1
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <ListItemIcon sx={{ minWidth: 'auto', mr: 1, color: 'primary.main' }}>
                        {subItem.icon}
                      </ListItemIcon>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {subItem.text}
                      </Typography>
                    </Box>
                    {subItem.description && (
                      <Typography variant="caption" color="text.secondary" sx={{ pl: 4 }}>
                        {subItem.description}
                      </Typography>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </ListItem>
            <Box sx={{ borderLeft: '1px solid', borderColor: 'divider', mx: 1 }} />
          </>
        )}

        {/* --- MENÚS GENERALES --- */}
        {/* Itera sobre los items de navegación generales y los renderiza. */}
        {visibleNavItems.map((item) => {
          // Si el item tiene un array 'subItems', se renderiza como un menú desplegable.
          if (item.subItems) {
            // Comprueba si este es el menú que está actualmente abierto.
            const isOpen = openMenuText === item.text;
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={(e) => handleMenuClick(e, item)}
                  sx={{ py: 1, px: 2, flexDirection: 'column', minWidth: '120px', textAlign: 'center', bgcolor: isOpen ? 'action.selected' : 'transparent', color: isOpen ? 'primary.main' : 'inherit' }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'center', color: isOpen ? 'primary.main' : 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  {/* El texto del botón incluye una flecha para indicar que es un menú. */}
                  <ListItemText
                    primary={
                      <>
                        {item.text}
                        <ArrowDropDown sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle' }} />
                      </>
                    }
                    primaryTypographyProps={{ variant: 'caption', noWrap: true, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  />
                </ListItemButton>
                <Menu
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={handleMenuClose}
                >
                  {item.subItems.map((subItem) => (
                    <MenuItem key={subItem.text} component={NavLink} to={subItem.to} onClick={handleMenuClose} disabled={subItem.disabled}>
                      {subItem.text}
                    </MenuItem>
                  ))}
                </Menu>
              </ListItem>
            );
          }

          // Si no tiene 'subItems', se renderiza como un enlace de navegación simple.
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.to}
                end={item.to === '/'}
                sx={{ py: 1, px: 2, flexDirection: 'column', minWidth: '120px', textAlign: 'center', '&.active': { bgcolor: 'action.selected', color: 'primary.main', '& .MuiListItemIcon-root': { color: 'primary.main' } } }}
                // La clase '.active' es añadida automáticamente por NavLink y se usa para aplicar estilos al enlace de la página actual.
            >
              <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'center' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'caption', noWrap: true }} />
            </ListItemButton>
          </ListItem>
          );
        })}


        {/* Separador visual antes del botón de login/logout. */}
        <Box sx={{ borderLeft: '1px solid', borderColor: 'divider', mx: 1 }} />

        {/* --- BOTÓN DE LOGIN/LOGOUT --- */}
        {/* Renderizado condicional: muestra un botón u otro dependiendo del estado de 'isLoggedIn'. */}
        {isLoggedIn ? (
          <ListItem disablePadding>
            <ListItemButton onClick={onLoginClick} sx={{ py: 1, px: 2, flexDirection: 'column', minWidth: '120px', textAlign: 'center' }}>
              <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'center' }}>
                <Logout />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="caption" noWrap>{`Salir (${currentUser.username})`}</Typography>
                    <Typography variant="caption" noWrap sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                      Puntaje: {currentUser?.puntaje || 0}
                    </Typography>
                  </Box>
                } 
              />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={onLoginClick} sx={{ py: 1, px: 2, flexDirection: 'column', minWidth: '120px', textAlign: 'center' }}>
              <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'center' }}>
                <Login />
              </ListItemIcon>
              <ListItemText primary="Iniciar Sesión" primaryTypographyProps={{ variant: 'caption', noWrap: true }} />
            </ListItemButton>
          </ListItem>
        )}

      </List>
    </Box>
  );
}

export default SidebarNav;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { Home, Folder, Code, CodeSharp, Pets, People, SportsEsports, ArrowDropDown, Add, Login, Logout, Explore, Build, RecordVoiceOver } from '@mui/icons-material';

import { useAutorizacion } from '../Contexts/AutorizacionContext';


// 1. Estructura de datos limpia y sin duplicados
const navItems = [
  { text: 'Inicio', icon: <Home />, to: '/' },
  
  { text: 'Sobre Nosotros', icon: <People />, to: '/aboutus' },

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

// Definimos la estructura del menú para los estudiantes
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

function SidebarNav({ onLoginClick, isLoggedIn, currentUser }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuText, setOpenMenuText] = useState('');

  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setOpenMenuText(item.text);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenuText('');
  };

  // Filtramos los items de navegación. Mostramos solo los que no requieren autenticación
  // o si el usuario ha iniciado sesión.
  const visibleNavItems = navItems.filter(item => !item.auth || isLoggedIn);

  return (
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
        {/* Renderizado condicional del menú de estudiante */}
        {isLoggedIn && currentUser?.rol === 'student' && currentUser?.nivel > 0 && (
          (() => {
            const studentNavItem = studentNavConfig[currentUser.nivel];
            if (!studentNavItem) return null;

            const isOpen = openMenuText === studentNavItem.text;
            return (
              <ListItem key={studentNavItem.text} disablePadding>
                <ListItemButton
                  onClick={(e) => handleMenuClick(e, studentNavItem)}
                  sx={{ py: 1, px: 2, flexDirection: 'column', minWidth: '140px', textAlign: 'center', bgcolor: 'primary.dark', color: 'primary.contrastText' }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'center', color: 'inherit' }}>
                    {studentNavItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        {studentNavItem.text}
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
                  {studentNavItem.subItems.map((subItem) => (
                    <MenuItem key={subItem.text} component={NavLink} to={subItem.to} onClick={handleMenuClose} disabled={subItem.disabled}>
                      {subItem.text}
                    </MenuItem>
                  ))}
                </Menu>
              </ListItem>
            );
          })()
        )}

        {/* Separador visual si el menú de estudiante está presente */}
        {isLoggedIn && currentUser?.rol === 'student' && currentUser?.nivel > 0 && (
          <Box sx={{ borderLeft: '1px solid', borderColor: 'divider', mx: 1 }} />
        )}

        {/* 2. Bucle de renderizado único y corregido */}
        {visibleNavItems.map((item) => {
          // Renderiza un menú desplegable si el item tiene 'subItems'
          if (item.subItems) {
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
                  {/* 3. Corrección del ListItemText para incluir el icono de flecha */}
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

          // Renderiza un enlace normal si no hay 'subItems'
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.to}
                end={item.to === '/'}
                sx={{ py: 1, px: 2, flexDirection: 'column', minWidth: '120px', textAlign: 'center', '&.active': { bgcolor: 'action.selected', color: 'primary.main', '& .MuiListItemIcon-root': { color: 'primary.main' } } }}
            >
              <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'center' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'caption', noWrap: true }} />
            </ListItemButton>
          </ListItem>
          );
        })}


        {/* Separador visual antes del botón de login/logout */}
        <Box sx={{ borderLeft: '1px solid', borderColor: 'divider', mx: 1 }} />

        {/* 4. Botón dinámico de Login/Logout */}
        {isLoggedIn ? (
          <ListItem disablePadding>
            <ListItemButton onClick={onLoginClick} sx={{ py: 1, px: 2, flexDirection: 'column', minWidth: '120px', textAlign: 'center' }}>
              <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'center' }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary={`Salir (${currentUser.username})`} primaryTypographyProps={{ variant: 'caption', noWrap: true }} />
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
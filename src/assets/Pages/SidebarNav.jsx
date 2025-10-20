import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { Home, Folder, Code, CodeSharp, Pets, People, SportsEsports, ArrowDropDown, Add } from '@mui/icons-material';

// 1. Estructura de datos limpia y sin duplicados
const navItems = [
  { text: 'Inicio', icon: <Home />, to: '/' },
  
  { text: 'Sobre Nosotros', icon: <People />, to: '/aboutus' },

  { text: "Proyecto 01", icon: <Code /> , 
    subItems: [
      { text: 'Proyecto HTML : Espinosa Lautaro Eduardo', to: '/Proyecto01_Espinosa' },
      { text: 'Proyecto HTML : Cussi Walter Leonel', to: '/Proyecto01_Cussi' },
      { text: 'Proyecto HTML : Morales Pappalardo Mauro Francisco', to: '/Proyecto01_Morales' },
      { text: 'Proyecto HTML : Estrada Brian Alexis', to: '/Proyecto01_Estrada' },
      { text: 'Proyecto HTML : Silva Melani Isabel', to: '/Proyecto01_Silva' },
    ],
  },   



  { text: 'Proyecto 2', icon: <CodeSharp />, to: '/proyecto2' },
  { text: 'Proyecto 3: Registro de Mascotas', icon: <Pets />, to: '/pet-registry' },
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

function SidebarNav() {
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

  return (
    <Box
      sx={{
        width: '100%', // Ocupa todo el ancho
        bgcolor: 'background.paper',
        borderBottom: '1px solid', // Borde inferior en lugar de derecho
        borderColor: 'divider', // Usa el color de borde del tema
        overflowX: 'auto', // Permite scroll horizontal si no caben los elementos
        whiteSpace: 'nowrap', // Evita que los elementos salten de línea
      }}
    >
      <List sx={{ display: 'flex', flexDirection: 'row', p: 0 }}>
        {/* 2. Bucle de renderizado único y corregido */}
        {navItems.map((item) => {
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
      </List>
    </Box>
  );
}

export default SidebarNav;
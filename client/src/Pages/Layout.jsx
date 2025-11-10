import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import SidebarNav from './SidebarNav';
import { createTheme, ThemeProvider, CssBaseline, Drawer, Box, Typography, Button } from '@mui/material';
import Login from './Login';
import Registrar from '../components/Registrar'; // Importamos el componente Registrar
import { useAutorizacion } from '../Contexts/AutorizacionContext'; // Importamos el hook de autorización

// Creamos un tema oscuro para Material-UI que coincida con nuestros estilos CSS
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#66c0f4', // --link-color
    },
    background: {
      paper: '#212832', // --sidebar-bg
    },
  },  
});

function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authView, setAuthView] = useState('login'); // 'login' o 'register'
  const { isLoggedIn, currentUser, logout } = useAutorizacion();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setTimeout(() => setAuthView('login'), 300); // Resetea la vista a login al cerrar
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Normaliza estilos y aplica fondo oscuro al body */}
      <div className="main-content">
        <SidebarNav onLoginClick={handleDrawerOpen} />
        <main className="page-content"><Outlet /></main>
      </div>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ width: 350, p: 2 }}>
          {isLoggedIn ? (
            // Si el usuario ya inició sesión, siempre mostramos la vista de bienvenida/logout.
            <Login onClose={handleDrawerClose} />
          ) : authView === 'login' ? (
            <>
              <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>Acceso de Usuario</Typography>
              <Login onClose={handleDrawerClose} onSwitchToRegister={() => setAuthView('register')} />
            </>
          ) : (
            <>
              <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>Crear una Cuenta</Typography>
              <Registrar onClose={handleDrawerClose} onSwitchToLogin={() => setAuthView('login')} />
            </>
          )}
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}

export default Layout;
import { Outlet } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

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
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Normaliza estilos y aplica fondo oscuro al body */}
      <div className="main-content">
        <SidebarNav />
        <main className="page-content"><Outlet /></main>
      </div>
    </ThemeProvider>
  );
}

export default Layout;
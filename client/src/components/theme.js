import { createTheme } from '@mui/material/styles';

// Crea una instancia del tema.
const theme = createTheme({
  palette: {
    primary: {
      main: '#4900c8ff', // Un azul claro, similar al de Steam
    },
    secondary: {
      main: '#002047ff', // Un azul oscuro, para fondos o elementos secundarios
    },
  },
});

export default theme;

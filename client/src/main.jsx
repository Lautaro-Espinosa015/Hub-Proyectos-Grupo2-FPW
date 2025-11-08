import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AutorizacionProvider } from "./Contexts/AutorizacionContext";

// Importaciones de MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './components/theme';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AutorizacionProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
      </ThemeProvider>
    </BrowserRouter>
    </AutorizacionProvider>
  </StrictMode>
);

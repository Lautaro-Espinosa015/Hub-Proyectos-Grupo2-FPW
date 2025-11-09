import { Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ProyectoHtml1 from './assets/Pages/ProyectoHtml1.jsx';
import Games from './Pages/Games';
import AboutUs from './Pages/AboutUs';
import Error from './Pages/Error';
import Proyecto2 from './Pages/Proyecto2';
import PetRegistry from './Pages/PetRegistry.jsx';
import Proyecto01 from './Pages/Proyecto01';
import Proyecto4 from './Pages/Proyecto4';
import Formulario from './components/Proyecto5/formulario.jsx';
import JuegoMemoria from './Pages/JuegoMemoria.jsx';
import Login from './Pages/Login.jsx';
import ArrastraLaImagen from './components/EnglishGames/Nivel 1/ArrastraLaImagen.jsx'
import StudentZone from './Pages/StudentZone.jsx'; // Importamos la nueva página
import AdivinaDia from './components/EnglishGames/Nivel 1/AdivinaDia.jsx';
import BodyClickGame from './components/EnglishGames/Nivel 1/BodyClickGame.jsx';
import JuegoVerbosD from './components/EnglishGames/Nivel 2/JuegoVerbosD.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='games' element={<Games />} />
        <Route path='aboutus' element={<AboutUs />} /> 
        <Route path='Proyecto01_Espinosa' element={<Proyecto01 />} />
        <Route path='Proyecto01_Cussi' element={<Proyecto01 />} />
        <Route path='Proyecto01_Estrada' element={<Proyecto01 />} />
        <Route path='Proyecto01_Silva' element={<Proyecto01 />} />
        <Route path='Proyecto01_Morales' element={<Proyecto01 />} />
        <Route path='proyecto2' element={<Proyecto2 />} />
        <Route path='petRegistry' element={<PetRegistry />} />
        <Route path='proyecto4' element={<Proyecto4 />} />
        <Route path='juegomemoria' element={<JuegoMemoria />} />
        <Route path='ArrastraLaImagen' element={<ArrastraLaImagen />} />
        <Route path='formulario' element={<Formulario />} />
        <Route path='student-zone/:level' element={<StudentZone />} /> {/* Añadimos la ruta dinámica */}
     <Route path='JuegoVerbosD' element={<JuegoVerbosD />} />
     <Route path='AdivinaDia' element={<AdivinaDia />} />
     <Route path='BodyClickGame' element={<BodyClickGame />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
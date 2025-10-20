import { Routes, Route } from 'react-router-dom';
import Layout from './assets/Pages/Layout';
import Home from './assets/Pages/Home';
//import ProyectoHtml1 from './assets/Pages/ProyectoHtml1.jsx';
import Games from './assets/Pages/Games';
import AboutUs from './assets/Pages/AboutUs';
import Error from './assets/Pages/Error';
import Proyecto2 from './assets/Pages/Proyecto2';
import PetRegistry from './assets/RegistroMascotas/PetRegistry';
import Proyecto01 from './assets/Pages/Proyecto01';
import Proyecto4 from './assets/Pages/Proyecto4';
import Formulario from './assets/components/formulario.jsx';

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
        <Route path='pet-registry' element={<PetRegistry />} />
        <Route path='proyecto4' element={<Proyecto4 />} />
        <Route path='formulario' element={<Formulario />} />
        <Route path='*' element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
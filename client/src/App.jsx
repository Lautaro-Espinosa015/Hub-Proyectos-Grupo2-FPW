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

import Login from './Pages/Login.jsx';
import ArrastraLaImagen from './components/EnglishGames/Nivel 1/ArrastraLaImagen.jsx'
import StudentZone from './Pages/StudentZone.jsx'; // Importamos la nueva página
import AdivinaDia from './components/EnglishGames/Nivel 1/AdivinaDia.jsx';
import BodyClickGame from './components/EnglishGames/Nivel 2/BodyClickGame.jsx'
import JuegoVerbosD from './components/EnglishGames/Nivel 2/JuegoVerbosD.jsx';
import JuegoMemoria from './components/EnglishGames/Nivel 1/JuegoMemoria.jsx';
import YesNo from './components/EnglishGames/Nivel 1/YesNo.jsx';
import ConversacionJuego from './components/EnglishGames/Nivel 1/ConversacionJuego.jsx';

import QuizSimulator from './components/EnglishGames/Nivel 1/QuizSimulator.jsx';
import AdvancedQuizSimulator from './components/EnglishGames/Nivel 3/AdvancedQuizSimulator.jsx';
import ConversationalSimulator from './components/EnglishGames/Nivel 3/ConversationalSimulator.jsx';



import BrianEstradaProfile from './components/Grupo02-Profiles/BrianEstradaProfile.jsx';
import MauroMoralesProfile from './components/Grupo02-Profiles/MauroMoralesProfile.jsx';
import WalterCussiProfile from './components/Grupo02-Profiles/WalterCussiProfile.jsx';
import LautaroEspinosaProfile from './components/Grupo02-Profiles/LautaroEspinosaProfile.jsx';
import MelaniSilvaProfile from './components/Grupo02-Profiles/MelaniSilvaProfile.jsx';


//rUTAS PREDETERMINADAS 
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
        <Route path='QuizSimulator' element={<QuizSimulator />} />
        <Route path='AdvancedQuizSimulator' element={<AdvancedQuizSimulator />} />
        <Route path='ConversationalSimulator' element={<ConversationalSimulator />} />
        <Route path='YesNo' element={<YesNo />} />
        <Route path='ConversacionJuego' element={<ConversacionJuego />} />


        <Route path='BrianEstradaProfile' element={<BrianEstradaProfile />} />
     <Route path='MauroMoralesProfile' element={<MauroMoralesProfile />} />
     <Route path='WalterCussiProfile' element={<WalterCussiProfile />} />
     <Route path='LautaroEspinosaProfile' element={<LautaroEspinosaProfile />} />
     <Route path='MelaniSilvaProfile' element={<MelaniSilvaProfile />} />


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
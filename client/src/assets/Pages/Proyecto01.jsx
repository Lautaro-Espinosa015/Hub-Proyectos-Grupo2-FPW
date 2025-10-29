import { useLocation } from 'react-router-dom';
import '../Css/P1_style-Cussi.css'; // Usamos un estilo genérico para el contenedor
import rutaProyecto1Cussi from '../components/P1_index-Cussi.html?url'; // Asumiendo que este archivo existe
import rutaProyecto1Estrada from '../components/P1_index-Estrada.html?url';
import rutaProyecto1Espinosa from '../components/P1_index-Espinosa.html?url';
import rutaProyecto1Silva from '../components/P1_index-Silva.html?url';
import rutaProyecto1Morales from '../components/P1_index-Morales.html?url';
import "../components/P1_Desafio.html?url"; // Asegura que el archivo HTML se procese

/**
 * Al importar el archivo HTML directamente desde 'src', el empaquetador (Vite)
 * se encarga de incluirlo en la compilación final y nos proporciona la ruta correcta.
 * Esto también funciona para los assets (imágenes, css) referenciados de forma
 * relativa dentro de ese HTML.
 */

export default function Proyecto01() {
  const location = useLocation();

  // Mapeo de rutas a los archivos HTML y títulos correspondientes
  const proyectos = {
    '/Proyecto01_Cussi': {
      src: rutaProyecto1Cussi,
      title: 'Proyecto 1 - Cussi',
    },
    '/Proyecto01_Estrada': {
      src: rutaProyecto1Estrada,
      title: 'Proyecto 1 - Estrada',
    },
    '/Proyecto01_Espinosa': {
      src: rutaProyecto1Espinosa,
      title: 'Proyecto 1 - Espinosa',
    },
    '/Proyecto01_Silva': {
      src: rutaProyecto1Silva,
      title: 'Proyecto 1 - Silva',
    },
    '/Proyecto01_Morales': {
      src: rutaProyecto1Morales,
      title: 'Proyecto 1 - Morales',
    },
  };

  // Obtenemos el proyecto actual basándonos en la ruta, o usamos uno por defecto si no coincide
  const proyectoActual = proyectos[location.pathname] || proyectos['/Proyecto01_Cussi'];

  return (
    <div className="proyecto1-container">
      {/*
        Usamos calc() para que el iframe ocupe el espacio vertical restante.
        100vh es la altura total de la pantalla.
        Restamos 150px como una aproximación de la altura de la cabecera y la barra de navegación.
        Ajustamos a 120px para un mejor encaje.
      */}
      <div className="iframe-container" style={{ height: 'calc(100vh - 120px)' }}>
        <iframe
          src={proyectoActual.src}
          title={proyectoActual.title}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
    </div>
  );
}

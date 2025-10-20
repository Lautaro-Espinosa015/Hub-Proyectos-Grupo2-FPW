import { useState } from 'react';
import '../Css/Proyecto2.css'; // Importamos los nuevos estilos

const ejercicios = [
  { nombre: 'Ejercicio 1', ruta: '/Proyecto02/Ejercicio1/ejercicio1.html' },
  { nombre: 'Ejercicio 2', ruta: '/Proyecto02/Ejercicio2/ejercicio2.html' },
  { nombre: 'Ejercicio 3', ruta: '/Proyecto02/Ejercicio3/ejercicio3.html' },
  { nombre: 'Ejercicio 4', ruta: '/Proyecto02/Ejercicio4/ejercicio4.html' },
  { nombre: 'Ejercicio 5', ruta: '/Proyecto02/Ejercicio5/ejercicio5.html' },
];

export default function Proyecto2() {
  const [activo, setActivo] = useState(ejercicios[0].ruta);

  return (
    <div className="proyecto2-container">
      <h2>Proyecto02 - Ejercicios</h2>
      <div className="ejercicios-nav">
        {ejercicios.map((ej, idx) => (
          <button
            key={idx}
            onClick={() => setActivo(ej.ruta)}
            className={`ejercicio-tab ${activo === ej.ruta ? 'active' : ''}`}
          >
            {ej.nombre}
          </button>
        ))}
      </div>
      <div className="iframe-container">
        <iframe src={activo} title="Ejercicio Viewer" />
      </div>
    </div>
  );
}

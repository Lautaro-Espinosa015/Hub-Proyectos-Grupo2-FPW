import React from 'react';
import '../Css/saludo.css';

// Se ajusta la semántica HTML para ser más correcta sin cambiar la apariencia.
// Usar múltiples encabezados (h1, h2, h3...) para texto normal no es una buena práctica.
function Saludo({ saludo, compartimos, primero, segundo, tercero }) {
  return (
    <div className="saludo-container">
      <h1>{saludo}</h1>
      <p>{compartimos}</p>
      <p>{primero}</p>
      <p>{segundo}</p>
      <p>{tercero}</p>
    </div>
  );
}

export default Saludo;

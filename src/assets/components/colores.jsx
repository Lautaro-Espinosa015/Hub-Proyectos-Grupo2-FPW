import React, { useState, useEffect } from 'react';
import '../Css/colores.css'; // Asegúrate de crear este archivo

// Mover la constante fuera del componente es una buena práctica para el rendimiento.
const PALETA_COLORES = [
  "#005b98ff", // Azul
  "#00fe6aff", // Verde
  "#7a0000ff", // Rojo
  "#c58700ff", // Naranja
  "#9b59b6", // Morado
  "#006d04ff", // Verde oscuro
  "#34495e", // Asfalto
  "#ff0000ff", // Rojo brillante
  "#f35532ff",  // Zanahoria
];

function Colores() {
  const [coloresDeBotones, setColoresDeBotones] = useState(PALETA_COLORES.slice(0, 4));
  const [haGanado, setHaGanado] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [maxColoresIguales, setMaxColoresIguales] = useState(0);
  const [victoriasDeTres, setVictoriasDeTres] = useState(0);

  // Función para verificar la victoria y devolver el número máximo de colores iguales
  const verificarVictoria = (nuevosColores) => {
    const conteo = {};
    let maxCount = 0;
    // Contar la frecuencia de cada color
    for (const color of nuevosColores) {
      conteo[color] = (conteo[color] || 0) + 1;
    }

    // Mostrar el recuento en la consola
    console.log('Recuento de colores:', conteo);

    // Encontrar la máxima frecuencia
    for (const color in conteo) {
      if (conteo[color] > maxCount) {
        maxCount = conteo[color];
      }
    }

    return maxCount;
  };

  // Genera una nueva combinación de colores
  const generarNuevosColores = () => {
    // Selecciona 4 colores al azar del array, permitiendo repeticiones.
    const nuevosColores = Array.from({ length: 4 }, () => 
      PALETA_COLORES[Math.floor(Math.random() * PALETA_COLORES.length)]
    );

    setColoresDeBotones(nuevosColores);
    return nuevosColores;
  };

  const cambiarColores = () => {
    // Solo incrementa si el juego está activo
    if (!haGanado) {
      setIntentos(prevIntentos => {
        const nuevoIntento = prevIntentos + 1;
        console.log(`Intento número: ${nuevoIntento}`);
        return nuevoIntento;
      });
    }
    const nuevosColores = generarNuevosColores();
    const maxCount = verificarVictoria(nuevosColores);

    // Verificar si se ha ganado
    if (maxCount >= 3) {
      setHaGanado(true);
      setMaxColoresIguales(maxCount);
      if (maxCount === 3) {
        setVictoriasDeTres(prev => prev + 1);
      }
    }
  };
  
  const reiniciarJuego = () => {
    setHaGanado(false);
    setMaxColoresIguales(0);
    setVictoriasDeTres(0);
    setIntentos(0);
    generarNuevosColores();
  };

  const seguirIntentando = () => {
    setHaGanado(false); // Permite que el próximo giro cuente como un intento
    cambiarColores();   // Realiza el siguiente giro
  };

  // useEffect para el código de trampa (presionar '4')
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Si el evento se origina en un input, no activar los atajos.
      if (event.target.tagName.toLowerCase() === 'input') {
        return;
      }

      if (event.key === '4') {
        console.log("¡Código de trampa activado! 4 colores iguales.");
        // Elige un color al azar de la paleta
        const colorGanador = PALETA_COLORES[Math.floor(Math.random() * PALETA_COLORES.length)];
        // Crea un array con 4 colores idénticos
        const nuevosColores = [colorGanador, colorGanador, colorGanador, colorGanador];
        
        // Actualiza los estados para reflejar la victoria
        setColoresDeBotones(nuevosColores);
        setHaGanado(true);
        setMaxColoresIguales(4);
      } else if (event.key === '3') {
        console.log("¡Código de trampa activado! 3 colores iguales.");
        
        // 1. Elige dos colores diferentes de la paleta
        let colorPrincipal = PALETA_COLORES[Math.floor(Math.random() * PALETA_COLORES.length)];
        let colorSecundario;
        do {
          colorSecundario = PALETA_COLORES[Math.floor(Math.random() * PALETA_COLORES.length)];
        } while (colorPrincipal === colorSecundario);

        // 2. Crea un array con 3 colores iguales y uno diferente, y lo baraja
        let nuevosColores = [colorPrincipal, colorPrincipal, colorPrincipal, colorSecundario];
        for (let i = nuevosColores.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [nuevosColores[i], nuevosColores[j]] = [nuevosColores[j], nuevosColores[i]];
        }

        // 3. Actualiza los estados para reflejar la victoria de 3
        setColoresDeBotones(nuevosColores);
        setHaGanado(true);
        setMaxColoresIguales(3);
        setVictoriasDeTres(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Función de limpieza para remover el event listener
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez

  return (
    <div className="colores-container">
      <h2>¡Alinea 3 colores iguales!</h2>
      <p>Intentos: {intentos}</p>
      {victoriasDeTres > 0 && (
        <p>Rachas de 3 colores: {victoriasDeTres}</p>
      )}
      <div className="botones-colores-container">
        {coloresDeBotones.map((color, index) => (
          <button
            key={index}
            className="color-box"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {haGanado ? (
        <div>
          {maxColoresIguales >= 4 ? (
            <div className="resultado-final">
              <h3>¡INCREÍBLE! ¡4 colores iguales en {intentos} intentos! ¡Mucha suerte!</h3>
              <button onClick={reiniciarJuego} className="cambiar-colores-btn">
                Jugar de Nuevo
              </button>
            </div>
          ) : (
            <div className="resultado-parcial">
              <h3>¡Felicidades, 3 colores iguales en {intentos} intentos!</h3>
              <div className="botones-resultado">
                <button onClick={seguirIntentando} className="cambiar-colores-btn">
                  Seguir Intentando (por los 4)
                </button>
                <button onClick={reiniciarJuego} className="cambiar-colores-btn danger-btn">
                  Reiniciar Juego
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button onClick={cambiarColores} className="cambiar-colores-btn">
          Girar Colores
        </button>
      )}
    </div>
  );
}

export default Colores;
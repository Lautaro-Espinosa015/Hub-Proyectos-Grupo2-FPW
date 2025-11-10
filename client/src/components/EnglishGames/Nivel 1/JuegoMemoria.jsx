import React, { useState, useEffect } from "react";

// Importación de imágenes para el juego
import rojo from "../../../assets/Img/Img_P1-Estrada/rojo.jpg";
import llave from "../../../assets/Img/Img_P1-Estrada/llave.png";
import gatito from "../../../assets/Img/Img_P1-Estrada/gatito.png";
import amarillo from "../../../assets/Img/Img_P1-Estrada/amarillo.png";
import peluche from "../../../assets/Img/Img_P1-Estrada/peluche.jpg";
import perrito from "../../../assets/Img/Img_P1-Estrada/perrito.jpg";
import characterAvatar from '../../../assets/Img/ImgEnglishGames/ConversationalSimulator/character_avatar.png';

// Lista base de imágenes únicas
const imagenes = [
  { id: 1, src: rojo },
  { id: 2, src: llave },
  { id: 3, src: gatito },
  { id: 4, src: amarillo },
  { id: 5, src: peluche },
  { id: 6, src: perrito }
];

// Función para duplicar y mezclar las cartas
const mezclarCartas = () => {
  const duplicadas = [...imagenes, ...imagenes]; // 6 imágenes × 2 = 12 cartas
  return duplicadas.sort(() => Math.random() - 0.5);
};

function JuegoMemoria() {
  // Estados principales del juego
  const [cartas, setCartas] = useState(mezclarCartas()); // Cartas mezcladas
  const [seleccionadas, setSeleccionadas] = useState([]); // Índices seleccionados
  const [acertadas, setAcertadas] = useState([]); // IDs acertados
  const [puntuacion, setPuntuacion] = useState(0); // Puntuación acumulada
  const [aciertosTotales, setAciertosTotales] = useState(0); // Total de aciertos en la partida actual

  // Cargar puntuación guardada desde localStorage al iniciar
  useEffect(() => {
    const puntuacionGuardada = localStorage.getItem("puntuacionMemoria");
    if (puntuacionGuardada) {
      setPuntuacion(parseInt(puntuacionGuardada));
    }
  }, []);

  // Verificar si hay dos cartas seleccionadas y si son iguales
  useEffect(() => {
    if (seleccionadas.length === 2) {
      const [i1, i2] = seleccionadas;
      if (cartas[i1].id === cartas[i2].id) {
        setAcertadas((prev) => [...prev, cartas[i1].id]);

        const nuevosAciertos = aciertosTotales + 1;
        setAciertosTotales(nuevosAciertos);

        // Cada 5 aciertos, sumar 1 punto
        if (nuevosAciertos % 5 === 0) {
          const nuevaPuntuacion = puntuacion + 1;
          setPuntuacion(nuevaPuntuacion);
          localStorage.setItem("puntuacionMemoria", nuevaPuntuacion);
        }
      }

      // Limpiar selección después de 1 segundo
      setTimeout(() => setSeleccionadas([]), 1000);
    }
  }, [seleccionadas, cartas]);

  // Manejar clic en carta
  const manejarClick = (index) => {
    if (seleccionadas.length === 2 || seleccionadas.includes(index)) return;
    setSeleccionadas([...seleccionadas, index]);
  };

  // Reiniciar partida y puntuación acumulada
  const reiniciarJuego = () => {
    setCartas(mezclarCartas());
    setSeleccionadas([]);
    setAcertadas([]);
    setAciertosTotales(0);
    setPuntuacion(0);
    localStorage.removeItem("puntuacionMemoria");
  };

  return (
    <div style={{ backgroundColor: '#e3f2fd', borderRadius: '15px', padding: '2rem', marginTop: '2rem', textAlign: 'center' }}>
      {/* Título del juego */}
      <h2 style={{ color: '#1A237E' }}>Juego de Memoria: busca a RED, KEY, KITTEN, PUPPY, YELLOW y TEDDY</h2>

      {/* Mostrar puntuación acumulada */}
      <div style={{ marginBottom: '1rem', color: '#1A237E', fontWeight: 'bold' }}>
        Puntuación general: {puntuacion}
      </div>

      {/* Botón para reiniciar la partida */}
      <button
        onClick={reiniciarJuego}
        style={{
          backgroundColor: '#90CAF9',
          color: '#1A237E',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          marginBottom: '1.5rem',
          cursor: 'pointer'
        }}
      >
        Reiniciar
      </button>

      {/* Contenedor de cartas en grilla fija 3x4 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', // 4 columnas
          gridTemplateRows: 'repeat(3, 1fr)',    // 3 filas
          gap: '15px',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '700px',
          margin: '0 auto'
        }}
      >
        {cartas.map((carta, index) => {
          const mostrar = seleccionadas.includes(index) || acertadas.includes(carta.id);
          return (
            <div
              key={`${carta.id}-${index}`}
              onClick={() => manejarClick(index)}
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                border: '2px solid #BBDEFB',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <img
                src={mostrar ? carta.src : characterAvatar}
                alt="carta de memoria"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Mensaje de victoria al completar todas las parejas */}
      {acertadas.length === imagenes.length && (
        <div style={{
          marginTop: '2rem',
          backgroundColor: '#d1ecf1',
          color: '#0c5460',
          padding: '1rem',
          borderRadius: '8px'
        }}>
          ¡Felicitaciones! Encontraste todas las parejas 🥳
        </div>
      )}
    </div>
  );
}

export default JuegoMemoria;
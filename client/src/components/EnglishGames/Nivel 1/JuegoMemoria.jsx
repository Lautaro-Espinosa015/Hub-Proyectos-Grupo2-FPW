import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Necesario para la navegación a "/juegomemoria-nivel2"
import { useAutorizacion } from "../../../Contexts/AutorizacionContext";

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
  { id: 1, src: rojo, nombre: 'RED' },
  { id: 2, src: llave, nombre: 'KEY' },
  { id: 3, src: gatito, nombre: 'KITTEN' },
  { id: 4, src: amarillo, nombre: 'YELLOW' },
  { id: 5, src: peluche, nombre: 'TEDDY' }, // Corregido a TEDDY para coincidir con el título
  { id: 6, src: perrito, nombre: 'PUPPY' }
];

// Función para duplicar y mezclar las cartas
const mezclarCartas = () => {
  const duplicadas = [...imagenes, ...imagenes]; // 6 imágenes × 2 = 12 cartas
  // Usar una clave única para cada carta en el array final
  return duplicadas
    .map((carta, index) => ({ ...carta, keyIndex: index })) 
    .sort(() => Math.random() - 0.5);
};

function JuegoMemoria() {
  const { currentUser, updateScore, isLoggedIn } = useAutorizacion();
  // Estados principales del juego
  const [cartas, setCartas] = useState(mezclarCartas());
  const [seleccionadas, setSeleccionadas] = useState([]); // Índices seleccionados
  const [acertadas, setAcertadas] = useState([]); // IDs (1-6) acertados
  const [puntoGanadoEnPartida, setPuntoGanadoEnPartida] = useState(false); // Bandera para evitar doble suma

  // Condición de victoria: 6 IDs acertados (hay 6 imágenes únicas)
  const haGanado = acertadas.length === imagenes.length;

  // 2. Lógica para verificar si dos cartas seleccionadas son iguales
  useEffect(() => {
    if (seleccionadas.length === 2) {
      const [i1, i2] = seleccionadas;
      
      // Si las IDs de las cartas coinciden, son un par
      if (cartas[i1].id === cartas[i2].id) {
        // Añadir el ID al array de acertados
        setAcertadas((prev) => [...prev, cartas[i1].id]);
      }

      // Limpiar selección después de 1 segundo (sea acierto o fallo)
      setTimeout(() => setSeleccionadas([]), 1000);
    }
  }, [seleccionadas, cartas]);


  // 3. LÓGICA CLAVE: Asignar 1 punto AL GANAR la partida
  useEffect( () => {
    const gestionarPunto = async () => {
      // Si la partida ha terminado Y el punto aún no ha sido sumado
      if (haGanado && !puntoGanadoEnPartida) {
          await updateScore(10); // Otorgar 10 puntos al ganar
          // Marcar el punto como ganado para evitar sumas duplicadas en futuros renders
          setPuntoGanadoEnPartida(true);
      }
    }
    gestionarPunto();
  }, [haGanado, puntoGanadoEnPartida, updateScore]); // Se ejecuta cuando haGanado cambia

  // Manejar clic en carta
  const manejarClick = (index) => {
    // Reglas de bloqueo: Si ya hay 2 seleccionadas, si la carta ya fue acertada, o si ya ganó
    if (seleccionadas.length === 2 || acertadas.includes(cartas[index].id) || seleccionadas.includes(index) || haGanado) {
        return;
    }
    setSeleccionadas([...seleccionadas, index]);
  };

  // 4. Reiniciar la PARTIDA ACTUAL (Mantiene la Puntuación General)
  const reiniciarPartidaActual = () => {
    setCartas(mezclarCartas());
    setSeleccionadas([]);
    setAcertadas([]);
    setPuntoGanadoEnPartida(false); // Habilitar la bandera para poder ganar un punto en la nueva partida
  };

  return (
    <div style={{ backgroundColor: '#e3f2fd', borderRadius: '15px', padding: '2rem', marginTop: '2rem', textAlign: 'center' }}>
      
      {/* Título y Puntuación */}
      <h2 style={{ color: '#1A237E' }}>Juego de Memoria: busca a RED, KEY, KITTEN, PUPPY, YELLOW y TEDDY</h2>
      {isLoggedIn && (
        <div style={{ marginBottom: '1rem', color: '#1A237E', fontWeight: 'bold' }}>
          Puntuación general: {currentUser?.puntaje || 0}
        </div>
      )}

      {/* Contenedor de cartas en grilla fija 3x4 */}
      <div
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', 
          gap: '15px', justifyContent: 'center', maxWidth: '700px', margin: '0 auto'
        }}
      >
        {cartas.map((carta, index) => {
          // Determinar si la carta debe mostrarse (está seleccionada o ya ha sido acertada)
          const mostrar = seleccionadas.includes(index) || acertadas.includes(carta.id);
          return (
            <div
              key={carta.keyIndex} // Usamos la keyIndex única
              onClick={() => manejarClick(index)}
              style={{
                width: '100%', aspectRatio: '1 / 1', border: '2px solid #BBDEFB',
                borderRadius: '8px', overflow: 'hidden', cursor: 'pointer'
              }}
            >
              <img
                src={mostrar ? carta.src : characterAvatar}
                alt={`carta de memoria ${carta.nombre || ''}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          );
        })}
      </div>
      
      {/* 6. BLOQUE CONDICIONAL PARA LOS BOTONES DE FIN DE JUEGO */}
      {haGanado && (
        <div style={{ marginTop: '2rem' }}>
            
          {/* Mensaje de victoria */}
          <div style={{
            backgroundColor: '#d1ecf1', color: '#0c5460', padding: '1rem', 
            borderRadius: '8px', marginBottom: '15px', fontWeight: 'bold'
          }}>
            ¡Felicitaciones! Encontraste todas las parejas 🥳
          </div>
          
          {/* Contenedor de botones */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
            }}
          >
           

            {/* ** BOTÓN CLAVE: Siguiente Juego ** */}
            {/* Aparece SOLO si la Puntuación General es >= 1 */}
            {currentUser?.puntaje >= 20 && ( 
              <Link to="/QuizSimulator" style={{ textDecoration: 'none' }}> 
                <button
                  style={{
                    backgroundColor: "#007bff", color: "white", border: "none",
                    padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontWeight: 'bold'
                  }}
                >
                  Siguiente Juego
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default JuegoMemoria;
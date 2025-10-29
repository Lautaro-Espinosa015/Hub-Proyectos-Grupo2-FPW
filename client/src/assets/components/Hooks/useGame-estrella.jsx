import { useState, useEffect, useRef, useCallback } from 'react';
// Función auxiliar para obtener un número aleatorio entre dos valores
const aleatorioEntre = (min, max) => Math.random() * (max - min) + min;

export default function useGame() {
  // Estado del puntaje del jugador
  const [puntaje, setPuntaje] = useState(0);
  // Posición de la estrella en la pantalla (valores en %)
  const [posicionEstrella, setPosicionEstrella] = useState({ x: 50, y: 50 });
  // Controla si la estrella está visible
  const [visible, setVisible] = useState(false);
   // Indica si el juego está activo
  const [juegoActivo, setJuegoActivo] = useState(true);
  // Mensaje que se muestra al ganar
  const [mensaje, setMensaje] = useState('');
  // Referencias para manejar los timers sin perderlos entre renders
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  // Calcula una nueva posición aleatoria para la estrella
  const posicionAlAzar = useCallback(() => {
    const y = aleatorioEntre(10, 90);
    const x = aleatorioEntre(10, 90);
    setPosicionEstrella({ x, y });
  }, []);
  // Muestra la estrella en una nueva posición y la oculta después de 1.4 segundos
  const mostrarEstrella = useCallback(() => {
    posicionAlAzar();
    setVisible(true);

    // limpiar timeout anterior si existe
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Oculta la estrella después de un tiempo
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 1400);
  }, [posicionAlAzar]);
  // Efecto que inicia el intervalo para mostrar estrellas cada 1.8 segundos
  useEffect(() => {
    if (!juegoActivo) return;

    intervalRef.current = setInterval(() => {
      mostrarEstrella();
    }, 1800);
    // Limpieza del intervalo al desmontar o cambiar estado
    return () => clearInterval(intervalRef.current);
  }, [juegoActivo, mostrarEstrella]);
  // Función que se llama al hacer clic en la estrella
  const agarrarEstrella = () => {
    setPuntaje((p) => p + 1);
    setVisible(false);
  };
  // Efecto que detecta si se alcanzó el puntaje para ganar
  useEffect(() => {
    if (puntaje >= 10) {
      setJuegoActivo(false);
      setMensaje('🌟 ¡Ganaste! 🌟');
      // limpiar timers
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [puntaje]);
  // Reinicia el juego a su estado inicial
  const reiniciarJuego = () => {
    setPuntaje(0);
    setMensaje('');
    setJuegoActivo(true);
    setVisible(false);
  };

  // Limpieza final al desmontar el hook
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  // Retorna los valores y funciones necesarias para el componente
  return {
    puntaje,
    posicionEstrella,
    visible,
    juegoActivo,
    mensaje,
    agarrarEstrella,
    reiniciarJuego,
  };
} 

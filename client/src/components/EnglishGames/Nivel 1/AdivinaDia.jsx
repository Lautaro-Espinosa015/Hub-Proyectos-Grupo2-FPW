import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAutorizacion } from '../../../Contexts/AutorizacionContext';

// Lista Maestra de Días
const masterList = [
  { es: 'Lunes', en: 'Monday' },
  { es: 'Martes', en: 'Tuesday' },
  { es: 'Miércoles', en: 'Wednesday' },
  { es: 'Jueves', en: 'Thursday' },
  { es: 'Viernes', en: 'Friday' },
  { es: 'Sábado', en: 'Saturday' },
  { es: 'Domingo', en: 'Sunday' },
];

function AdivinaDiaSimple() {
  const { currentUser, updateScore, isLoggedIn } = useAutorizacion();
  // Estados principales del juego
  const [preguntaDia, setPreguntaDia] = useState(null); // Día a adivinar
  const [opciones, setOpciones] = useState([]); // Opciones en inglés
  const [haGanado, setHaGanado] = useState(false); // Estado de acierto
  const [mensajeFeedback, setMensajeFeedback] = useState(null); // Mensaje de respuesta
  const [aciertosConsecutivos, setAciertosConsecutivos] = useState(0); // Racha de aciertos

  // Función Central: Inicia o Reinicia el Juego
  const generarJuego = () => {
    setHaGanado(false);
    setMensajeFeedback(null);

    const listaBarajada = [...masterList].sort(() => 0.5 - Math.random());
    const opcionesJuego = listaBarajada.slice(0, 3);
    setOpciones(opcionesJuego);

    const indiceCorrecto = Math.floor(Math.random() * 3);
    const respuestaCorrecta = opcionesJuego[indiceCorrecto];
    setPreguntaDia(respuestaCorrecta);
  };

  useEffect(() => {
    generarJuego();
  }, []);

  // Función para revisar la respuesta del usuario
  const RevisarRespuesta = async (selectedEnglishName) => {
    if (haGanado) return;

    if (selectedEnglishName === preguntaDia.en) {
      setHaGanado(true);
      setMensajeFeedback('¡Correcto! 🎉');

      const nuevosAciertos = aciertosConsecutivos + 1;
      setAciertosConsecutivos(nuevosAciertos);

      // Cada 5 aciertos consecutivos, sumar 10 puntos
      if (nuevosAciertos % 5 === 0) {
        const puntosGanados = 10;
        await updateScore(puntosGanados); // Usamos la función del contexto
      }
    } else {
      setMensajeFeedback('Incorrecto. Intenta de nuevo.');
    }
  };

  // Mostrar mensaje de carga si aún no hay pregunta
  if (!preguntaDia) {
    return <p>Cargando...</p>;
  }

  return (
    <Container className="mt-4" style={{ backgroundColor: '#e3f2fd', padding: '2rem', borderRadius: '15px' }}>
      <Card style={{ width: '30rem', margin: 'auto', border: '2px solid #BBDEFB' }}>
        <Card.Body>
          {/* Título del juego */}
          <Card.Title className="text-center">
            <h2 style={{ color: '#1A237E' }}>¿Cuál es el día en Inglés?</h2>
          </Card.Title>

          {/* Puntuación general */}
          {isLoggedIn && (
            <Card.Text className="text-center text-muted">
              <span style={{ color: '#424242' }}>Puntuación general: {currentUser?.puntaje || 0}</span>
            </Card.Text>
          )}

          {/* Día en español */}
          <div className="p-4 rounded text-center my-3" style={{ backgroundColor: '#F5F5F5' }}>
            <h1 className="display-4 fw-bold" style={{ color: '#1A237E' }}>{preguntaDia.es}</h1>
          </div>

          {/* Opciones en inglés */}
          <Row className="g-2">
            {opciones.map((opcion) => (
              <Col xs={12} key={opcion.en}>
                <Button
                  variant="light"
                  size="lg"
                  className="w-100"
                  onClick={() => RevisarRespuesta(opcion.en)}
                  disabled={haGanado}
                  style={
                    haGanado && opcion.en === preguntaDia.en
                      ? {
                          backgroundColor: '#c8e6c9', // Verde pastel si es correcta
                          color: '#1A237E',
                          borderColor: '#a5d6a7',
                        }
                      : {
                          color: '#1A237E',
                          borderColor: '#BBDEFB',
                        }
                  }
                >
                  {opcion.en}
                </Button>
              </Col>
            ))}
          </Row>

          {/* Feedback de respuesta */}
          {mensajeFeedback && (
            <Alert
              variant={haGanado ? 'success' : 'danger'}
              className="mt-3 text-center"
              style={{
                backgroundColor: haGanado ? '#c8e6c9' : undefined,
                color: '#1A237E',
                borderColor: haGanado ? '#a5d6a7' : undefined
              }}
            >
              <h3>{mensajeFeedback}</h3>
            </Alert>
          )}

          {/* Botón para jugar de nuevo */}
          {haGanado && (
            <div className="d-grid gap-2 mt-3">
              <Button
                size="lg"
                onClick={generarJuego}
                style={{
                  backgroundColor: '#90CAF9',
                  borderColor: '#90CAF9',
                  color: '#1A237E'
                }}
              >
                Jugar de Nuevo
              </Button>
              {currentUser?.puntaje >= 10 && (
                <Link to="/juegomemoria">
                  <Button
                    size="lg"
                    style={{
                      backgroundColor: '#4CAF50',
                      borderColor: '#4CAF50',
                      color: 'white',
                      width: '100%'
                    }}
                  >
                    Siguiente Juego
                  </Button>
                </Link>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdivinaDiaSimple;
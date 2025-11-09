import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Row, Col, Container } from 'react-bootstrap';

// 📋 Lista Maestra de Días
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
  const [preguntaDia, setPreguntaDia] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [haGanado, setHaGanado] = useState(false);
  const [mensajeFeedback, setMensajeFeedback] = useState(null);
  const [puntuacion, setPuntuacion] = useState(0);
  const [aciertosConsecutivos, setAciertosConsecutivos] = useState(0);

  // 🔄 Función Central: Inicia o Reinicia el Juego
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
    const puntuacionGuardada = localStorage.getItem('puntuacionGeneral');
    if (puntuacionGuardada) {
      setPuntuacion(parseInt(puntuacionGuardada));
    }
  }, []);

  // 📝 Función para Revisar la Respuesta del Usuario
  const RevisarRespuesta = (selectedEnglishName) => {
    if (haGanado) return;

    if (selectedEnglishName === preguntaDia.en) {
      setHaGanado(true);
      setMensajeFeedback('¡Correcto! 🎉');

      const nuevosAciertos = aciertosConsecutivos + 1;
      setAciertosConsecutivos(nuevosAciertos);

      if (nuevosAciertos % 5 === 0) {
        const nuevaPuntuacion = puntuacion + 1;
        setPuntuacion(nuevaPuntuacion);
        localStorage.setItem('puntuacionGeneral', nuevaPuntuacion);
      }
    } else {
      setMensajeFeedback('Incorrecto. Intenta de nuevo. ');
    }
  };

  if (!preguntaDia) {
    return <p>Cargando...</p>;
  }

  return (
    <Container className="mt-4">
      <Card style={{ width: '30rem', margin: 'auto' }}>
        <Card.Body>
          <Card.Title className="text-center">
            <h2>¿Cuál es el día en Inglés?</h2>
          </Card.Title>

          {/* Puntuación general */}
          <Card.Text className="text-center text-muted">
            Puntuación general: {puntuacion}
          </Card.Text>

          {/* Día en español */}
          <div className="bg-light p-4 rounded text-center my-3">
            <h1 className="display-4 fw-bold">{preguntaDia.es}</h1>
          </div>

          {/* Opciones en inglés */}
          <Row className="g-2">
            {opciones.map((opcion) => (
              <Col xs={12} key={opcion.en}>
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="w-100"
                  onClick={() => RevisarRespuesta(opcion.en)}
                  disabled={haGanado}
                  style={
                    haGanado && opcion.en === preguntaDia.en
                      ? {
                          backgroundColor: '#28a745',
                          color: 'white',
                          borderColor: '#28a745',
                        }
                      : {}
                  }
                >
                  {opcion.en}
                </Button>
              </Col>
            ))}
          </Row>

          {/* Feedback */}
          {mensajeFeedback && (
            <Alert
              variant={haGanado ? 'success' : 'danger'}
              className="mt-3 text-center"
            >
              <h3>{mensajeFeedback}</h3>
            </Alert>
          )}

          {/* Botón de jugar de nuevo */}
          {haGanado && (
            <div className="d-grid gap-2 mt-3">
              <Button size="lg" onClick={generarJuego} variant="success">
                Jugar de Nuevo
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdivinaDiaSimple;
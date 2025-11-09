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


  // 🔄 Función Central: Inicia o Reinicia el Juego
  const generarJuego = () => {
    setHaGanado(false); 
    setMensajeFeedback(null); 

    // 1. Barajar la lista para seleccionar opciones aleatorias.
    const listaBarajada = [...masterList].sort(() => 0.5 - Math.random());

    // 2. Tomar los primeros 3 días como opciones.
    const opcionesJuego = listaBarajada.slice(0, 3);
    setOpciones(opcionesJuego); 

    // 3. Elegir uno de esos 3 al azar para ser la pregunta (la respuesta correcta).
    const indiceCorrecto = Math.floor(Math.random() * 3);
    const respuestaCorrecta = opcionesJuego[indiceCorrecto];
    
    // Guardamos el objeto completo (ej: {es: 'Lunes', en: 'Monday'})
    setPreguntaDia(respuestaCorrecta); 
  };

  
  useEffect(() => {
    // Inicia el juego la primera vez que se carga el componente
    generarJuego();
  }, []);

  // 📝 Función para Revisar la Respuesta del Usuario
  const RevisarRespuesta = (selectedEnglishName) => {
    if (haGanado) return; // No hacer nada si ya ganó

    if (selectedEnglishName === preguntaDia.en) {
      // ✅ Respuesta Correcta
      setHaGanado(true); 
      setMensajeFeedback('¡Correcto! 🎉');
    } else {
      // ❌ Respuesta Incorrecta
      setMensajeFeedback('Incorrecto. Intenta de nuevo. 🤔'); 
    }
  };

  // Muestra "Cargando..." mientras se inicializa el estado
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

          {/* 1. LA PREGUNTA (Muestra el día en español) */}
          <div className="bg-light p-4 rounded text-center my-3">
            <h1 className="display-4 fw-bold">{preguntaDia.es}</h1>
          </div>

          {/* 2. LOS BOTONES DE OPCIÓN (Muestra los días en inglés) */}
          <Row className="g-2">
            {opciones.map((opcion) => (
              <Col xs={12} key={opcion.en}>
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="w-100"
                  onClick={() => RevisarRespuesta(opcion.en)}
                  // Deshabilita los botones solo si ya ganó
                  disabled={haGanado} 
                  style={haGanado && opcion.en === preguntaDia.en ? { backgroundColor: '#28a745', color: 'white', borderColor: '#28a745' } : {}}
                >
                  {opcion.en}
                </Button>
              </Col>
            ))}
          </Row>

          {/* 3. EL FEEDBACK (Muestra Correcto o Incorrecto) */}
          {mensajeFeedback && (
            <Alert 
              variant={haGanado ? "success" : "danger"} 
              className="mt-3 text-center"
            >
              <h3>{mensajeFeedback}</h3>
            </Alert>
          )}

          {/* 4. BOTÓN DE JUGAR DE NUEVO (Solo si ha ganado) */}
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
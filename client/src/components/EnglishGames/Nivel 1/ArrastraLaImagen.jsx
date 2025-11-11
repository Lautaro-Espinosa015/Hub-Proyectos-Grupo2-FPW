import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Necesitas importar Link
import { useAutorizacion } from '../../../Contexts/AutorizacionContext';
import imgManzana from '../../../assets/Img/ImgEnglishGames/ImgArrastraLaImagen/manzana.png';
import imgPerro from '../../../assets/Img/ImgEnglishGames/ImgArrastraLaImagen/perro.png';
import imgAuto from '../../../assets/Img/ImgEnglishGames/ImgArrastraLaImagen/auto.png';
import imgcomida from '../../../assets/Img/ImgEnglishGames/ImgArrastraLaImagen/imgcomida.png';
import imggato from '../../../assets/Img/ImgEnglishGames/ImgArrastraLaImagen/imggato.png';
import imghelicoptero from '../../../assets/Img/ImgEnglishGames/ImgArrastraLaImagen/imghelicopter.png';
import imgnuez from '../../../assets/Img/ImgEnglishGames/ImgArrastraLaImagen/imgnuez.png';
import imgpescado from '../../../assets/Img/ImgEnglishGames/ImgArrastraLaImagen/imgpescao.png';
import imgrobot from '../../../assets/Img/ImgEnglishGames/ImgArrastraLaImagen/imgrobot.png';
import audioApple from '../../../assets/Sounds/SoundsArrastraLaImagen/apple.mp3';
import audioDog from '../../../assets/Sounds/SoundsArrastraLaImagen/dog.mp3';
import audioCar from '../../../assets/Sounds/SoundsArrastraLaImagen/car.mp3';
import audionuez from '../../../assets/Sounds/SoundsArrastraLaImagen/audionuez.mp3';
import audiorobot from '../../../assets/Sounds/SoundsArrastraLaImagen/audiorobot.mp3';
import audiopescado from '../../../assets/Sounds/SoundsArrastraLaImagen/audiopescao.mp3';
import audiohelicoptero from '../../../assets/Sounds/SoundsArrastraLaImagen/audiohelicopter.mp3';
import audiogato from '../../../assets/Sounds/SoundsArrastraLaImagen/audiogato.mp3';
import audiocomida from '../../../assets/Sounds/SoundsArrastraLaImagen/audiocomida.mp3';

import { Box, Grid, Typography, Card, CardContent, Button } from '@mui/material';

// Objetos del juego
const objetos = [
  { id: 'manzana', etiqueta: 'Apple', audio: audioApple, imagen: imgManzana },
  { id: 'perro', etiqueta: 'Dog', audio: audioDog, imagen: imgPerro },
  { id: 'auto', etiqueta: 'Car', audio: audioCar, imagen: imgAuto },
  { id: 'helicoptero', etiqueta: 'Helicopter', audio: audiohelicoptero, imagen: imghelicoptero },
  { id: 'gato', etiqueta: 'Cat', audio: audiogato, imagen: imggato },
  { id: 'nuez', etiqueta: 'Nut', audio: audionuez, imagen: imgnuez },
  { id: 'robot', etiqueta: 'Robot', audio: audiorobot, imagen: imgrobot },
  { id: 'comida', etiqueta: 'Food', audio: audiocomida, imagen: imgcomida },
  { id: 'pescado', etiqueta: 'Fish', audio: audiopescado, imagen: imgpescado },
];

export default function ArrastraLaImagen() {
  const { currentUser, updateScore, isLoggedIn } = useAutorizacion();
  const [objetosColocados, setObjetosColocados] = useState({});
  const [objetosActivos, setObjetosActivos] = useState([]);
  const [aciertosTotales, setAciertosTotales] = useState(0);
  const referenciaAudio = useRef(null);

  useEffect(() => {
    seleccionarObjetosAleatorios();
  }, []);

  const seleccionarObjetosAleatorios = () => {
    const mezclados = [...objetos].sort(() => Math.random() - 0.5);
    setObjetosActivos(mezclados.slice(0, 3));
    setObjetosColocados({});
  };

  const iniciarArrastre = (evento, idObjeto) => {
    evento.dataTransfer.setData('text/plain', idObjeto);
  };

  const soltarObjeto = async (evento, idCasillero) => {
    evento.preventDefault();
    const idArrastrado = evento.dataTransfer.getData('text/plain');
    if (idArrastrado === idCasillero && !objetosColocados[idCasillero]) {
      setObjetosColocados((previo) => ({ ...previo, [idCasillero]: true }));

      const nuevosAciertos = aciertosTotales + 1;
      setAciertosTotales(nuevosAciertos);

      // Cada 5 aciertos, sumar 5 puntos
      if (nuevosAciertos > 0 && nuevosAciertos % 5 === 0) {
        await updateScore(5);
      }
    }
  };

  const permitirSoltar = (evento) => {
    evento.preventDefault();
  };

  const reproducirAudio = (ruta) => {
    if (referenciaAudio.current) {
      referenciaAudio.current.src = ruta;
      referenciaAudio.current.play();
    }
  };

  // NUEVA LÓGICA: Determinar si la ronda ha terminado
  const rondaCompletada = 
    Object.keys(objetosColocados).length === objetosActivos.length && 
    objetosActivos.length > 0;


  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', py: 4, bgcolor: '#e3f2fd', borderRadius: 2, p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="#1A237E">
        Relaciona el objeto con su nombre en Inglés
      </Typography>

      {/* Mostrar puntuación si el usuario está logueado */}
      {isLoggedIn && (
        <Typography variant="subtitle1" align="center" color="#424242" gutterBottom>
          Puntuación general: {currentUser?.puntaje || 0}
        </Typography>
      )}

      {/* El botón de 'Nueva ronda' se oculta si la ronda ya está completada */}
      {!rondaCompletada && (
        <Button 
          variant="contained" 
          onClick={seleccionarObjetosAleatorios} 
          sx={{ mb: 3, bgcolor: '#90CAF9', color: '#1A237E', '&:hover': { bgcolor: '#64B5F6' } }}
        >
          Nueva ronda
        </Button>
      )}

      <Grid container spacing={4}>
        {/* Objetos arrastrables */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" align="center" color="#424242" gutterBottom>
            Objetos
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
            {objetosActivos.map((objeto) => (
              <Card
                key={objeto.id}
                draggable={!objetosColocados[objeto.id] && !rondaCompletada} // Se puede arrastrar si no está colocado y la ronda no ha terminado
                onDragStart={(e) => iniciarArrastre(e, objeto.id)}
                onClick={() => reproducirAudio(objeto.audio)} // eslint-disable-line
                sx={{ 
                  width: 120, 
                  cursor: (objetosColocados[objeto.id] || rondaCompletada) ? 'default' : 'grab', // Cambio de cursor
                  textAlign: 'center', 
                  boxShadow: 2, 
                  bgcolor: 'white' 
                }}
              >
                <CardContent>
                  <img
                    src={objeto.imagen}
                    alt={objeto.etiqueta}
                    style={{ maxHeight: 60, marginBottom: 8 }}
                  />
                  <Typography fontWeight="medium">{objeto.etiqueta}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Casilleros de destino */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" align="center" color="#424242" gutterBottom>
            Casilleros
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
            {objetosActivos.map((objeto) => (
              <Box
                key={objeto.id}
                onDrop={(e) => soltarObjeto(e, objeto.id)}
                onDragOver={permitirSoltar}
                sx={{
                  width: 120,
                  height: 127,
                  borderRadius: 1,
                  border: '2px dashed #d1c4e9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  bgcolor: objetosColocados[objeto.id] ? '#c8e6c9' : '#fafafa',
                  color: objetosColocados[objeto.id] ? '#1A237E' : '#4A4A4A',
                }}
              >
                {objeto.etiqueta}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
      
      {/* LÓGICA DE PASE DE NIVEL - MUESTRA DESPUÉS DE COMPLETAR LA RONDA */}
      {rondaCompletada && (
          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
              <Typography variant="h5" align="center" color="#1A237E" fontWeight="bold">
                  ¡Ronda Completada! 🎉
              </Typography>

              {currentUser?.puntaje >= 5 ? (
                  // Opción 1: Desbloqueado el siguiente nivel
                  <Link to="/AdivinaDia" style={{ textDecoration: 'none', width: '100%', maxWidth: '300px' }}>
                      <Button
                          variant="contained"
                          size="large"
                          fullWidth
                          sx={{
                              bgcolor: '#4CAF50', // Verde para Siguiente Nivel
                              color: 'white',
                              '&:hover': { bgcolor: '#388E3C' }
                          }}
                      >
                          Siguiente Nivel 
                      </Button>
                  </Link>
              ) : (
                  // Opción 2: Necesita más puntos
                  <Typography variant="body1" color="textSecondary" align="center">
                      ¡Sigue jugando! Necesitas alcanzar una puntuación de 5 para desbloquear el siguiente nivel.
                  </Typography>
              )}
              
              {/* Botón para jugar la siguiente ronda (si la puntuación aún no permite pasar o para seguir acumulando puntos) */}
              <Button 
                  variant="contained" 
                  onClick={seleccionarObjetosAleatorios} 
                  size="large"
                  sx={{ width: '100%', maxWidth: '300px', bgcolor: '#90CAF9', color: '#1A237E', '&:hover': { bgcolor: '#64B5F6' } }}
              >
                  Jugar otra ronda
              </Button>
          </Box>
      )}

      {/* Audio oculto */}
      <audio ref={referenciaAudio} />
    </Box>
  );
}
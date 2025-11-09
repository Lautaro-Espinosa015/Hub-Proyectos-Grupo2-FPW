import { useState, useRef, useEffect } from 'react';
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
  const [objetosColocados, setObjetosColocados] = useState({});
  const [objetosActivos, setObjetosActivos] = useState([]);
  const [puntuacion, setPuntuacion] = useState(0);
  const [aciertosTotales, setAciertosTotales] = useState(0);
  const referenciaAudio = useRef(null);

  useEffect(() => {
    seleccionarObjetosAleatorios();
    const puntuacionGuardada = localStorage.getItem('puntuacionEmparejamiento');
    if (puntuacionGuardada) {
      setPuntuacion(parseInt(puntuacionGuardada));
    }
  }, []);

  const seleccionarObjetosAleatorios = () => {
    const mezclados = [...objetos].sort(() => Math.random() - 0.5);
    setObjetosActivos(mezclados.slice(0, 3));
    setObjetosColocados({});
  };

  const iniciarArrastre = (evento, idObjeto) => {
    evento.dataTransfer.setData('text/plain', idObjeto);
  };

  const soltarObjeto = (evento, idCasillero) => {
    evento.preventDefault();
    const idArrastrado = evento.dataTransfer.getData('text/plain');
    if (idArrastrado === idCasillero && !objetosColocados[idCasillero]) {
      setObjetosColocados((previo) => ({ ...previo, [idCasillero]: true }));

      const nuevosAciertos = aciertosTotales + 1;
      setAciertosTotales(nuevosAciertos);

      if (nuevosAciertos % 5 === 0) {
        const nuevaPuntuacion = puntuacion + 1;
        setPuntuacion(nuevaPuntuacion);
        localStorage.setItem('puntuacionEmparejamiento', nuevaPuntuacion);
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

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="primary">
        Relaciona el objeto con su nombre en Inglés
      </Typography>

      {/* Mostrar puntuación */}
      <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
        Puntuación general: {puntuacion}
      </Typography>

      <Button variant="contained" onClick={seleccionarObjetosAleatorios} sx={{ mb: 3 }}>
        Nueva ronda
      </Button>

      <Grid container spacing={4}>
        {/* Objetos arrastrables */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
            Objetos
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
            {objetosActivos.map((objeto) => (
              <Card
                key={objeto.id}
                draggable
                onDragStart={(e) => iniciarArrastre(e, objeto.id)}
                onClick={() => reproducirAudio(objeto.audio)}
                sx={{ width: 120, cursor: 'grab', textAlign: 'center', boxShadow: 2 }}
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
          <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
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
                  border: '1px solid #000000ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  bgcolor: objetosColocados[objeto.id] ? 'success.main' : 'grey.100',
                  color: objetosColocados[objeto.id] ? 'common.white' : '#000',
                }}
              >
                {objeto.etiqueta}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Audio oculto */}
      <audio ref={referenciaAudio} />
    </Box>
  );
}
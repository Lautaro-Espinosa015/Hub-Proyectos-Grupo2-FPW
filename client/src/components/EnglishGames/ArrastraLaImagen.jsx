import { useState, useRef } from 'react';
import imgManzana from '../../assets/Img/ImgEnglishGames/ImgArrastraLaImagen/manzana.png';
import imgPerro from '../../assets/Img/ImgEnglishGames/ImgArrastraLaImagen/perro.png';
import imgAuto from '../../assets/Img/ImgEnglishGames/ImgArrastraLaImagen/auto.png';
import audioApple from '../../assets/Sounds/SoundsArrastraLaImagen/apple.mp3';
import audioDog from '../../assets/Sounds/SoundsArrastraLaImagen/dog.mp3';
import audioCar from '../../assets/Sounds/SoundsArrastraLaImagen/car.mp3';

// MUI components
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';

// Objetos del juego
const objetos = [
  { id: 'manzana', etiqueta: 'Apple', audio: audioApple, imagen: imgManzana },
  { id: 'perro', etiqueta: 'Dog', audio: audioDog, imagen: imgPerro },
  { id: 'auto', etiqueta: 'Car', audio: audioCar, imagen: imgAuto },
];

export default function ArrastraLaImagen() {
  const [objetosColocados, setObjetosColocados] = useState({});
  const referenciaAudio = useRef(null);

  const iniciarArrastre = (evento, idObjeto) => {
    evento.dataTransfer.setData('text/plain', idObjeto);
  };

  const soltarObjeto = (evento, idCasillero) => {
    evento.preventDefault();
    const idArrastrado = evento.dataTransfer.getData('text/plain');
    if (idArrastrado === idCasillero) {
      setObjetosColocados((previo) => ({ ...previo, [idCasillero]: true }));
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

      <Grid container spacing={4}>
        {/* Objetos arrastrables */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
            Objetos
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
            {objetos.map((objeto) => (
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
            {objetos.map((objeto) => (
              <Box
                key={objeto.id}
                onDrop={(e) => soltarObjeto(e, objeto.id)}
                onDragOver={permitirSoltar}
                sx={{
                  width: 120,
                  height: 127,
                  borderRadius: 1,
                  border: '1px solid #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  bgcolor: objetosColocados[objeto.id] ? 'success.main' : 'grey.100',
                  color: objetosColocados[objeto.id] ? 'common.white' : 'text.primary',
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
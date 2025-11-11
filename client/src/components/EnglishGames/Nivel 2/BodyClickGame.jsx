import React, { useState, useRef } from "react";
import "../../../assets/Css/BodyClickGame.css";

// Importaciones para la pantalla de Fin de Juego
import { Container, Typography, Box, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAutorizacion } from "../../../Contexts/AutorizacionContext";
import ReplayIcon from '@mui/icons-material/Replay';

import headImg from "../../../assets/Img/ImgEnglishGames/BodyClickGame/head.png";
import eyeImg from "../../../assets/Img/ImgEnglishGames/BodyClickGame/eye.png";
import mouthImg from "../../../assets/Img/ImgEnglishGames/BodyClickGame/mouth.png";
import armImg from "../../../assets/Img/ImgEnglishGames/BodyClickGame/arm.png";
import handImg from "../../../assets/Img/ImgEnglishGames/BodyClickGame/hand.png";
import legImg from "../../../assets/Img/ImgEnglishGames/BodyClickGame/leg.png";
import footImg from "../../../assets/Img/ImgEnglishGames/BodyClickGame/foot.png";

export default function BodyDragGame() {
  const { currentUser, updateScore, isLoggedIn } = useAutorizacion();
  const [score, setScore] = useState(0);
  const [placedParts, setPlacedParts] = useState({});
  const referenciaAudio = useRef(null);

  const bodyParts = [
    { id: "body", etiquetaEs: "cuerpo", x: "50%", y: "60%", width: "100px", height: "100px" },
    { id: "eye", etiquetaEs: "Ojo", x: "50%", y: "45%", width: "70px", height: "60px" },
    { id: "mouth", etiquetaEs: "Boca", x: "50%", y: "53%", width: "70px", height: "50px" },
    { id: "arm", etiquetaEs: "Brazo", x: "40%", y: "60%", width: "100px", height: "100px" },
    { id: "hand", etiquetaEs: "Mano", x: "60%", y: "60%", width: "80px", height: "80px" },
    { id: "leg", etiquetaEs: "Pierna", x: "50%", y: "70%", width: "100px", height: "100px" },
    { id: "foot", etiquetaEs: "Pie", x: "50%", y: "85%", width: "70px", height: "80px" }
  ];

  const images = {
    body: headImg,
    eye: eyeImg,
    mouth: mouthImg,
    arm: armImg,
    hand: handImg,
    leg: legImg,
    foot: footImg
  };

  const iniciarArrastre = (evento, id) => {
    evento.dataTransfer.setData("text/plain", id);
  };

  const permitirSoltar = (evento) => {
    evento.preventDefault();
  };

  const soltarParte = async (evento, idCasillero) => {
    evento.preventDefault();
    const idArrastrado = evento.dataTransfer.getData("text/plain");
    if (idArrastrado === idCasillero && !placedParts[idCasillero]) {
      setPlacedParts((prev) => ({ ...prev, [idCasillero]: true }));
      setScore((prev) => prev + 1);
      await updateScore(15); // Otorgar 15 puntos por cada acierto
    }
  };
    
    // --- LÓGICA DE FIN DE JUEGO ---
    const handleRestart = () => {
        setScore(0);
        setPlacedParts({});
    };

    const totalParts = bodyParts.length;
    const isGameOver = score === totalParts;
    
    // --- PANTALLA DE FIN DE JUEGO ---
    if (isGameOver) {
        return (
          <Container maxWidth="sm" sx={{ py: 6, textAlign: 'center', bgcolor: '#e3f2fd', minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h3" color="#1A237E" fontWeight="bold" gutterBottom>
             ¡Nivel Completo! 🎉
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, color: '#424242' }}>
              Completaste todas las partes: **{score} de {totalParts}**
            </Typography>

            <Stack direction="column" spacing={2} justifyContent="center" sx={{ maxWidth: 300, mx: 'auto' }}>
                
              
                
                {/* Botón 2: CAMBIO DE NIVEL (Ruta de ejemplo) */}
                <Link to="/JuegoVerbosD" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        fullWidth
                    >
                        Siguiente Nivel
                    </Button>
                </Link>

            </Stack>
          </Container>
        );
    }
    // --- FIN PANTALLA DE FIN DE JUEGO ---


  return (
    <div className="game-container" style={{ backgroundColor: "#e3f2fd", minHeight: "100vh" }}>
      <h1 className="text-3xl font-bold mb-2" style={{ color: "#1A237E" }}>Body Drag Game</h1>
      <p className="text-xl mb-4" style={{ color: "#1A237E" }}>
        Arrastra cada parte del cuerpo a su posición correcta
      </p>
      {isLoggedIn && (
        <p className="text-lg mt-4" style={{ color: "#424242", fontWeight: 'bold' }}>
          Puntaje Total: {currentUser?.puntaje || 0}
        </p> 
      )}

      {/* Silueta con casilleros */}
      <div
        className="relative w-[350px] h-[500px] rounded-2xl shadow-xl overflow-hidden mb-6"
        style={{ backgroundColor: "#F5F5F5" }} 
      >
        {bodyParts.map((part) => (
          <div
            key={part.id}
            onDrop={(e) => soltarParte(e, part.id)}
            onDragOver={permitirSoltar}
            className="casillero"
            style={{
              left: part.x,
              top: part.y,
              width: part.width,
              height: part.height,
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: placedParts[part.id] ? "#c8e6c9" : "#BBDEFB", 
              border: `2px solid ${placedParts[part.id] ? "#a5d6a7" : "#BBDEFB"}`, 
              borderRadius: "12px"
            }}
          >
            {placedParts[part.id] && (
              <img
                src={images[part.id]}
                alt={part.id}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                draggable={false}
              />
            )}
            <p style={{ marginTop: "4px", fontSize: "14px", fontWeight: "bold", color: "#1A237E" }}> 
              {part.id.toUpperCase()}
            </p>
          </div>
        ))}
      </div>

      {/* Bandeja horizontal */}
      <div
        className="bandeja"
        style={{
          display: "flex",
          flexDirection: "row", 
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
          padding: "12px"
        }}
      >
        {bodyParts.map((part) =>
          !placedParts[part.id] ? (
            <div
              key={part.id}
              className="pieza"
              draggable
              onDragStart={(e) => iniciarArrastre(e, part.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#BBDEFB", 
                border: "2px solid #BBDEFB", 
                borderRadius: "8px",
                padding: "8px",
                width: "80px"
              }}
            >
              <img src={images[part.id]} alt={part.id} style={{ maxWidth: "100%" }} />
              <p style={{ fontSize: "14px", fontWeight: "bold", color: "#1A237E", marginTop: "4px" }}> 
                {part.etiquetaEs}
              </p>
            </div>
          ) : null
        )}
      </div>

      <p className="text-lg mt-4" style={{ color: "#424242" }}>Aciertos en esta partida: {score}</p> 
    </div>
  );
}
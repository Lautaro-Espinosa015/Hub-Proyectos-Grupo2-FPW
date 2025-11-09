import React, { useState, useRef } from "react";
import "../../../assets/Css/BodyClickGame.css";

import headImg from "../../../assets/Img/ImgEnglishGames/BodyClickGame/head.png";
import eyeImg from "../../../assets/Img/ImgEnglishGames/BodyClickGame/eye.png";
import mouthImg from "../../../assets/Img/ImgEnglishGames/BodyClickGame/mouth.png";
import armImg from "../../../assets/Img/ImgEnglishGames/BodyClickGame/arm.png";
import handImg from "../../../assets/Img/ImgEnglishGames/BodyClickGame/hand.png";
import legImg from "../../../assets/Img/ImgEnglishGames/BodyClickGame/leg.png";
import footImg from "../../../assets/Img/ImgEnglishGames/BodyClickGame/foot.png";

export default function BodyDragGame() {
  const [score, setScore] = useState(0);
  const [placedParts, setPlacedParts] = useState({});
  const referenciaAudio = useRef(null);

  const bodyParts = [
    { id: "head", etiquetaEs: "Body", x: "50%", y: "60%", width: "100px", height: "100px" },
    { id: "eye", etiquetaEs: "Ojo", x: "50%", y: "45%", width: "70px", height: "60px" },
    { id: "mouth", etiquetaEs: "Boca", x: "50%", y: "53%", width: "70px", height: "50px" },
    { id: "arm", etiquetaEs: "Brazo", x: "40%", y: "60%", width: "100px", height: "100px" },
    { id: "hand", etiquetaEs: "Mano", x: "60%", y: "60%", width: "80px", height: "80px" },
    { id: "leg", etiquetaEs: "Pierna", x: "50%", y: "70%", width: "100px", height: "100px" },
    { id: "foot", etiquetaEs: "Pie", x: "50%", y: "85%", width: "70px", height: "80px" }
  ];

  const images = {
    head: headImg,
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

  const soltarParte = (evento, idCasillero) => {
    evento.preventDefault();
    const idArrastrado = evento.dataTransfer.getData("text/plain");
    if (idArrastrado === idCasillero && !placedParts[idCasillero]) {
      setPlacedParts((prev) => ({ ...prev, [idCasillero]: true }));
      setScore((prev) => prev + 1);
    }
  };

  return (
    <div className="game-container">
      <h1 className="text-3xl font-bold mb-2">Body Drag Game</h1>
      <p className="text-xl mb-4">Arrastra cada parte del cuerpo a su posición correcta</p>

      {/* Silueta con casilleros */}
      <div className="relative w-[350px] h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
        {bodyParts.map((part) => (
          
<div
  key={part.id}
  onDrop={(e) => soltarParte(e, part.id)}
  onDragOver={permitirSoltar}
  className={`casillero ${placedParts[part.id] ? "correcto" : ""}`}
  style={{
    left: part.x,
    top: part.y,
    width: part.width,
    height: part.height,
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
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
  {/* Etiqueta en inglés */}
  <p style={{ marginTop: "4px", fontSize: "14px", fontWeight: "bold", color: "#fff" }}>
    {part.id.toUpperCase()}
  </p>
</div>
        ))}
      </div>

      {/* Bandeja horizontal */}
      <div className="bandeja">
        {bodyParts.map((part) =>
          !placedParts[part.id] ? (
            <div
              key={part.id}
              className="pieza"
              draggable
              onDragStart={(e) => iniciarArrastre(e, part.id)}
            >
              <img src={images[part.id]} alt={part.id} />
              <p>{part.etiquetaEs}</p>
            </div>
          ) : null
        )}
      </div>

      <p className="text-lg mt-4">Puntos: {score}</p>
    </div>
  );
}

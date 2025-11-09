import React, { useState, useEffect } from "react";
import "../../assets/Css/BodyClickGame.css";


import headImg from "../../assets/Img/ImgEnglishGames/BodyClickGame/head.png";
import eyeImg from "../../assets/Img/ImgEnglishGames/BodyClickGame/eye.png";
import mouthImg from "../../assets/Img/ImgEnglishGames/BodyClickGame/mouth.png";
import armImg from "../../assets/Img/ImgEnglishGames/BodyClickGame/arm.png";
import handImg from "../../assets/Img/ImgEnglishGames/BodyClickGame/hand.png";
import legImg from "../../assets/Img/ImgEnglishGames/BodyClickGame/leg.png";
import footImg from "../../assets/Img/ImgEnglishGames/BodyClickGame/foot.png";

export default function BodyClickGame() {
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState(null);
  const [score, setScore] = useState(0);
  const [lastHit, setLastHit] = useState(null);
  const [hitState, setHitState] = useState(null); // 'correct' | 'wrong'

  const bodyParts = [
    { id: "head", x: "50%", y: "12%", width: "110px", height: "110px", z: 2 },
    { id: "eye", x: "50%", y: "20%", width: "48px", height: "48px", z: 3 },
    { id: "mouth", x: "50%", y: "28%", width: "64px", height: "40px", z: 3 },
    { id: "arm", x: "28%", y: "44%", width: "120px", height: "120px", z: 1 },
    { id: "hand", x: "28%", y: "58%", width: "84px", height: "84px", z: 1 },
    { id: "leg", x: "50%", y: "72%", width: "120px", height: "120px", z: 1 },
    { id: "foot", x: "50%", y: "90%", width: "84px", height: "84px", z: 1 }
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

  useEffect(() => {
    nextRound(); // inicializa con objetivo aleatorio
  }, []);

  useEffect(() => {
    if (target) setMessage(`Click the ${target.toUpperCase()}`);
  }, [target]);

  const handleClick = (part) => {
    if (part === target) {
      setMessage("Good job!");
      setScore((s) => s + 1);
      setLastHit(part);
      setHitState("correct");
      setTimeout(() => {
        setHitState(null);
        nextRound();
      }, 700);
    } else {
      setLastHit(part);
      setHitState("wrong");
      setMessage("Try again!");
      setTimeout(() => setHitState(null), 420);
    }
  };

  const handleKeyDown = (e, part) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(part);
    }
  };

  const nextRound = () => {
    const parts = bodyParts.map((p) => p.id);
    let randomPart = parts[Math.floor(Math.random() * parts.length)];
    // evita repetir el mismo objetivo consecutivo
    while (parts.length > 1 && randomPart === target) {
      randomPart = parts[Math.floor(Math.random() * parts.length)];
    }
    setTarget(randomPart);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4 bg-blue-100 select-none game-container">
      <h1 className="text-3xl font-bold mb-2">Body Click Game</h1>
      <p className="text-xl mb-4" aria-live="polite">{message}</p>

      <div className="relative w-[350px] h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden">
        {bodyParts.map((part) => (
          <div
            key={part.id}
            role="button"
            tabIndex={0}
            aria-label={`Body part ${part.id}`}
            className={`clickable-part ${lastHit === part.id && hitState ? hitState : ""}`}
            style={{
              left: part.x,
              top: part.y,
              width: part.width,
              height: part.height,
              zIndex: part.z
            }}
            onClick={() => handleClick(part.id)}
            onKeyDown={(e) => handleKeyDown(e, part.id)}
          >
            <div className="pictogram-bg" style={{ width: "100%", height: "100%" }}>
              <img
                src={images[part.id]}
                alt={part.id}
                className="pictogram-style"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                draggable="false"
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-lg mt-4">Score: {score}</p>
    </div>
  );
}
import React, { useState } from "react";
import "../../../assets/Css/ConversacionJuego.css";

import happyImg from "../../../assets/Img/ImgEnglishGames/conversacionjuego/happy.png";
import sadImg from "../../../assets/Img/ImgEnglishGames/conversacionjuego/sad.png";
import appleImg from "../../../assets/Img/ImgEnglishGames/conversacionjuego/apple.png";
import pizzaImg from "../../../assets/Img/ImgEnglishGames/conversacionjuego/pizza.png";
import sunImg from "../../../assets/Img/ImgEnglishGames/conversacionjuego/sunny.png";
import rainImg from "../../../assets/Img/ImgEnglishGames/conversacionjuego/rainy.png";
import byeImg from "../../../assets/Img/ImgEnglishGames/ConversationalSimulator/character_avatar.png";



export default function LongConversationGame() {
  const dialogs = [
    { question: "Hello! How are you?", answers: [{ text: "I'm happy", img: happyImg, correct: true }, { text: "I'm sad", img: sadImg, correct: false }] },
    { question: "Do you like apples?", answers: [{ text: "Yes, I like apples", img: appleImg, correct: true }, { text: "No, I like pizza", img: pizzaImg, correct: false }] },
    { question: "How's the weather?", answers: [{ text: "It's sunny", img: sunImg, correct: true }, { text: "It's rainy", img: rainImg, correct: false }] },
    { question: "Great! Have a nice day!", answers: [{ text: "Bye!", img: byeImg, correct: true }] }
  ];

  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Todas las respuestas son válidas: ignoramos el valor 'correct' y avanzamos siempre
  const handleAnswer = (_correct) => {
    setFeedback("Great job!");
    setTimeout(() => {
      setFeedback("");
      setStep((p) => (p + 1) % dialogs.length);
    }, 700);
  };

  const current = dialogs[step];

  return (
    <div className="lcg-root">
      <h1 className="lcg-title">Conversation Adventure</h1>
      <div className="lcg-card">
        <p className="lcg-question">{current.question}</p>
        <div className="lcg-grid">
          {current.answers.map((ans, i) => (
            <button key={i} className="lcg-answer" onClick={() => handleAnswer(ans.correct)} type="button" aria-label={ans.text}>
              <div className="lcg-answer-row">
                <img src={ans.img} alt={ans.text} />
                <span className="lcg-answer-text">{ans.text}</span>
              </div>
            </button>
          ))}
        </div>
        <p className="lcg-feedback" aria-live="polite">{feedback}</p>
      </div>
    </div>
  );
}
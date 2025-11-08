import React, { useState, useEffect } from "react";
import { questions as originalQuestions } from "./common/questions.js";
import QuestionsCard from "./QuestionCard.jsx";

export default function JuegoVerbosD() {
  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const [questions, setQuestions] = useState(shuffleArray(originalQuestions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  // Temporizador
  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setTimeLeft(10);
  };

  const resetGame = () => {
    setQuestions(shuffleArray(originalQuestions));
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(10);
  };

  const progress = (currentIndex / questions.length) * 100;

  return (
    <div className="container mt-5">
      {currentIndex < questions.length ? (
        <>
          <div className="progress mb-3">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <QuestionsCard
            question={questions[currentIndex].question}
            options={questions[currentIndex].options}
            onAnswer={handleAnswer}
            timeLeft={timeLeft}
          />
        </>
      ) : (
        <div className="text-center">
          <h2>Your score: {score}/{questions.length}</h2>
          <button className="btn btn-success mt-3" onClick={resetGame}>
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
}



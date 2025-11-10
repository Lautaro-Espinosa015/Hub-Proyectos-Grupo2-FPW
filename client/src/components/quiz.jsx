//NO SE USA



import { useState, useEffect } from "react";

function Quiz() {
  // === Preguntas del quiz ===
  const questions = [
    {
      question: "Which word is a subject pronoun?",
      options: ["Her", "They", "Us", "Them"],
      answer: "They",
    },
    {
      question: "Complete the sentence: 'She ___ a student.'",
      options: ["am", "are", "is", "be"],
      answer: "is",
    },
    {
      question: "Choose the correct object pronoun: 'I like ___.'",
      options: ["he", "she", "them", "we"],
      answer: "them",
    },
    {
      question: "Select the correct word: 'We ___ from Argentina.'",
      options: ["is", "are", "am", "be"],
      answer: "are",
    },
    {
      question: "What’s the plural of 'child'?",
      options: ["childs", "childes", "children", "childrens"],
      answer: "children",
    },
  ];

  // === Estados ===
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);

  // === Verificar si ya hizo el quiz antes ===
  useEffect(() => {
    const done = localStorage.getItem("quizDone");
    if (done === "true") {
      setAlreadyDone(true);
    }
  }, []);

  // === Cuando elige una respuesta ===
  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setFinished(true);
      // Guardar que el quiz ya fue hecho
      localStorage.setItem("quizDone", "true");
      localStorage.setItem("quizScore", score + 1);
    }
  };

  // === Determinar el nivel según el puntaje ===
  const getLevel = () => {
    const percent = (score / questions.length) * 100;
    if (percent < 40) return { en: "Beginner", es: "Principiante" };
    if (percent < 80) return { en: "Intermediate", es: "Intermedio" };
    return { en: "Expert", es: "Experto" };
  };

  // === Si ya lo hizo antes ===
  if (alreadyDone && !finished) {
    const lastScore = localStorage.getItem("quizScore");
    const percent = (lastScore / questions.length) * 100;
    let level;
    if (percent < 40) level = { en: "Beginner", es: "Principiante" };
    else if (percent < 80) level = { en: "Intermediate", es: "Intermedio" };
    else level = { en: "Expert", es: "Experto" };

    return (
      <div className="quiz-container">
        <div className="quiz-box">
          <h2>You already completed the quiz!</h2>
          <p>
            Your previous score: {lastScore} / {questions.length}
          </p>
          <p>
            Level: <strong>{level.en}</strong> ({level.es})
          </p>
          <p style={{ marginTop: "15px", color: "gray" }}>
            You can’t take it again.
          </p>
        </div>
      </div>
    );
  }

  // === Vista principal del quiz ===
  return (
    <div className="quiz-container">
      <div className="quiz-box">
        {!finished ? (
          <>
            <h2>
              Question {current + 1} of {questions.length}
            </h2>
            <p className="quiz-question">{questions[current].question}</p>

            {questions[current].options.map((opt, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(opt)}
                className="option-btn"
              >
                {opt}
              </button>
            ))}
          </>
        ) : (
          <div className="result-box">
            <h2>Your Result</h2>
            <p>
              Score: {score} / {questions.length}
            </p>
            <p>
              Level: <strong>{getLevel().en}</strong> ({getLevel().es})
            </p>
            <p style={{ marginTop: "10px", color: "gray" }}>
              You can’t retake the quiz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;

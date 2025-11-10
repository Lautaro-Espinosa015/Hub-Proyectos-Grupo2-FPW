import { useState, useRef, useCallback } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import dogImg from "../../../assets/Img/ImgEnglishGames/YesNo/dog.png";
import catImg from "../../../assets/Img/ImgEnglishGames/YesNo/cat.png";
import carImg from "../../../assets/Img/ImgEnglishGames/YesNo/car.png";
import ballImg from "../../../assets/Img/ImgEnglishGames/YesNo/ball.png";

// --- Audios ---
import audioCorrect from "../../../assets/Sounds/ConversationalSimulator/correct_feedback.mp3";
import audioIncorrect from "../../../assets/Sounds/ConversationalSimulator/incorrect_feedback.mp3";

export default function YesNoGame() {
  const questions = [
    { img: dogImg, english: "Is this a dog?", spanish: "¿Esto es un perro?", correct: true },
    { img: catImg, english: "Is this a dog?", spanish: "¿Esto es un perro?", correct: false },
    { img: carImg, english: "Is this a car?", spanish: "¿Esto es un auto?", correct: true },
    { img: ballImg, english: "Is this a cat?", spanish: "¿Esto es un gato?", correct: false },
  ];

  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("success");
  const [isAnswering, setIsAnswering] = useState(false);

  const audioRef = useRef(new Audio());

  const playSound = useCallback((audioPath, onEndedCallback = () => {}) => {
    if (audioRef.current.src !== audioPath) {
      audioRef.current.src = audioPath;
    }
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(error => console.error("Error de audio:", error));
    audioRef.current.onended = onEndedCallback;
  }, []);

  const handleAnswer = (answer) => {
    if (isAnswering) return;

    setIsAnswering(true);
    const isCorrect = answer === questions[step].correct;

    if (isCorrect) {
      setFeedbackType("success");
      setFeedback("¡Muy bien! / Great job!");
      playSound(audioCorrect, () => {
        setFeedback("");
        setStep((prev) => (prev + 1) % questions.length);
        setIsAnswering(false);
      });
    } else {
      setFeedbackType("error");
      setFeedback("Inténtalo otra vez / Try again");
      playSound(audioIncorrect, () => setIsAnswering(false));
    }
  };

  const current = questions[step];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: '#e3f2fd', // Fondo general: azul muy claro
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          component="h1"
          align="center"
          fontWeight="bold"
          color="#1A237E" // Texto principal: azul oscuro profundo
          gutterBottom
        >
          Yes / No Game
        </Typography>

        <Card
          sx={{
            border: "4px solid",
            borderColor: '#BBDEFB', // Borde de tarjeta: azul claro
            borderRadius: 4,
            boxShadow: 6,
            bgcolor: 'white',
            p: 2,
          }}
        >
          <CardMedia
            component="img"
            image={current.img}
            alt="question"
            sx={{
              height: 260,
              objectFit: "contain",
              bgcolor: '#F5F5F5', // Fondo neutro: gris claro
              border: "4px solid",
              borderColor: '#BBDEFB', // Borde de imagen: azul claro
              borderRadius: 2,
              mx: "auto",
              maxWidth: 320,
            }}
          />

          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5" fontWeight="600" gutterBottom color="#1A237E">
              {current.english}
            </Typography>
            <Typography
              variant="subtitle1"
              color="#424242" // Texto puntuación: gris oscuro
              gutterBottom
            >
              {current.spanish}
            </Typography>

            <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 2 }}>
              <Button
                onClick={() => handleAnswer(true)}
                variant="contained"
                disabled={isAnswering}
                sx={{
                  border: "4px solid",
                  borderColor: '#c8e6c9', // Borde correcto: verde pastel
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  bgcolor: '#c8e6c9', // Fondo correcto: verde pastel
                  color: '#1A237E', // Texto principal
                  '&:hover': { bgcolor: '#a5d6a7' }, // Hover: verde claro
                }}
              >
                YES
              </Button>
              <Button
                onClick={() => handleAnswer(false)}
                variant="contained"
                disabled={isAnswering}
                sx={{
                  border: "4px solid",
                  borderColor: '#BBDEFB', // Reutilizamos azul claro para NO
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  bgcolor: '#90CAF9', // Botón activo: azul medio
                  color: '#1A237E',
                  '&:hover': { bgcolor: '#BBDEFB' }, // Hover: azul claro
                }}
              >
                NO
              </Button>
            </Stack>

            {feedback && (
              <Alert severity={feedbackType} sx={{ mt: 3, fontWeight: "bold" }}>
                {feedback}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
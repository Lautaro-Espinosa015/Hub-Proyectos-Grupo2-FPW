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

// --- Importaciones Adicionales ---
import { Link } from 'react-router-dom'; // Importación necesaria para el cambio de nivel
import { useAutorizacion } from "../../../Contexts/AutorizacionContext";
import ReplayIcon from '@mui/icons-material/Replay'; // Para el botón de reinicio
// ----------------------------------

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

  const { currentUser, updateScore, isLoggedIn } = useAutorizacion();
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("success");
  const [isAnswering, setIsAnswering] = useState(false);
  const [score, setScore] = useState(0); 

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

  const handleAnswer = async (answer) => {
    if (isAnswering) return;

    setIsAnswering(true);
    const isCorrect = answer === questions[step].correct;

    if (isCorrect) {
      setFeedbackType("success");
      setFeedback("¡Muy bien! / Great job!");
      setScore((prev) => prev + 1);
      await updateScore(10); // Sumar 10 puntos al puntaje global
      playSound(audioCorrect, () => {
        setFeedback("");
        
        const nextStep = step + 1;
        if (nextStep < questions.length) {
            setStep(nextStep); // Avanza a la siguiente pregunta
        } else {
            setStep(questions.length); // Establece el paso al final para activar la pantalla de fin de juego
        }
        
        setIsAnswering(false);
      });
    } else {
      setFeedbackType("error");
      setFeedback("Inténtalo otra vez / Try again");
      playSound(audioIncorrect, () => setIsAnswering(false));
    }
  };

    const handleRestart = () => {
        setStep(0);
        setScore(0);
        setFeedback("");
        setIsAnswering(false);
    };

    const isGameOver = step >= questions.length;
    
    // --- RENDERIZADO DE FIN DE JUEGO ---
    if (isGameOver) {
        return (
            <Container maxWidth="sm" sx={{ py: 6, textAlign: 'center', bgcolor: '#e3f2fd', minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Typography variant="h3" color="#1A237E" fontWeight="bold" gutterBottom>
                    ¡Juego Terminado! 🎉
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, color: '#424242' }}>
                    Tu puntaje final es: **{score} de {questions.length}**
                </Typography>
                
                <Stack direction="column" spacing={2} justifyContent="center" sx={{ maxWidth: 300, mx: 'auto' }}>
                    
                    {/* Botón 1: Jugar de Nuevo */}
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        startIcon={<ReplayIcon />}
                        onClick={handleRestart}
                    >
                        Jugar de Nuevo
                    </Button>
                    
                    {/* Botón 2: CAMBIO DE NIVEL (Asume que la ruta es /yesno-nivel-2) */}
                    <Link to="/ConversacionJuego" style={{ textDecoration: 'none' }}>
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
    // --- FIN RENDERIZADO FIN DE JUEGO ---


    // --- RENDERIZADO DEL JUEGO NORMAL ---
  const current = questions[step];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: '#e3f2fd', 
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
          color="#1A237E" 
          gutterBottom
        >
          Yes / No Game
        </Typography>

        <Card
          sx={{
            border: "4px solid",
            borderColor: '#BBDEFB', 
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
              bgcolor: '#F5F5F5', 
              border: "4px solid",
              borderColor: '#BBDEFB', 
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
              color="#424242" 
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
                  borderColor: '#c8e6c9', 
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  bgcolor: '#c8e6c9', 
                  color: '#1A237E', 
                  '&:hover': { bgcolor: '#a5d6a7' }, 
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
                  borderColor: '#BBDEFB', 
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  bgcolor: '#90CAF9', 
                  color: '#1A237E',
                  '&:hover': { bgcolor: '#BBDEFB' }, 
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

        {/* Contador de puntos modular */}
        {isLoggedIn && (
          <Box
            sx={{
              mt: 4,
              p: 2,
              backgroundColor: "#F5F5F5", 
              border: "2px solid #BBDEFB", 
              borderRadius: "12px",
              textAlign: "center",
              color: "#424242", 
              fontSize: "18px",
              fontWeight: "bold",
              width: "fit-content",
              mx: "auto"
            }}
          >
            Puntaje Total: {currentUser?.puntaje || 0}
          </Box>
        )}
      </Container>
    </Box>
  );
}
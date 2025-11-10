import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Paper,
  Container,
  Chip,
  Alert
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// --- Assets (reutilizando y placeholders) ---
import characterAvatar from '../../../assets/Img/ImgEnglishGames/ConversationalSimulator/character_avatar.png';
import pictogramApple from '../../../assets/Img/ImgEnglishGames/ImgArrastraLaImagen/manzana.png';
import pictogramDog from '../../../assets/Img/ImgEnglishGames/ImgArrastraLaImagen/perro.png';
import pictogramCar from '../../../assets/Img/ImgEnglishGames/ImgArrastraLaImagen/auto.png';

// --- Audios (reutilizando y placeholders) ---
import audioWhatIsThis from '../../../assets/Sounds/ConversationalSimulator/hello_how_are_you.mp3'; // Placeholder for "What is this?"
import audioCorrect from '../../../assets/Sounds/ConversationalSimulator/correct_feedback.mp3'; // Placeholder for "Correct!"
import audioIncorrect from '../../../assets/Sounds/ConversationalSimulator/incorrect_feedback.mp3'; // Placeholder for "Try again"
import audioApple from '../../../assets/Sounds/SoundsArrastraLaImagen/apple.mp3';
import audioDog from '../../../assets/Sounds/SoundsArrastraLaImagen/dog.mp3';
import audioCar from '../../../assets/Sounds/SoundsArrastraLaImagen/car.mp3';

// --- Estructura de datos del Quiz ---
const quizData = [
  {
    questionText: "What is this?",
    questionImage: pictogramApple,
    questionAudio: audioWhatIsThis,
    options: [
      { optionText: "Dog", optionAudio: audioDog, isCorrect: false },
      { optionText: "Apple", optionAudio: audioApple, isCorrect: true },
      { optionText: "Car", optionAudio: audioCar, isCorrect: false },
    ],
  },
  {
    questionText: "What is this?",
    questionImage: pictogramCar,
    questionAudio: audioWhatIsThis,
    options: [
      { optionText: "Car", optionAudio: audioCar, isCorrect: true },
      { optionText: "Apple", optionAudio: audioApple, isCorrect: false },
      { optionText: "Dog", optionAudio: audioDog, isCorrect: false },
    ],
  },
  {
    questionText: "What is this?",
    questionImage: pictogramDog,
    questionAudio: audioWhatIsThis,
    options: [
      { optionText: "Apple", optionAudio: audioApple, isCorrect: false },
      { optionText: "Car", optionAudio: audioCar, isCorrect: false },
      { optionText: "Dog", optionAudio: audioDog, isCorrect: true },
    ],
  },
];
export default function QuizSimulator() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ type: '', message: '' }); // type: 'correct' | 'incorrect'
  const [isAnswering, setIsAnswering] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const audioRef = useRef(new Audio());
  const currentQuestion = quizData[currentQuestionIndex];

  const playSound = useCallback((audioPath, onEndedCallback = () => {}) => {
    if (audioRef.current.src !== audioPath) {
      audioRef.current.src = audioPath;
    }
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(error => console.error("Error de audio:", error));
    audioRef.current.onended = onEndedCallback;
  }, []);

  useEffect(() => {
    if (currentQuestion?.questionAudio) {
      playSound(currentQuestion.questionAudio);
    }
  }, [currentQuestionIndex, playSound, currentQuestion]);

  const handleOptionClick = (option) => {
    if (isAnswering) return;

    setIsAnswering(true);
    playSound(option.optionAudio, () => {
      if (option.isCorrect) {
        setScore(prev => prev + 1);
        setFeedback({ type: 'correct', message: '¡Correcto!' });
        playSound(audioCorrect, () => {
          setTimeout(() => {
            const nextIndex = currentQuestionIndex + 1;
            if (nextIndex < quizData.length) {
              setCurrentQuestionIndex(nextIndex);
              setFeedback({ type: '', message: '' });
            } else {
              setGameOver(true);
            }
            setIsAnswering(false);
          }, 1000);
        });
      } else {
        setFeedback({ type: 'incorrect', message: 'Inténtalo de nuevo' });
        playSound(audioIncorrect, () => {
          setTimeout(() => {
            setFeedback({ type: '', message: '' });
            setIsAnswering(false);
          }, 1000);
        });
      }
    });
  };

  const handleRestartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback({ type: '', message: '' });
    setIsAnswering(false);
    setGameOver(false);
    audioRef.current.pause();
  };
    if (gameOver) {
    return (
      <Container maxWidth="md" sx={{ py: 5, textAlign: 'center', bgcolor: '#e3f2fd', borderRadius: 2 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 2, bgcolor: 'white' }}>
          <Typography variant="h4" color="#1A237E" gutterBottom>¡Juego Terminado!</Typography>
          <Typography variant="h5" sx={{ mb: 3, color: '#1A237E' }}>
            Tu puntaje final es: {score} de {quizData.length}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ReplayIcon />}
            onClick={handleRestartGame}
          >
            Jugar de Nuevo
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!currentQuestion) return <p>Cargando quiz...</p>;

  return (
    <Container maxWidth="md" sx={{ py: 5, bgcolor: '#e3f2fd', borderRadius: 2 }}>
      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, textAlign: 'center', borderRadius: 2, bgcolor: 'white' }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="#1A237E">
          Quiz de Vocabulario
        </Typography>
        <Chip label={`Puntaje: ${score}`} sx={{ mb: 3, fontSize: '1rem', bgcolor: '#BBDEFB', color: '#1A237E' }} />

        {/* Sección de la Pregunta */}
        <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            component="img"
            src={characterAvatar}
            alt="Character Avatar"
            sx={{ width: 100, height: 100, borderRadius: '50%', mb: 2 }}
          />
          <Typography variant="h5" sx={{ mb: 2, color: '#1A237E' }}>{currentQuestion.questionText}</Typography>
          <Box
            component="img"
            src={currentQuestion.questionImage}
            alt="Objeto de la pregunta"
            sx={{ width: 150, height: 150, objectFit: 'contain', border: '2px solid #BBDEFB', borderRadius: 2, p: 1 }}
          />
        </Box>

        {/* Feedback */}
        <Box sx={{ minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          {feedback.message && (
            <Alert
              severity={feedback.type === 'correct' ? 'success' : 'error'}
              iconMapping={{
                success: <CheckCircleIcon fontSize="inherit" />,
                error: <CancelIcon fontSize="inherit" />,
              }}
              sx={{
                bgcolor: feedback.type === 'correct' ? '#c8e6c9' : '#ffcdd2',
                color: '#1A237E',
                fontWeight: 'medium',
              }}
            >
              {feedback.message}
            </Alert>
          )}
        </Box>

        {/* Sección de Opciones */}
        <Grid container spacing={2} justifyContent="center">
          {currentQuestion.options.map((option, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <CardActionArea
                onClick={() => handleOptionClick(option)}
                disabled={isAnswering}
                sx={{
                  height: '100%',
                  borderRadius: 2,
                  boxShadow: 3,
                  bgcolor: isAnswering ? '#E0E0E0' : 'white',
                  '&:hover': { bgcolor: '#F5F5F5' },
                  border: '1px solid #BBDEFB',
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="medium" color="#1A237E">
                    {option.optionText}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}
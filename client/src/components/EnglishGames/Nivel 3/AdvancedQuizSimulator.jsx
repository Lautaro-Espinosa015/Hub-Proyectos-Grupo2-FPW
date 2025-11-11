import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActionArea, Grid, Paper, Container, Chip, Alert, IconButton, Tooltip } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { useAutorizacion } from '../../../Contexts/AutorizacionContext';

// --- Assets ---
import characterAvatar from '../../../assets/Img/ImgEnglishGames/ConversationalSimulator/character_avatar.png';
import pictogramHouse from '../../../assets/Img/ImgEnglishGames/ConversationalSimulator/pictogram_house.png'; 

// --- Audios ---
import audioFlagQuestion from '../../../assets/Sounds/ConversationalSimulator/flag_question.mp3'; // Placeholder
import audioFlagOptionBlueWhite from '../../../assets/Sounds/ConversationalSimulator/flag_blue_white.mp3'; // Placeholder
import audioFlagOptionRedWhiteBlue from '../../../assets/Sounds/ConversationalSimulator/flag_red_white_blue.mp3'; // Placeholder
import audioFlagOptionGreenYellow from '../../../assets/Sounds/ConversationalSimulator/flag_green_yellow.mp3'; // Placeholder

import audioSunQuestion from '../../../assets/Sounds/ConversationalSimulator/sun_question.mp3'; // Placeholder
import audioSunOptionHot from '../../../assets/Sounds/ConversationalSimulator/sun_hot.mp3'; // Placeholder
import audioSunOptionCold from '../../../assets/Sounds/ConversationalSimulator/sun_cold.mp3'; // Placeholder

import audioWhatIsThis from '../../../assets/Sounds/ConversationalSimulator/what_object_is_this.mp3'; // Placeholder
import audioCorrect from '../../../assets/Sounds/ConversationalSimulator/correct_feedback.mp3'; // Placeholder for "Correct!"
import audioIncorrect from '../../../assets/Sounds/ConversationalSimulator/incorrect_feedback.mp3'; // Placeholder for "Try again"
import audioHouse from '../../../assets/Sounds/ConversationalSimulator/house.mp3'; // Placeholder
import audioBook from '../../../assets/Sounds/ConversationalSimulator/book.mp3'; // Placeholder

// --- Estructura de datos del Quiz Avanzado ---
const advancedQuizData = [
  {
    questionText: "What colors are the Argentine flag?",
    questionImage: null, // Sin imagen principal
    questionAudio: audioFlagQuestion,
    options: [
      { optionText: "Red, White, and Blue", optionAudio: audioFlagOptionRedWhiteBlue, isCorrect: false },
      { optionText: "Sky Blue, White, and Sky Blue (with a sun)", optionAudio: audioFlagOptionBlueWhite, isCorrect: true },
      { optionText: "Green and Yellow", optionAudio: audioFlagOptionGreenYellow, isCorrect: false },
    ],
    hint: "It has a sun in the middle."
  },
  {
    questionText: "The sun is...",
    questionImage: null, // Sin imagen principal
    questionAudio: audioSunQuestion,
    options: [
      { optionText: "Hot", optionAudio: audioSunOptionHot, isCorrect: true },
      { optionText: "Cold", optionAudio: audioSunOptionCold, isCorrect: false },
    ],
    hint: "You feel it on a summer day."
  },
  {
    questionText: "Which object is this?",
    questionImage: pictogramHouse, // Con imagen principal
    questionAudio: audioWhatIsThis,
    options: [
      { optionText: "House", optionAudio: audioHouse, isCorrect: true },
      { optionText: "Book", optionAudio: audioBook, isCorrect: false },
    ],
    hint: "It's a place where people live."
  },
];

export default function AdvancedQuizSimulator() {
  const { currentUser, updateScore, isLoggedIn } = useAutorizacion();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0); // Puntuación de la sesión actual
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [isAnswering, setIsAnswering] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const audioRef = useRef(new Audio());
  const currentQuestion = advancedQuizData[currentQuestionIndex];

  const playSound = useCallback((audioPath, onEndedCallback = () => {}) => {
    if (!audioPath) {
      onEndedCallback();
      return;
    }

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
    setShowHint(false);
  }, [currentQuestionIndex, playSound, currentQuestion]);

  const handleOptionClick = async (option) => {
    if (isAnswering) return;

    setIsAnswering(true);

    const processResult = async () => {
      if (option.isCorrect) {
        setScore(prev => prev + 1);
        await updateScore(25); // Otorgar 25 puntos por acierto

        setFeedback({ type: 'correct', message: '¡Excelente!' });
        playSound(audioCorrect, () => {
          setTimeout(async () => {
            const nextIndex = currentQuestionIndex + 1;
            if (nextIndex < advancedQuizData.length) {
              setCurrentQuestionIndex(nextIndex);
              setFeedback({ type: '', message: '' });
            } else {
              setGameOver(true);
            }
            setIsAnswering(false);
          }, 1200);
        });
      } else {
        setFeedback({ type: 'incorrect', message: 'No es correcto, intenta de nuevo' });
        playSound(audioIncorrect, () => {
          setTimeout(() => {
            setFeedback({ type: '', message: '' });
            setIsAnswering(false);
          }, 1200);
        });
      }
    };

    await playSound(option.optionAudio, processResult);
  };

  const handleRestartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    // No reiniciamos la puntuación general
    setFeedback({ type: '', message: '' });
    setIsAnswering(false);
    setGameOver(false);
    setShowHint(false);
    audioRef.current.pause();
  };

  if (gameOver) {
    return (
      <Container maxWidth="md" sx={{ py: 5, textAlign: 'center' }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" color="primary" gutterBottom>¡Juego Terminado!</Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Tu puntaje en esta ronda fue: {score} de {advancedQuizData.length}
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
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, textAlign: 'center', borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          Quiz Interactivo
        </Typography>
        {isLoggedIn && (
          <Chip label={`Puntuación General: ${currentUser?.puntaje || 0}`} color="secondary" sx={{ mb: 2, fontSize: '1rem' }} />
        )}

        <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            component="img"
            src={characterAvatar}
            alt="Character Avatar"
            sx={{ width: 100, height: 100, borderRadius: '50%', mb: 2 }}
          />
          <Typography variant="h4" component="h2" sx={{ mb: 2, minHeight: '3rem', fontWeight: '500' }}>
            {currentQuestion.questionText}
          </Typography>

          {currentQuestion.questionImage && (
            <Box
              component="img"
              src={currentQuestion.questionImage}
              alt="Objeto de la pregunta"
              sx={{
                width: 180,
                height: 180,
                objectFit: 'contain',
                border: '2px solid #fd88eeff',
                borderRadius: 2,
                p: 1,
                mb: 2
              }}
            />
          )}
        </Box>

        <Box sx={{ minHeight: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          {feedback.message && (
            <Alert
              severity={feedback.type === 'correct' ? 'success' : 'error'}
              iconMapping={{
                success: <CheckCircleIcon fontSize="inherit" />,
                error: <CancelIcon fontSize="inherit" />,
              }}
            >
              {feedback.message}
            </Alert>
          )}
          {showHint && !feedback.message && (
            <Alert severity="info" icon={<LightbulbIcon />}>
              Pista: {currentQuestion.hint}
            </Alert>
          )}
        </Box>

        <Grid container spacing={2} justifyContent="center">
          {currentQuestion.options.map((option, index) => (
            <Grid item xs={12} sm={6} md={currentQuestion.options.length > 3 ? 3 : 4} key={index}>
              <CardActionArea
                onClick={() => handleOptionClick(option)}
                disabled={isAnswering}
                sx={{
                  height: '100%', borderRadius: 2, boxShadow: 3,
                  bgcolor: isAnswering ? 'action.disabledBackground' : 'background.paper',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <CardContent sx={{ p: 2, minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h6" fontWeight="medium">
                    {option.optionText}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Tooltip title="Mostrar una pista">
            <span>
              <IconButton color="secondary" onClick={() => setShowHint(true)} disabled={showHint || isAnswering}>
                <LightbulbIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Paper>
    </Container>
  );
}

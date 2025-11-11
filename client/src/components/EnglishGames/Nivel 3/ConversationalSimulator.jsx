import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActionArea, Grid, Paper, Container } from '@mui/material';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes'; // Example pictogram for character speaking
import ReplayIcon from '@mui/icons-material/Replay'; // Icon for restart button
import { Link } from 'react-router-dom'; // IMPORTACIÓN ESENCIAL PARA EL CAMBIO DE NIVEL

// --- Importar assets (asegúrate de que estas rutas y archivos existan) ---
// Avatares y pictogramas
import characterAvatar from '../../../assets/Img/ImgEnglishGames/ConversationalSimulator/character_avatar.png'; // Placeholder
import pictogramFine from '../../../assets/Img/ImgEnglishGames/ConversationalSimulator/pictogram_fine.png'; // Placeholder
import pictogramTired from '../../../assets/Img/ImgEnglishGames/ConversationalSimulator/pictogram_tired.png'; // Placeholder
import pictogramPark from '../../../assets/Img/ImgEnglishGames/ConversationalSimulator/pictogram_park.png'; // Placeholder
import pictogramRead from '../../../assets/Img/ImgEnglishGames/ConversationalSimulator/pictogram_read.png'; // Placeholder

// Audios del personaje
import audioHelloHowAreYou from '../../../assets/Sounds/ConversationalSimulator/hello_how_are_you.mp3'; // Placeholder
import audioThatsGreatWhatPlans from '../../../assets/Sounds/ConversationalSimulator/thats_great_what_plans.mp3'; // Placeholder
import audioOhSorryWhatPlans from '../../../assets/Sounds/ConversationalSimulator/oh_sorry_what_plans.mp3'; // Placeholder
import audioSoundsFunHaveGreatTime from '../../../assets/Sounds/ConversationalSimulator/sounds_fun_have_great_time.mp3'; // Placeholder
import audioReadingRelaxingEnjoy from '../../../assets/Sounds/ConversationalSimulator/reading_relaxing_enjoy.mp3'; // Placeholder
import audioNiceTalkingToYou from '../../../assets/Sounds/ConversationalSimulator/nice_talking_to_you.mp3'; // Placeholder

// Audios de las opciones del usuario
import audioImFineThankYou from '../../../assets/Sounds/ConversationalSimulator/im_fine_thank_you.mp3'; // Placeholder
import audioImABitTired from '../../../assets/Sounds/ConversationalSimulator/im_a_bit_tired.mp3'; // Placeholder
import audioGoingToPark from '../../../assets/Sounds/ConversationalSimulator/going_to_park.mp3'; // Placeholder
import audioStayHomeAndRead from '../../../assets/Sounds/ConversationalSimulator/stay_home_and_read.mp3'; // Placeholder

// --- Conversation Data Structure ---
const conversationData = {
  "start": {
    characterText: "Hello! How are you today?",
    characterAudio: audioHelloHowAreYou,
    options: [
      {
        optionText: "I'm fine, thank you!",
        optionAudio: audioImFineThankYou,
        pictogram: pictogramFine,
        nextDialogueId: "dialogue_1a",
      },
      {
        optionText: "I'm a bit tired.",
        optionAudio: audioImABitTired,
        pictogram: pictogramTired,
        nextDialogueId: "dialogue_1b",
      },
    ],
  },
  "dialogue_1a": {
    characterText: "That's great to hear! What are your plans for the weekend?",
    characterAudio: audioThatsGreatWhatPlans,
    options: [
      {
        optionText: "I'm going to the park.",
        optionAudio: audioGoingToPark,
        pictogram: pictogramPark,
        nextDialogueId: "dialogue_2a",
      },
      {
        optionText: "I'll stay home and read.",
        optionAudio: audioStayHomeAndRead,
        pictogram: pictogramRead,
        nextDialogueId: "dialogue_2b",
      },
    ],
  },
  "dialogue_1b": {
    characterText: "Oh, I'm sorry to hear that. Maybe a good rest will help. What are your plans for the weekend?",
    characterAudio: audioOhSorryWhatPlans,
    options: [
      {
        optionText: "I'm going to the park.",
        optionAudio: audioGoingToPark,
        pictogram: pictogramPark,
        nextDialogueId: "dialogue_2a",
      },
      {
        optionText: "I'll stay home and read.",
        optionAudio: audioStayHomeAndRead,
        pictogram: pictogramRead,
        nextDialogueId: "dialogue_2b",
      },
    ],
  },
  "dialogue_2a": {
    characterText: "Sounds fun! Have a great time!",
    characterAudio: audioSoundsFunHaveGreatTime,
    options: [], // No more options, this branch ends here
    endMessage: "¡Excelente conversación! Disfruta tu tiempo en el parque.",
  },
  "dialogue_2b": {
    characterText: "Reading is relaxing. Enjoy your quiet time!",
    characterAudio: audioReadingRelaxingEnjoy,
    options: [], // No more options, this branch ends here
    endMessage: "¡Excelente conversación! Disfruta tu lectura.",
  },
  "end_game": { // Un estado final explícito para el juego
    characterText: "It was nice talking to you! Click 'Restart' to play again.",
    characterAudio: audioNiceTalkingToYou,
    options: [],
    isFinal: true, // Bandera para indicar que es el final del juego
  },
};

export default function ConversationalSimulator() {
  // --- P1: Estados básicos para manejar la conversación ---
  const [currentDialogueId, setCurrentDialogueId] = useState("start"); // ID del diálogo actual
  const [currentDialogue, setCurrentDialogue] = useState(conversationData["start"]); // Objeto de diálogo actual
  const [isCharacterSpeaking, setIsCharacterSpeaking] = useState(false); // Indica si el personaje está reproduciendo audio
  const [isUserOptionPlaying, setIsUserOptionPlaying] = useState(false); // Indica si la opción del usuario está reproduciendo audio

  // Referencia para el objeto de audio, para controlar la reproducción
  const audioRef = useRef(new Audio());

  // --- P3: Manejo de Audio ---
  const playSound = useCallback((audioPath, onEndedCallback = () => {}) => {
    // Si el audio actual es diferente, actualiza la fuente
    if (audioRef.current.src !== audioPath) {
      audioRef.current.src = audioPath;
    }
    audioRef.current.pause(); // Pausa cualquier audio que se esté reproduciendo
    audioRef.current.currentTime = 0; // Reinicia el audio al principio

    audioRef.current.play()
      .then(() => {
        // Audio comenzó a reproducirse exitosamente
      })
      .catch(error => {
        console.error("Error al reproducir audio (posiblemente política de autoplay):", error);
        // Aquí podrías mostrar un mensaje al usuario para que interactúe y permita el audio
      });
    audioRef.current.onended = onEndedCallback; // Asigna el callback para cuando el audio termine
  }, []); 

  // Efecto para cargar y reproducir el audio del personaje cuando cambia el diálogo
  useEffect(() => {
    const dialogue = conversationData[currentDialogueId];
    if (dialogue) {
      setCurrentDialogue(dialogue);
      setIsCharacterSpeaking(true); // El personaje está hablando
      playSound(dialogue.characterAudio, () => {
        setIsCharacterSpeaking(false); // El personaje terminó de hablar
        // Si es un diálogo final sin opciones, pasamos al estado 'end_game'
        if (dialogue.options.length === 0 && !dialogue.isFinal) {
          setCurrentDialogueId("end_game");
        }
      });
    } else {
      console.error("ID de diálogo inválido:", currentDialogueId);
      setCurrentDialogueId("start"); // Reiniciar al inicio si hay un ID inválido
    }
  }, [currentDialogueId, playSound]);

  // --- P5: Lógica de Flujo ---
  const handleOptionClick = (option) => {
    // Evita clics múltiples o superposición de audios
    if (isCharacterSpeaking || isUserOptionPlaying) return;

    setIsUserOptionPlaying(true); // La opción del usuario está reproduciendo audio
    playSound(option.optionAudio, () => {
      setIsUserOptionPlaying(false); // La opción del usuario terminó de reproducir audio
      if (option.nextDialogueId) {
        setCurrentDialogueId(option.nextDialogueId); // Avanza al siguiente diálogo
      }
    });
  };

  // Función para reiniciar el juego
  const handleRestartGame = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentDialogueId("start");
    setIsCharacterSpeaking(false);
    setIsUserOptionPlaying(false);
  };

  // Determina si la conversación ha terminado (no hay más opciones y el personaje no está hablando)
  const isConversationOver = currentDialogue?.options.length === 0 && !isCharacterSpeaking && !isUserOptionPlaying;

  return (
    // --- P4: Interfaz de Usuario (MUI) ---
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, textAlign: 'center', borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          Simulador de Conversación
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Practica tu inglés conversando con nuestro personaje.
        </Typography>

        {/* Sección del Personaje */}
        <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            component="img"
            src={characterAvatar}
            alt="Character Avatar"
            sx={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', mb: 2, border: '3px solid', borderColor: 'primary.main' }}
          />
          <Typography variant="h5" component="h2" sx={{ mb: 1, color: 'primary.dark' }}>
            Character
          </Typography>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              bgcolor: isCharacterSpeaking ? 'primary.light' : 'red.200', // Resalta si el personaje está hablando
              color: isCharacterSpeaking ? 'primary.contrastText' : 'text.primary',
              borderRadius: 2,
              minHeight: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: 500,
              transition: 'background-color 0.3s ease', // Transición suave para el color de fondo
            }}
          >
            <Typography variant="h6" sx={{ fontStyle: isCharacterSpeaking ? 'italic' : 'normal' }}>
              {currentDialogue?.characterText}
            </Typography>
          </Paper>
        </Box>

        {/* Sección de Opciones */}
        <Box sx={{ mt: 4 }}>
          {isConversationOver ? (
            <Box>
              <Typography variant="h5" color="success.main" sx={{ mb: 3 }}>
                {currentDialogue?.endMessage || "¡Conversación finalizada!"}
              </Typography>
              
              {/* BOTONES DE FIN DE NIVEL */}
              <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
                  
                
                  {/* Botón 2: Siguiente Nivel */}
                  {/* NOTA: Debes asegurar la ruta '/conversacion-nivel-2' en tu router */}
                  <Grid item xs={12} sm={6}>
                      <Link to="/AdvancedQuizSimulator" style={{ textDecoration: 'none', width: '100%' }}>
                          <Button
                              variant="contained"
                              color="success"
                              size="large"
                              fullWidth
                          >
                              Siguiente Nivel
                          </Button>
                      </Link>
                  </Grid>
              </Grid>

            </Box>
          ) : (
            <Grid container spacing={2} justifyContent="center">
              {currentDialogue?.options.map((option, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <CardActionArea
                    onClick={() => handleOptionClick(option)}
                    disabled={isCharacterSpeaking || isUserOptionPlaying} // Deshabilita si hay audio en curso
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                      bgcolor: (isCharacterSpeaking || isUserOptionPlaying) ? 'action.disabledBackground' : 'background.paper',
                    }}
                  >
                    <CardContent>
                      <Box
                        component="img"
                        src={option.pictogram}
                        alt={option.optionText}
                        sx={{ width: 60, height: 60, mb: 1 }}
                      />
                      <Typography variant="body1" fontWeight="medium">
                        {option.optionText}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
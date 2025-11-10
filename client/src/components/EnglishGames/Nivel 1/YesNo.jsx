import { useState } from "react";

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

export default function YesNoGame() {
  const questions = [
    {
      img: dogImg,
      english: "Is this a dog?",
      spanish: "¿Esto es un perro?",
      correct: true,
    },
    {
      img: catImg,
      english: "Is this a dog?",
      spanish: "¿Esto es un perro?",
      correct: false,
    },
    {
      img: carImg,
      english: "Is this a car?",
      spanish: "¿Esto es un auto?",
      correct: true,
    },
    {
      img: ballImg,
      english: "Is this a cat?",
      spanish: "¿Esto es un gato?",
      correct: false,
    },
  ];

  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("success"); // "success" | "error"

  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[step].correct;

    if (isCorrect) {
      setFeedbackType("success");
      setFeedback("¡Muy bien! / Great job!");
      setTimeout(() => {
        setFeedback("");
        setStep((prev) => (prev + 1) % questions.length);
      }, 900);
    } else {
      setFeedbackType("error");
      setFeedback("Inténtalo otra vez / Try again");
    }
  };

  const current = questions[step];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "green.50",
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
          gutterBottom
        >
          Yes / No Game
        </Typography>

        <Card
          sx={{
            border: "4px solid",
            borderColor: "black",
            borderRadius: 4,
            boxShadow: 6,
            bgcolor: "background.paper",
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
              bgcolor: "grey.100",
              border: "4px solid",
              borderColor: "black",
              borderRadius: 2,
              mx: "auto",
              maxWidth: 320,
            }}
          />

          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5" fontWeight="600" gutterBottom>
              {current.english}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              gutterBottom
            >
              {current.spanish}
            </Typography>

            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              sx={{ mt: 2 }}
            >
              <Button
                onClick={() => handleAnswer(true)}
                variant="contained"
                color="success"
                sx={{
                  border: "4px solid",
                  borderColor: "black",
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                }}
              >
                YES
              </Button>

              <Button
                onClick={() => handleAnswer(false)}
                variant="contained"
                color="error"
                sx={{
                  border: "4px solid",
                  borderColor: "black",
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                }}
              >
                NO
              </Button>
            </Stack>

            {feedback && (
              <Alert
                severity={feedbackType}
                sx={{ mt: 3, fontWeight: "bold" }}
              >
                {feedback}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

import React from "react";
import JuegoEstrella from "../components/Proyecto5/JuegoEstrella";
import JuegoVerbosD from "../components/EnglishGames/Nivel 2/JuegoVerbosD";
//import MatchingGame from "../components/MatchingGame";


export default function Games() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Mini-juegos</h1>
      <div style={{ marginTop: 16 }}>
       <JuegoEstrella />
      </div>
    </div> 
  );
}

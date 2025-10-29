import React from "react";
import JuegoEstrella from "../components/Proyecto5/JuegoEstrella";
import JuegoVerbosD from "../components/JuegoVerbosD";

export default function Games() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Mini-juegos</h1>
      <div style={{ marginTop: 16 }}>
       <JuegoEstrella />
       <JuegoVerbosD/>
      </div>
    </div> 
  );
}

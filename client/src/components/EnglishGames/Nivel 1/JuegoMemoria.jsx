import React, { useState, useEffect } from "react";

import rojo from "../../../assets/Img/Img_P1-Estrada/rojo.jpg";
import llave from "../../../assets/Img/Img_P1-Estrada/llave.png";
import gatito from "../../../assets/Img/Img_P1-Estrada/gatito.png";
import amarillo from "../../../assets/Img/Img_P1-Estrada/amarillo.png";
import peluche from "../../../assets/Img/Img_P1-Estrada/peluche.jpg";
import perrito from "../../../assets/Img/Img_P1-Estrada/perrito.jpg";
import reversoCart from "../../../assets/Img/Img_P1-Estrada/lconoPagina.png";

const imagenes = [
  { id: 1, src: rojo },
  { id: 2, src: llave },
  { id: 3, src: gatito },
  { id: 4, src: amarillo },
  { id: 5, src: peluche },
  { id: 6, src: perrito }
];

const mezclarCartas = () => {
  const duplicadas = [...imagenes, ...imagenes];
  return duplicadas.sort(() => Math.random() - 0.5);
};

function JuegoMemoria() {
  const [cartas, setCartas] = useState(mezclarCartas());
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [acertadas, setAcertadas] = useState([]);
  const [puntuacion, setPuntuacion] = useState(0);
  const [aciertosTotales, setAciertosTotales] = useState(0);

  // Cargar puntuación desde localStorage al iniciar
  useEffect(() => {
    const puntuacionGuardada = localStorage.getItem("puntuacionMemoria");
    if (puntuacionGuardada) {
      setPuntuacion(parseInt(puntuacionGuardada));
    }
  }, []);

  useEffect(() => {
    if (seleccionadas.length === 2) {
      const [i1, i2] = seleccionadas;
      if (cartas[i1].id === cartas[i2].id) {
        setAcertadas((prev) => [...prev, cartas[i1].id]);

        const nuevosAciertos = aciertosTotales + 1;
        setAciertosTotales(nuevosAciertos);

        if (nuevosAciertos % 5 === 0) {
          const nuevaPuntuacion = puntuacion + 1;
          setPuntuacion(nuevaPuntuacion);
          localStorage.setItem("puntuacionMemoria", nuevaPuntuacion);
        }
      }
      setTimeout(() => setSeleccionadas([]), 1000);
    }
  }, [seleccionadas, cartas]);

  const manejarClick = (index) => {
    if (seleccionadas.length === 2 || seleccionadas.includes(index)) return;
    setSeleccionadas([...seleccionadas, index]);
  };

  const reiniciarJuego = () => {
    setCartas(mezclarCartas());
    setSeleccionadas([]);
    setAcertadas([]);
    setAciertosTotales(0);
  };

  return (
    <div className="container text-center mt-5">
      <h2>Juego de Memoria: busca a RED, KEY, KITTEN, PUPPY, YELLOW y TEDDY</h2>

      {/* Mostrar puntuación */}
      <div className="mb-3">
        <strong>Puntuación general: {puntuacion}</strong>
      </div>

      <button className="btn btn-success mb-4" onClick={reiniciarJuego}>
        Reiniciar
      </button>

      <div className="row justify-content-center">
        {cartas.map((carta, index) => {
          const mostrar = seleccionadas.includes(index) || acertadas.includes(carta.id);
          return (
            <div
              className="col-4 mb-3"
              key={`${carta.id}-${index}`}
              onClick={() => manejarClick(index)}
            >
              <div className="card">
                <img
                  src={mostrar ? carta.src : reversoCart}
                  className="card-img-top"
                  alt="carta de memoria"
                />
              </div>
            </div>
          );
        })}
      </div>

      {acertadas.length === imagenes.length && (
        <div className="alert alert-info mt-4">
          ¡Felicitaciones! Encontraste todas las parejas 🥳
        </div>
      )}
    </div>
  );
}

export default JuegoMemoria;
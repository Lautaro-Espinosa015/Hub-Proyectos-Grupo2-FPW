import React, { useState, useEffect } from "react";
import rojo from "../assets/Img/ImgEnglishGames/ImgMemoria/rojo.jpg";
import llave from "../assets/Img/ImgEnglishGames/ImgMemoria/llave.png";
import gatito from "../assets/Img/ImgEnglishGames/ImgMemoria/gatito.png";
import reversoCart from "../assets/Img/ImgEnglishGames/ImgMemoria/lconoPagina.png"; // es la imagen que se ve cuando la carta está boca abajo

const imagenes = [
  { id: 1, src: rojo },
  { id: 2, src: llave },
  { id: 3, src: gatito },

  
];
const mezclarCartas = () => {    
  const duplicadas = [...imagenes, ...imagenes];
  return duplicadas.sort(() => Math.random() - 0.5);
};

function JuegoMemoria() {
  const [cartas, setCartas] = useState(mezclarCartas());
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [acertadas, setAcertadas] = useState([]);

  useEffect(() => {
    if (seleccionadas.length === 2) {
      const [i1, i2] = seleccionadas;
      if (cartas[i1].id === cartas[i2].id) {
        setAcertadas((prev) => [...prev, cartas[i1].id]);
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
  };

  return (
    <div className="container text-center mt-5">
      <h2> Juego de Memoria: busca a RED , KEY y KITTEN </h2>
      <button className="btn btn-success mb-4" onClick={reiniciarJuego}>
        Reiniciar
      </button>
      <div className="row justify-content-center">
        {cartas.map((carta, index) => {
          const mostrar = seleccionadas.includes(index) || acertadas.includes(carta.id);
          return (
            <div className="col-4 mb-3" key={index} onClick={() => manejarClick(index)}>
              <div className="card">
                <img
                  src={mostrar ? carta.src : reversoCart}
                  className="card-img-top"
                  alt="animal"
                />
              </div>
            </div>
          );
        })}
      </div>
      {acertadas.length === imagenes.length && (
        <div className="alert alert-info mt4">¡Felicitaciones! Encontraste todas las parejas 🥳</div>
      )}
    </div>
  );
}

export default JuegoMemoria;
import React from "react";    
import Saludo from '../components/saludo';
import Colores from '../components/colores';
import Juego from '../components/juego';


function Proyecto4() {
  // Agrupar el contenido en un objeto para mayor claridad y organización.
  // Esto no cambia el resultado final, pero hace el código más mantenible.
  const contenido = {
    saludo: "Hola somos el Grupo 2",
    descripcion: "Compartimos nuestros 3 trabajos",
    trabajo1: "Saludo 1",
    trabajo2: "Adivina el número 2",
    trabajo3: "Colores 3"
  };

  return (
    <div>
      <Saludo saludo={contenido.saludo} compartimos={contenido.descripcion} primero={contenido.trabajo1} segundo={contenido.trabajo2} tercero={contenido.trabajo3} />
      <Colores />
      <hr />
      <Juego />
    </div>
  );
}

export default Proyecto4;
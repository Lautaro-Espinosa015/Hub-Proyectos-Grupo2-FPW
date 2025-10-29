// Este componente muestra el mensaje de retroalimentación
// y, si el usuario ganó, también la cantidad de intentos

function Feedback({ mensaje, ganaste, intentos }) {
  return (
    <div className="feedback">
      {/* Siempre muestra el mensaje actual */}
      <p>{mensaje}</p>

      {/* Si el usuario ganó, muestra los intentos realizados */}
      {ganaste && <p>Intentos realizados: {intentos}</p>}
    </div>
  );
}

export default Feedback;
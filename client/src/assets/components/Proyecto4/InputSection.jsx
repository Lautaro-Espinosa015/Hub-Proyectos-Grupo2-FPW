// Este componente contiene el input para escribir el número
// y los botones "Verificar" y "Me rindo"

function InputSection({ intento, setIntento, verificar, rendirse }) {
  return (
    <div className="input-section">
      {/* Input controlado: su valor viene del estado "intento" */}
      <input
        type="number"
        value={intento}
        onChange={(e) => setIntento(e.target.value)} // Actualiza el estado al escribir
        placeholder="Escribe tu número"
        className="number-input"
      />

      {/* Botón que ejecuta la función verificar */}
      <button onClick={verificar} className="btn primary-btn">
        Verificar
      </button>

      {/* Botón que ejecuta la función rendirse */}
      <button onClick={rendirse} className="btn danger-btn">
        Me rindo
      </button>
    </div>
  );
}

export default InputSection;
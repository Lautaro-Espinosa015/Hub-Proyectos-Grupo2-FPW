import React, { useState } from "react";
import "../Css/formulario.css";

function Formulario() {
  const [personas, setPersonas] = useState([]);

  const agregarPersona = (nuevaPersona) => {
    setPersonas((personasActuales) => [...personasActuales, nuevaPersona]);
  };

  const eliminarPersona = (indexAEliminar) => {
    setPersonas((personasActuales) =>
      personasActuales.filter((_, i) => i !== indexAEliminar)
    );
  };

  const manejarSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const nuevaPersona = {
      nombre: form.nombre.value,
      edad: form.edad.value,
      email: form.email.value,
      genero: form.genero.value,
      pais: form.pais.value,
    };

    agregarPersona(nuevaPersona);
    form.reset();
  };

  return (
    <div className="formulario-container">
      <h1>Formulario</h1>

      <form onSubmit={manejarSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required />

        <label htmlFor="edad">Edad:</label>
        <input type="number" id="edad" name="edad" min="0" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="genero">Género:</label>
        <select id="genero" name="genero" required defaultValue="">
          <option value="" disabled>Seleccione...</option>
          <option value="Femenino">Femenino</option>
          <option value="Masculino">Masculino</option>
          <option value="Otro">Otro</option>
        </select>

        <label htmlFor="pais">País:</label>
        <input type="text" id="pais" name="pais" required />

        <button type="submit">Agregar</button>
      </form>

      <h2>Registros</h2>
      {personas.length === 0 ? (
        <p>No hay registros todavía.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Email</th>
              <th>Género</th>
              <th>País</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personas.map((p, index) => (
              <tr key={index}>
                <td>{p.nombre}</td>
                <td>{p.edad}</td>
                <td>{p.email}</td>
                <td>{p.genero}</td>
                <td>{p.pais}</td>
                <td>
                  <button
                    onClick={() => eliminarPersona(index)}
                    className="btn-eliminar"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Formulario;
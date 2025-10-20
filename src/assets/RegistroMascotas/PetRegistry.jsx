import React, { useState } from 'react';
import "../RegistroMascotas/PetRegistry.css";


function PetRegistry() {
  // 1. GESTIÓN DE DATOS (Equivalente a registro.js)
  // El array 'mascotas' ahora es una pieza de estado de React.
  const [mascotas, setMascotas] = useState([]);
    
  // Las funciones ahora modifican el estado con 'setMascotas'.
  const registrarMascota = (nuevaMascota) => {
    // Usamos una función callback para asegurar que trabajamos con el estado más reciente.
    setMascotas(mascotasActuales => [...mascotasActuales, nuevaMascota]);
  };

  const eliminarMascota = (indiceAEliminar) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta mascota del registro?")) {
      setMascotas(mascotasActuales => 
        mascotasActuales.filter((_, index) => index !== indiceAEliminar)
      );
    }
  };

  // 2. MANEJO DE EVENTOS (Equivalente a index.js)
  const manejarSubmit = (event) => {
    event.preventDefault(); // Prevenimos la recarga de la página
    const form = event.target;
    const nuevaMascota = {
      nombre: form.nombre.value,
      tipo: form.tipo.value,
      edad: form.edad.value,
      dueno: form.dueno.value,
      vacunada: form.vacunada.value === 'Sí',
    };
    registrarMascota(nuevaMascota);
    form.reset(); // Limpiamos el formulario
  };

  // 3. CÁLCULOS Y ESTADÍSTICAS (Equivalente a calculos.js)
  // Esto es "estado derivado". Se calcula en cada renderizado a partir del estado 'mascotas'.
  const totalMascotas = mascotas.length;
  const totalVacunadas = mascotas.filter(m => m.vacunada).length;
  const totalNoVacunadas = totalMascotas - totalVacunadas;

  // 4. RENDERIZADO (Equivalente a index.html y tabla.js)
  // Esta es la parte declarativa. Describimos cómo se debe ver la UI.
  return (
    <div className="pet-registry-container">
      <h1>Registro de Mascotas</h1>

      <form id="formMascota" onSubmit={manejarSubmit}>
        <label htmlFor="nombre">Nombre de la mascota:</label>
        <input type="text" id="nombre" name="nombre" required />

        <label htmlFor="tipo">Tipo:</label>
        <select id="tipo" name="tipo" required defaultValue="">
            <option value="" disabled>Seleccione...</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Conejo">Conejo</option>
            <option value="Pájaro">Pájaro</option>
            <option value="Otro">Otro</option>
        </select>

        <label htmlFor="edad">Edad (años):</label>
        <input type="number" id="edad" name="edad" min="0" required />

        <label htmlFor="dueno">Nombre del dueño:</label>
        <input type="text" id="dueno" name="dueno" required />

        <label>¿Está vacunada?</label>
        <div className="radio-container">
            <input type="radio" id="vacunadaSi" name="vacunada" value="Sí" required />
            <label htmlFor="vacunadaSi">Sí</label>
            <input type="radio" id="vacunadaNo" name="vacunada" value="No" defaultChecked/>
            <label htmlFor="vacunadaNo">No</label>
        </div>
        
        <button type="submit">Registrar Mascota</button>
      </form>
      
      <table id="tablaMascotas">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Edad</th>
                <th>Dueño</th>
                <th>Vacunada</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {mascotas.map((mascota, index) => (
              <tr key={index}>
                <td>{mascota.nombre}</td>
                <td>{mascota.tipo}</td>
                <td>{mascota.edad}</td>
                <td>{mascota.dueno}</td>
                <td>{mascota.vacunada ? 'Sí' : 'No'}</td>
                <td>
                  <button onClick={() => eliminarMascota(index)} className="btn-eliminar">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h4>Estadísticas
        <p id="totalMascotas">Total de mascotas registradas: {totalMascotas}</p>
        <p id="mascotasVacunadas">Número de mascotas vacunadas: {totalVacunadas}</p>
        <p id="mascotasNoVacunadas">Número de mascotas no vacunadas: {totalNoVacunadas}</p>
      </h4>
    </div>
  );
}

export default PetRegistry;

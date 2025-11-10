// Importa el framework Express para crear y gestionar el servidor.
const express = require('express');
// Habilita CORS para todas las rutas (permite solicitudes desde cualquier origen)
const cors = require('cors');
// Crea una instancia de la aplicación Express.
const app = express();

// Habilita CORS para todas las rutas (permite solicitudes desde cualquier origen)
app.use(cors());
// Habilita el middleware para parsear (interpretar) cuerpos de solicitud en formato JSON.
app.use(express.json());

// Ejecuta el archivo de conexión a la base de datos para establecer el enlace con MongoDB Atlas.
require('./conection.js');

// Importa las rutas definidas para la gestión de usuarios.
const usuariosRoutes = require('./routes/users');
// Monta las rutas de usuarios bajo el prefijo '/api/usuarios'. Todas las rutas en 'users.js' empezarán con esto.
app.use('/api/usuarios', usuariosRoutes);

// Define una ruta raíz ('/') para comprobar que el servidor está funcionando.
app.get('/', (req, res) => {
  res.send("Bienvenido");
});

// Define el puerto en el que correrá el servidor. Usa el puerto definido en las variables de entorno o el 5000 por defecto.
const PORT = process.env.PORT || 5000;
// Inicia el servidor y muestra un mensaje en consola indicando el puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
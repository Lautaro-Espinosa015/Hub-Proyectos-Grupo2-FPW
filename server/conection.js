// Importa Mongoose, una librería para modelar datos de MongoDB en Node.js.
const mongoose = require('mongoose');

// Establece la conexión con la base de datos de MongoDB Atlas.
mongoose.connect("mongodb+srv://HUB:HUB2025@hub-proyectos-grupo2.xkzdtr7.mongodb.net/tudiv?appName=Hub-Proyectos-Grupo2");

// Obtiene el objeto de la conexión para poder escuchar eventos.
const objeto = mongoose.connection;

// Define un listener para el evento 'connected'. Se dispara cuando la conexión es exitosa.
objeto.on('connected',()=>{
    console.log("SERVIDOR FUNCANDO");
});
// Define un listener para el evento 'error'. Se dispara si ocurre un error en la conexión.
objeto.on('error',()=>{
    console.log("error de conexion");
});

// Exporta la instancia de Mongoose para que pueda ser utilizada en otras partes de la aplicación (como en server.js).
module.exports = mongoose;
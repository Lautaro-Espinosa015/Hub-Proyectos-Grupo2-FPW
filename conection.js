const mongoose = require('mongoose');

mongoose.connect

("mongodb+srv://HUB:HUB2025@hub-proyectos-grupo2.xkzdtr7.mongodb.net/?retryWrites=true&w=majority&appName=Hub-Proyectos-Grupo2");

const objeto = mongoose.connection;

objeto.on('connected',()=> {
    console.log("Conectado a la base de datos");
});

objeto.on ('error',()=>{
    console.log ("Error de conexion, es culpa de Pappalardo");
});

module.exports = mongoose;

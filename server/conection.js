const mongoose = require('mongoose');
mongoose.connect

("mongodb+srv://HUB:HUB2025@hub-proyectos-grupo2.xkzdtr7.mongodb.net/tudiv?appName=Hub-Proyectos-Grupo2");

const objeto = mongoose.connection;

objeto.on('connected',()=>{
    console.log("conectado a la base de datos");
});
objeto.on('error',()=>{
    console.log("error de conexion");
});

module.exports = mongoose;
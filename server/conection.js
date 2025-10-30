const mongoose = require('mongoose');
mongoose.connect

("mongodb+srv://HUB:HUB2025@hub-proyectos-grupo2.xkzdtr7.mongodb.net/?appName=Hub-Proyectos-Grupo2");

const objeto = mongoose.connection;


objeto.on('connected',()=>{
    console.log("conectado");
});

objeto.on('error',()=>{
    console.log("error");
});

module.exports = mongoose;

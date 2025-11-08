const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.end("Bienvenido");
});

//routing
const archivosDB = require('./conection.js');
const usuarios = require('./model/usuarios.js');

//middle
app.use('/api', usuarios);

//list

app.listen(5000,()=>{
        console.log("servidor funcando");
});
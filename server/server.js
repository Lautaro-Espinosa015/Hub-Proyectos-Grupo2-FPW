const express = require('express');
const app = express();


app.get('/',(req,res)=>{
    res.end("Bienvenido");
});

const archivosDB = require('./conection');


app.listen(5000,()=>{
    console.log("servidor funciona");
});
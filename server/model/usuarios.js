const express = require('express');
const routes = express.Router();

//modelo de datos

const mongoose = require('mongoose');
const esquema = mongoose.Schema;

const esquemaUsuario = new esquema({
    username: String,
    password: String,
    rol: String,
    name: String
});

const listaUsuarios = mongoose.model('users', esquemaUsuario);

//rutas

routes.get('/obtenerUsuarios', async (req,res)=>{
    try {
        const docs = await listaUsuarios.find();
        res.send(docs);
    } catch (error) {
        console.error("Error al obtener usuario");
        res.status(500).send("Error al obtener usuario");
        
        
    }
});

module.exports = routes;
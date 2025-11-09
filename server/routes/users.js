const express = require('express');
const routes = express.Router();
const listaUsuarios = require('../model/usuarios');

// Obtener todos los usuarios
routes.get('/obtenerUsuarios', async (req, res) => {
  try {
    const docs = await listaUsuarios.find({}, { password: 0 }); // No devolver password
    res.send(docs);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send({ message: "Error interno del servidor", error });
  }
});

// Registro
routes.post('/register', async (req, res) => {
  const { username, password, email, rol } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  try {
    const nuevoUsuario = new listaUsuarios({ username, password, email, rol });
    await nuevoUsuario.save();
    res.json({ success: true, message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ success: false, message: "Error interno", error });
  }
});

// Login
routes.post('/login', async (req, res) => {
  console.log("Body recibido:", req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  try {
    const user = await listaUsuarios.findOne({ username });
    if (!user) return res.json({ success: false, message: 'Usuario no encontrado' });

    if (user.password !== password) {
      return res.json({ success: false, message: 'Contraseña incorrecta' });
    }

    const { password: _, ...userData } = user.toObject();
    res.json({ success: true, user: userData });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ success: false, message: 'Error interno', error });
  }
});

module.exports = routes;
const express = require('express');
const routes = express.Router();
const listaUsuarios = require('../model/usuarios');
const bcrypt = require('bcryptjs'); // Importamos bcrypt para hashear contraseñas

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
  // 1. Obtenemos 'nivel' del cuerpo de la petición
  const { username, password, email, rol, nivel } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  try {
    // 2. Hasheamos la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Creamos el usuario con la contraseña hasheada y el nivel
    const nuevoUsuario = new listaUsuarios({
      username,
      password: hashedPassword,
      email,
      rol,
      nivel
    });

    await nuevoUsuario.save();
    res.json({ success: true, message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error en registro:", error);
    if (error.code === 11000) { // Error de clave duplicada (username o email ya existen)
      return res.status(400).json({ success: false, message: 'El nombre de usuario o el correo ya existen.' });
    }
    res.status(500).json({ success: false, message: "Error interno del servidor", error });
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

    // 4. Comparamos la contraseña enviada con la hasheada en la BD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
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
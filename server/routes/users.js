// Importa Express para crear las rutas y bcrypt para el hasheo de contraseñas.
const express = require('express');
const routes = express.Router();
const listaUsuarios = require('../model/usuarios');
const bcrypt = require('bcryptjs'); // Importamos bcrypt para hashear contraseñas

// Endpoint para OBTENER TODOS LOS USUARIOS.
routes.get('/obtenerUsuarios', async (req, res) => {
  try {
    // Busca todos los usuarios en la base de datos.
    // El segundo argumento `{ password: 0 }` excluye el campo 'password' de los resultados por seguridad.
    const docs = await listaUsuarios.find({}, { password: 0 });
    res.send(docs);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send({ message: "Error interno del servidor", error });
  }
});

// Endpoint para REGISTRAR un nuevo usuario.
routes.post('/register', async (req, res) => {
  // 1. Extraemos los datos del cuerpo de la solicitud.
  const { username, password, email, rol, nivel } = req.body;
  // Validamos que los campos esenciales no estén vacíos.
  if (!username || !password || !email) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  try {
    // 2. Generamos un 'salt' (una cadena aleatoria) para fortalecer el hasheo.
    const salt = await bcrypt.genSalt(10);
    // Hasheamos la contraseña del usuario junto con el salt.
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Creamos una nueva instancia del modelo de usuario con los datos recibidos y la contraseña hasheada.
    const nuevoUsuario = new listaUsuarios({
      username,
      password: hashedPassword,
      email,
      rol,
      nivel // El nivel se asigna durante el registro (0 para normal, 1-3 para student).
    });

    // 4. Guardamos el nuevo usuario en la base de datos.
    await nuevoUsuario.save();
    res.json({ success: true, message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error en registro:", error);
    // Manejamos el error de clave duplicada (código 11000 de MongoDB).
    if (error.code === 11000) { // Error de clave duplicada (username o email ya existen)
      return res.status(400).json({ success: false, message: 'El nombre de usuario o el correo ya existen.' });
    }
    // Para otros errores, enviamos una respuesta de error genérica.
    res.status(500).json({ success: false, message: "Error interno del servidor", error });
  }
});

// Endpoint para INICIAR SESIÓN.
routes.post('/login', async (req, res) => {
  console.log("Body recibido:", req.body);
  const { username, password } = req.body;
  // Validamos que los datos no estén vacíos.
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  try {
    // 1. Buscamos al usuario por su 'username' en la base de datos.
    const user = await listaUsuarios.findOne({ username });
    if (!user) return res.json({ success: false, message: 'Usuario no encontrado' });

    // 2. Comparamos la contraseña enviada en texto plano con la contraseña hasheada almacenada en la BD.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Contraseña incorrecta' });
    }

    // 3. Si la contraseña es correcta, preparamos los datos del usuario para enviarlos al cliente.
    // Excluimos la contraseña del objeto que se envía como respuesta por seguridad.
    const { password: _, ...userData } = user.toObject();
    res.json({ success: true, user: userData });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ success: false, message: 'Error interno', error });
  }
});

// PUT /api/usuarios/update-score
// Acumula el puntaje para un usuario y devuelve el usuario actualizado.
routes.put('/update-score', async (req, res) => {
  const { userId, points } = req.body;

  if (!userId || points === undefined) {
    return res.status(400).json({ success: false, message: 'Se requiere userId y points.' });
  }

  try {
    // Usamos $inc para sumar el valor de 'points' al campo 'puntaje' existente.
    // { new: true } asegura que MongoDB nos devuelva el documento ya actualizado.
    const updatedUser = await listaUsuarios.findByIdAndUpdate(
      userId,
      { $inc: { puntaje: points } },
      { new: true }
    ).select('-password'); // Excluimos el password del objeto que se devuelve

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
    }

    // Devolvemos el usuario completo y actualizado para que el frontend pueda sincronizar su estado.
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error al actualizar el puntaje:', error);
    res.status(500).json({ success: false, message: 'Error del servidor.' });
  }
});

// Exportamos las rutas para que puedan ser usadas por 'server.js'.
module.exports = routes;
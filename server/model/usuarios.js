// Importa Mongoose para definir el esquema.
const mongoose = require('mongoose');

// Define la estructura (esquema) para los documentos de la colección de usuarios.
const esquemaUsuario = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'], // Campo obligatorio.
    unique: true, // Asegura que cada nombre de usuario sea único en la colección.
    trim: true // Elimina espacios en blanco al inicio y al final del valor.
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true // Convierte el email a minúsculas para estandarizarlo y evitar duplicados (ej: 'Test@test.com' y 'test@test.com').
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'] // La contraseña es obligatoria.
  },
  rol: {
    type: String,
    required: true,
    enum: ['admin', 'student', 'normal'], // El rol solo puede ser uno de estos tres valores.
    default: 'normal' // Si no se proporciona un rol al crear un usuario, se le asigna 'normal' por defecto.
  },
  nivel: {
    type: Number,
    default: 0 // Nivel de inglés del estudiante. 0 para usuarios normales o estudiantes sin nivel asignado.
  },
  puntaje: {
    type: Number,
    default: 0 // Puntaje acumulado en los juegos, por defecto es 0.
  }
});


module.exports = mongoose.model('users', esquemaUsuario);
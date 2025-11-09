const mongoose = require('mongoose');

const esquemaUsuario = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    unique: true,
    trim: true // Elimina espacios en blanco al inicio y al final
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true // Guarda los correos en minúsculas para evitar duplicados
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  rol: {
    type: String,
    required: true,
    default: 'normal' // Si no se especifica, será 'normal'
  },
  nivel: {
    type: Number,
    default: 0 // El nivel 0 puede ser para usuarios normales o estudiantes sin nivel
  },
  puntaje: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('users', esquemaUsuario);
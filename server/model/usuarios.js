const mongoose = require('mongoose');

const esquemaUsuario = new mongoose.Schema({
  username: String,
  password: String,
  rol: String,
  name: String,
  email: String,
  puntaje: Number
});

module.exports = mongoose.model('users', esquemaUsuario);
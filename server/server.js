const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
require('./conection.js');

// Rutas
const usuariosRoutes = require('./routes/users');
app.use('/api/usuarios', usuariosRoutes);

app.get('/', (req, res) => {
  res.send("Bienvenido");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
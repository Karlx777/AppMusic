const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String },
    correo: { type: String},
    contrasena: { type: String},
    rol: { type: String},
    imagen: { type: String}
})
const Usuario = mongoose.model('usuario', usuarioSchema);
module.exports = Usuario;
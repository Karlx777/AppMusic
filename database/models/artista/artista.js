const mongoose = require('mongoose');
const artistaSchema = new mongoose.Schema({
    nombre: { type: String },
    descripcion: { type: String },
    imagen: { type: String}
})
const Artista = mongoose.model('artista', artistaSchema);
module.exports = Artista;
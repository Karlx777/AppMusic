const mongoose = require('mongoose');
const { Schema } = require('../../mongoose');

const albumSchema = new mongoose.Schema({
    titulo: { type: String },
    descripcion: { type: String },
    anio: { type: String},
    imagen: { type: String},
    artistaID: { type: Schema.ObjectId, ref: "artista" }
})
const Album = mongoose.model('album', albumSchema);
module.exports = Album;
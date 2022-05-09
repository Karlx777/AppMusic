const mongoose = require('mongoose');
const { Schema } = require('../../mongoose');
const musicaSchema = new mongoose.Schema({
    numero: { type: String },
    nombre: { type: String },
    duracion: { type: String},
    archivo: { type: String},
    favorito: {type: Boolean},
    albumID: { type: Schema.ObjectId, ref: "album" }
})
const Musica = mongoose.model('musica', musicaSchema);
module.exports = Musica;
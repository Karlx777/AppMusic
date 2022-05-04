const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
var bodyParser = require('body-parser');
const Usuario = require("./database/models/usuario/usuario");
const Artista = require("./database/models/artista/artista");

// configuracion cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
// creacion de un usuario modo test
// const user = new Usuario({ nombre: 'test1'});
// user.save();
// rutas
app.get('/usuarios', (req, res) => {
    Usuario.find({})
        .then((list) => {res.send(list); console.log(list)})
        .catch( (error) => {console.log(error)});
})

app.post('/usuarios', (req, res) => {
    Usuario.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})

app.put('/usuarios/:id', (req, res) => {
    Usuario.findOneAndUpdate(
        { nombre: req.params.id },
        {
            $set: {
                nombre: req.body.nombre,
                correo: req.body.correo,
                contrasena: req.body.contrasena,
                rol: req.body.rol,
                imagen: req.body.imagen
            }
        },
        {
            upsert: true
        }
    ).then((result) => {res.json('Updated') })
        .catch(error => console.error(error))

})

app.delete('/usuarios/:id', (req, res) => {
    Usuario.deleteOne(
        { nombre: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})

app.get('/getArtista', (req, res) => {
    Artista.find({})
        .then((list) => {res.send(list); console.log(list)})
        .catch( (error) => {console.log(error)});
})

app.listen( 3000, () => {
    console.log('iniciando server en puerto 3000');
});
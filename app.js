const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
var bodyParser = require('body-parser');
const Usuario = require("./database/models/usuario/usuario");
const Artista = require("./database/models/artista/artista");
const Album = require("./database/models/album/album");
const Musica = require('./database/models/musica/musica');
const { Schema } = require('./database/mongoose');

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

// CRUD ARTISTA
app.get('/getArtista', (req, res) => {
    Artista.find({})
        .then((list) => {res.send(list); console.log(list)})
        .catch( (error) => {console.log(error)});
})

app.post('/postArtista', (req, res) => {
    Artista.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})

app.put('/putArtista/:id', (req, res) => {
    Artista.findOneAndUpdate(
        { nombre: req.params.id },
        {
            $set: {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                imagen: req.body.imagen
            }
        },
        {
            upsert: true
        }
    ).then((result) => {res.json('Updated') })
        .catch(error => console.error(error))

})

app.delete('/artistas/:id', (req, res) => {
    Artista.deleteOne(
        { nombre: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})

// CRUD ALBUM
app.get('/getAlbums', (req, res) => {
    Album.find({})
        .then((list) => {res.send(list); console.log(list)})
        .catch( (error) => {console.log(error)});
})

app.post('/postAlbums', (req, res) => {
    Album.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})

app.put('/putAlbums/:id', (req, res) => {
    Album.findOneAndUpdate(
        { titulo: req.params.id },
        {
            $set: {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                anio: req.body.anio,
                imagen: req.body.imagen,
                artistaID: req.body.artistaID
            }
        },
        {
            upsert: true
        }
    ).then((result) => {res.json('Updated') })
        .catch(error => console.error(error))
})

app.delete('/albums/:id', (req, res) => {
    Album.deleteOne(
        { titulo: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})
// 
//Musica
app.get('/getMusica', (req, res) => {
    Musica.find({})
        .then((list) => {res.send(list); console.log(list)})
        .catch( (error) => {console.log(error)});
})

app.post('/postMusica', (req, res) => {
    Musica.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})

app.put('/putMusica/:id', (req, res) => {
    Musica.findOneAndUpdate(
        { nombre: req.params.id },
        {
            $set: {
                numero: req.body.numero,
                nombre: req.body.nombre,
                duracion: req.body.duracion,
                archivo: req.body.archivo,
                albumID: req.body.albumID
            }
        },
        {
            upsert: true
        }
    ).then((result) => {res.json('Updated') })
        .catch(error => console.error(error))

})

app.delete('/deletMusica/:id', (req, res) => {
    Mus.deleteOne(
        { nombre: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})
// consultas

app.get('/artistaAlbum/:id', (req, res) => {
    Musica.find({artistaID: req.params.id})
        .populate('albumID')        
        .then((list) => {res.send(list); console.log(list)})
        .catch( (error) => {console.log(error)});
})


app.listen( 3000, () => {
    console.log('iniciando server en puerto 3000');
});
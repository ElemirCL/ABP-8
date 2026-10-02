const express = require('express');
const hbs = require('hbs');
const { registrarVisita } = require('./src/helpers/gestorLog');
const router = require('./src/routes/router');
const app = express();

// Configuración de Handlebars
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.set('views', './views');

// Middleware para registrar visitas
app.use((req, res, next) => {
    registrarVisita(req.path);
    next();
});

app.use(express.json());

// Servir contenido estático
app.use(express.static('public'));

// Conectar las rutas
app.use('/', router);

// Middleware para capturar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal');
});



module.exports = app;
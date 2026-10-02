const express = require('express');
const router = express.Router();
const crud = require('../controllers/usuarioController')
const orm = require('../models/usuario')

const validarId = require('../middlewares/validarId');
const validarUsuario = require('../middlewares/validarUsuario');
const validarCorreo = require('../middlewares/validarCorreo');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/status', (req, res) => {
    res.render('status', {
        status: 'OK',
        message: 'El servidor está funcionando correctamente.'
    });
});

router.get('/saludo', (req, res) => {
    res.send('<h1>Bienvenidos a ruta pública con respuesta en HTML</h1>');
});

//endpoints usuarios
router.get('/api/usuarios', crud.mostrarUsuarios);
router.get('/api/usuarios/:id',validarId, crud.mostrarUsuariosPorId);
router.put('/api/usuarios/:id',validarId, validarUsuario, crud.actualizarUsuario)
router.patch('/api/usuarios/:id',validarId, validarCorreo, crud.actualizarCorreo);
router.delete('/api/usuarios/:id',validarId, crud.eliminarUsuario);
router.post('/api/usuarios',validarUsuario, crud.crearUsuario);
router.get('/api/listaORM', orm.listarUsuarios);

//endpoints pedidos
router.get('/api/usuarios/:idUsuario/pedidos', orm.mostrarPedidosUsuario);
router.post('/api/pedidos',orm.crearPedido);


module.exports = router;
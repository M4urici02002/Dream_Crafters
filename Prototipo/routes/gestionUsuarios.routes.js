const express = require('express');
const router = express.Router();

const path = require('path');

const isAuth = require('../util/is-auth');

const gestionUsuariosController= require('../controllers/gestionUsuarios.controller');
router.get('/gestionUsuarios', isAuth, gestionUsuariosController.get_usuarioRegistrado);
router.get('/gestionUsuarios/buscar/:valor_busqueda', isAuth, gestionUsuariosController.get_buscar);



// Ruta para eliminar un usuario
router.post('/gestionUsuarios/eliminar', isAuth, gestionUsuariosController.post_eliminar);

module.exports = router;
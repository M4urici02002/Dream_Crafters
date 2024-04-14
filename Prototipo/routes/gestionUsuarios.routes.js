const express = require('express');
const router = express.Router();

const path = require('path');

const isAuth = require('../util/is-auth');

const gestionUsuariosController= require('../controllers/gestionUsuarios.controller');
router.get('/gestionUsuarios', isAuth, gestionUsuariosController.get_usuarioRegistrado);


// Ruta para eliminar un usuario
router.post('/gestionUsuarios/eliminar', isAuth, gestionUsuariosController.post_eliminar);

module.exports = router;
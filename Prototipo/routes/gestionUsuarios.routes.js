const express = require('express');
const router = express.Router();

const path = require('path');

const isAuth = require('../util/is-auth');

const gestionUsuariosController= require('../controllers/gestionUsuarios.controller');
router.get('/gestionUsuarios', isAuth, gestionUsuariosController.get_usuarioRegistrado);
// Ruta para eliminar un usuario
router.post('/gestionUsuarios/eliminar', isAuth, gestionUsuariosController.post_eliminar);


// Modificar usuarios
router.get('/modificarUsuarios/:username', isAuth, gestionUsuariosController.get_modificarUsuario);
router.post('/modificarUsuarios', isAuth, gestionUsuariosController.post_modificarUsuario);

module.exports = router;
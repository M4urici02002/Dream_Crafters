const express = require('express');
const router = express.Router();

const path = require('path');

const isAuth = require('../util/is-auth');

const gestionUsuariosController= require('../controllers/gestionUsuarios.controller');
router.get('/gestionUsuarios', isAuth, gestionUsuariosController.get_usuarioRegistrado);
router.get('/gestionUsuarios/crearUsuario', isAuth, gestionUsuariosController.get_crearUsuario);
router.post('/gestionUsuarios/crearUsuario', isAuth, gestionUsuariosController.post_crearUsuario);

// Ruta para eliminar un usuario                          //borrar isAuth si no jala
router.delete('/gestionUsuarios/eliminarUsuario/:username', isAuth, gestionUsuariosController.eliminarUsuario);

module.exports = router;
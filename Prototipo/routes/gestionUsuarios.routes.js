const express = require('express');
const router = express.Router();

const path = require('path');

const isAuth = require('../util/is-auth');

const gestionUsuariosController= require('../controllers/gestionUsuarios.controller');
router.get('/gestionUsuarios', isAuth, gestionUsuariosController.get_usuarioRegistrado);


// Ruta para eliminar un usuario                          //borrar isAuth si no jala
router.delete('/gestionUsuarios/eliminarUsuario/:username', isAuth, gestionUsuariosController.eliminarUsuario);

module.exports = router;
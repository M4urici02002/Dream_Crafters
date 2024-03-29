const express = require('express');
const router = express.Router();

const path = require('path');

const gestionUsuariosController= require('../controllers/gestionUsuarios.controller');
router.get('/gestionUsuarios', gestionUsuariosController.get_usuarioRegistrado);
router.get('/gestionUsuarios/crearUsuario', gestionUsuariosController.get_crearUsuario);
router.post('/gestionUsuarios/crearUsuario', gestionUsuariosController.post_crearUsuario);

// Ruta para eliminar un usuario
router.delete('/gestionUsuarios/eliminarUsuario/:username', gestionUsuariosController.eliminarUsuario);

module.exports = router;
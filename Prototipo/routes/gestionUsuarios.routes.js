const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const gestionUsuariosController= require('../controllers/gestionUsuarios.controller');

router.get('/gestionUsuarios', isAuth, gestionUsuariosController.getUsuarioRegistrado);
router.get('/gestionUsuarios/buscar/:valor_busqueda', isAuth, gestionUsuariosController.getBuscar);
router.get('/gestionUsuarios/buscar/', isAuth, gestionUsuariosController.getBuscar);
router.post('/gestionUsuarios/eliminar', isAuth, gestionUsuariosController.postEliminar);

module.exports = router;
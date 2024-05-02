const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canAdmin = require('../util/canAdmin');

const gestionUsuariosController= require('../controllers/gestionUsuarios.controller');

router.get('/gestionUsuarios', isAuth, canAdmin, gestionUsuariosController.getUsuarioRegistrado);
router.get('/gestionUsuarios/buscar/:valor_busqueda', isAuth, canAdmin, gestionUsuariosController.getBuscar);
router.get('/gestionUsuarios/buscar/', isAuth, canAdmin, gestionUsuariosController.getBuscar);
router.post('/gestionUsuarios/eliminar', isAuth, canAdmin, gestionUsuariosController.postEliminar);

module.exports = router;
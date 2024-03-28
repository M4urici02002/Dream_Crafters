const express = require('express');
const router = express.Router();

const path = require('path');

const gestionUsuariosController= require('../controllers/gestionUsuarios.controller');
router.get('/', gestionUsuariosController.get_usuarioRegistrado);

module.exports = router;








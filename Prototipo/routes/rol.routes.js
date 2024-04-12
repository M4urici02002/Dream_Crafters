const express = require('express');
const router = express.Router();

const rolController = require('../controllers/rol.controller');
const isAuth = require('../util/is-auth');

// Ruta para mostrar el formulario de creación de rol
router.get('/gestionRol/crearRol', isAuth, rolController.get_crearRol);

// Ruta para manejar la creación de un nuevo rol
router.post('/gestionRol/crearRol', isAuth, rolController.post_crearRol);

module.exports = router;

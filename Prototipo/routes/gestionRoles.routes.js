const express = require('express');
const router = express.Router();

const path = require('path');
 
const isAuth = require('../util/is-auth');

const gestionRolesController= require('../controllers/gestionRoles.controller');
router.get('/gestionRoles', isAuth, gestionRolesController.get_gestionRoles);

// Eliminar rol con verificación de asignaciones
router.post('/gestionRoles/eliminar', isAuth, gestionRolesController.verificarAsignacion);

module.exports = router;
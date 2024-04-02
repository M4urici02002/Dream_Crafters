const express = require('express');
const router = express.Router();

const path = require('path');

const gestionRolesController= require('../controllers/gestionRoles.controller');
router.get('/gestionRoles', gestionRolesController.get_gestionRoles);
router.get('/gestionRoles/crearRol', gestionRolesController.get_crearRol);


module.exports = router;
const express = require('express');
const router = express.Router();

const path = require('path');

const isAuth = require('../util/is-auth');

const gestionRolesController= require('../controllers/gestionRoles.controller');
router.get('/gestionRoles', isAuth, gestionRolesController.get_gestionRoles);

// router.get('/gestionRoles/crearRol', isAuth, gestionRolesController.get_crearRol);


module.exports = router;
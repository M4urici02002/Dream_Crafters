const express = require('express');
const router = express.Router();

const path = require('path');

const isAuth = require('../util/is-auth');

const gestionRolesController= require('../controllers/gestionRoles.controller');
router.get('/gestionRoles', isAuth, gestionRolesController.get_gestionRoles);

// Eliminar rol
router.post('/gestionRoles/eliminar', isAuth, gestionRolesController.post_eliminar);

module.exports = router;
const express = require('express');
const router = express.Router();
const path = require('path');
const isAuth = require('../util/is-auth');
const canAdmin = require('../util/canAdmin');
const gestionRolesController= require('../controllers/gestionRoles.controller');

router.get('/gestionRoles', isAuth, canAdmin, gestionRolesController.get_gestionRoles);
router.post('/gestionRoles/eliminar', isAuth, canAdmin, gestionRolesController.verificarAsignacion);

module.exports = router;

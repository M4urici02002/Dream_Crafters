const express = require('express');
const router = express.Router();
const path = require('path');

const miPerfilController= require('../controllers/miPerfil.controller');
router.get('/', miPerfilController.get_miPerfil);

module.exports = router;
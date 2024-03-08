const express = require('express');
const router = express.Router();
const path = require('path');

<<<<<<< HEAD
router.get('/', (request, response, next) => {
    response.render('miPerfil');
});
=======
const miPerfilController= require('../controllers/miPerfil.controller');
router.get('/', miPerfilController.get_miPerfil);
>>>>>>> Mau/miPerfil

module.exports = router;
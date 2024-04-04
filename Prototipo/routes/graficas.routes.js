const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const graficasController = require('../controllers/graficas.controller'); // Asegúrate de tener este archivo y función.

router.get('/', isAuth, (request, response, next) => {
    response.render('graficas', {
         permisos: request.session.permisos || [],
    });
});

// Nueva ruta para calificación por estrellas
router.get('/calificacionEstrellas', isAuth, graficasController.calificacionEstrellas);

module.exports = router;

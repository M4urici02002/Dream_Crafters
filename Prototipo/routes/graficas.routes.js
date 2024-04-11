const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const graficasController = require('../controllers/graficas.controller');

// Ruta principal de 'graficas'
router.get('/', isAuth, (request, response, next) => {
    response.render('graficas', {
         permisos: request.session.permisos || [],
    });
});

// Ruta unificada para calificación por estrellas, categorías y productos
router.get('/calificacionEstrellas', isAuth, graficasController.calificacionEstrellas);
router.get("/productosPorCategoria", isAuth, graficasController.productosPorCategoria);
module.exports = router;

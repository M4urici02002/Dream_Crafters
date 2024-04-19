const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');

const configuracionController = require('../controllers/configuracion.controller');

// Ruta GET para mostrar el formulario de configuración de contraseña
router.get('/miPerfil/configuracion', isAuth, configuracionController.get_configuracion);
router.post('/miPerfil/configuracion', isAuth, configuracionController.post_configuracion);

// Agregar respuesta a ruta raiz
router.get('/', isAuth, (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        username: request.session.username || '',
        registro: false,
        csrfToken: request.csrfToken(),
        error: error,
        permisos: request.session.permisos || [],
    });
});


module.exports = router;

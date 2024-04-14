const express = require('express');
const router = express.Router();

const rolController = require('../controllers/rol.controller');
const isAuth = require('../util/is-auth');

router.get('/gestionRoles/crearRol', isAuth, rolController.get_crearRol);
router.post('/gestionRoles/crearRol', isAuth, rolController.post_crearRol);

// Agregar respuesta a ruta raiz
router.get('/', isAuth, (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        nombreRol: request.session.nombreRol || '',
        registro: false,
        csrfToken: request.csrfToken(),
        error: error,
        permisos: request.session.permisos || [],
    });
});

module.exports = router;
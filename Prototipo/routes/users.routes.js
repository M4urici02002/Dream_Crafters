const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');
const isAuth = require('../util/is-auth');

router.get('/login', usersController.getLogin);
router.post('/login', usersController.postLogin);
router.get('/logout', usersController.getLogout);

router.get('/gestionUsuarios/crearUsuario', isAuth, usersController.getCrearUsuario);
router.post('/gestionUsuarios/crearUsuario', isAuth, usersController.postCrearUsuario);


// Modificar usuarios
router.get('/modificarUsuarios/:username', isAuth, usersController.getModificarUsuario);
router.post('/modificarUsuarios', isAuth, usersController.postModificarUsuario);

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
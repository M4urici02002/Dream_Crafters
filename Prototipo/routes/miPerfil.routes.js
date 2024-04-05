const express = require('express');

const router = express.Router();
const isAuth = require('../util/is-auth');
router.get('/', isAuth, (request, response, next) => {
    response.render('miPerfil',{
        permisos: request.session.permisos || [],
        username: request.session.username || '',
        nombre: request.session.nombre || '',
        nombre_rol: request.session.rol || '', 

    });
});

module.exports = router;
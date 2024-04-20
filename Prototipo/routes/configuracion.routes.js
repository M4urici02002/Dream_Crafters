const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');

const configuracionController = require('../controllers/configuracion.controller');

// Modificar contraseña
router.get('/', isAuth, configuracionController.get_configuracion);
router.post('/', isAuth, configuracionController.post_configuracion);

router.get('/', isAuth, (request, response, next) => {
    response.render('configuracion',{
        permisos: request.session.permisos || [],
    }
    );
});

module.exports = router;

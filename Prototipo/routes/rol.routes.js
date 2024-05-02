const express = require('express');
const router = express.Router();

const rolController = require('../controllers/rol.controller');
const isAuth = require('../util/is-auth');
const canAdmin = require('../util/canAdmin');

router.get('/gestionRoles/crearRol', isAuth, canAdmin, rolController.get_crearRol);
router.post('/gestionRoles/crearRol', isAuth, canAdmin, rolController.post_crearRol);

router.get('/editarRol/:nombreRol', isAuth, canAdmin, rolController.get_editarRol);
router.post('/editarRol', isAuth, canAdmin, rolController.post_editarRol);

// Agregar respuesta a ruta raíz
router.get('/', isAuth, (req, res, next) => {
    const error = req.session.error || '';
    req.session.error = '';
    res.render('login', {
        nombre: req.session.nombre || '',
        registro: false,
        csrfToken: req.csrfToken(),
        error: error,
        permisos: req.session.permisos || [],
        privilegios: req.session.privilegios || '',
    });
});

module.exports = router;

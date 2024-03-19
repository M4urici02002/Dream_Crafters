const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canView = require('../util/canView');
const canCreate = require('../util/canCreate');
const canEdit = require('../util/canEdit');



const productosController = require('../controllers/productos.controller');

router.get('/agregarProducto', isAuth, canCreate, productosController.get_agregarProducto);
router.post('/agregarProducto', isAuth, canCreate, productosController.post_agregarProducto);
router.get('/editar/:IDProducto', isAuth, canEdit, productosController.get_editar);
router.post('/editar', isAuth, canEdit, productosController.post_editar);
router.get('/catalogo/:IDProducto', isAuth, canView, productosController.get_catalogo);
router.get('/catalogo', isAuth, canView, productosController.get_catalogo);


// Agregar respuesta a ruta raiz
router.get('/', isAuth, (request, response, next) => {
    response.render('pagInicio', {
        username: request.session.username || '',
        permisos: request.session.permisos || [],
    });
});

module.exports = router;
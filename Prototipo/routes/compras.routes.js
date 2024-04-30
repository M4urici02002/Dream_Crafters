const express = require('express');
const router = express.Router();

const comprasController = require('../controllers/compras.controller');
const isAuth = require('../util/is-auth');

router.get('/catalogoCompras', isAuth, comprasController.get_catalogoCompras);
router.post('/catalogoCompras/enviarCorreo', comprasController.post_emailForm);

module.exports = router;
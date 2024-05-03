const express = require('express');
const router = express.Router();

const comprasController = require('../controllers/compras.controller');
const isAuth = require('../util/is-auth');
const canCrm = require('../util/canCrm');


router.get('/catalogoCompras', isAuth, canCrm, comprasController.get_catalogoCompras);
router.post('/catalogoCompras/enviarCorreo', isAuth, canCrm, comprasController.post_emailForm);
router.post('/catalogoCompras/guardarDatosEncuesta', isAuth, canCrm, comprasController.post_guardarDatosEncuesta);

module.exports = router;
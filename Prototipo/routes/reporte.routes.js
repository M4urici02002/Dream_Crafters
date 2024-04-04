const express = require('express');
const router = express.Router();

const reporteController = require('../controllers/reporte.controller');
const isAuth = require('../util/is-auth');

router.get('/', isAuth, reporteController.descargarImagen);

module.exports = router;

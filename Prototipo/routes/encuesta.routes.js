const express = require('express');
const router = express.Router();

const encuestasController = require('../controllers/encuesta.controller');
const isAuth = require('../util/is-auth');

router.get('/catalogoEncuestas', isAuth, encuestasController.get_catalogoEncuestas);

module.exports = router;
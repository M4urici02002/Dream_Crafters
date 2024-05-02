const express = require('express');
const router = express.Router();

const encuestasController = require('../controllers/encuesta.controller');
const isAuth = require('../util/is-auth');
const canCrm = require('../util/canCrm');


router.get('/catalogoEncuestas', isAuth, canCrm, encuestasController.get_catalogoEncuestas);

module.exports = router;
const express = require('express');
const router = express.Router();
const path = require('path');

const isAuth = require('../util/is-auth');

const resenaController= require('../controllers/resena.controller');
router.get('/resena', isAuth, resenaController.get_resena);
router.post('/resena/actualizarVisibilidad', isAuth, resenaController.post_actualizarVisibilidad);

module.exports = router;
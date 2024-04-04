const express = require('express');
const router = express.Router();

const graficasController = require('../controllers/graficas.controller');
const isAuth = require('../util/is-auth');

router.get('/', isAuth, graficasController.get_graficas);

module.exports = router;

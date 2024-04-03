const express = require('express');
const router = express.Router();
const path = require('path');

const isAuth = require('../util/is-auth');

const resenaController= require('../controllers/resena.controller');
router.get('/', isAuth, resenaController.get_resena);

module.exports = router;
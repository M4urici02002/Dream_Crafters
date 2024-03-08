const express = require('express');
const router = express.Router();
const path = require('path');

const resenaController= require('../controllers/resena.controller');
router.get('/', resenaController.get_resena);

module.exports = router;
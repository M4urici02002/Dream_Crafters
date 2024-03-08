const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/miPerfil', (request, response, next) => {
    response.render('miPerfil');
});

module.exports = router;
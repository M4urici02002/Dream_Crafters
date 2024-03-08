const express = require('express');

const router = express.Router();

router.get('/miPerfil', (request, response, next) => {
    response.render('miPerfil');
});

module.exports = router;
const express = require('express');

const router = express.Router();

router.get('/', (request, response, next) => {
    response.render('editarRol');
});

module.exports = router;
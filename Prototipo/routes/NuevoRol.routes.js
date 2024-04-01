const express = require('express');

const router = express.Router();

router.get('/', (request, response, next) => {
    response.render('NuevoRol');
});

module.exports = router;
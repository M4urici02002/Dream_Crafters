const express = require('express');

const router = express.Router();

router.get('/', (request, response, next) => {
    response.render('resena');
});

module.exports = router;
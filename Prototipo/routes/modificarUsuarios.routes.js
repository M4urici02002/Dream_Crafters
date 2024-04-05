const express = require('express');

const router = express.Router();
const isAuth = require('../util/is-auth');
router.get('/', isAuth, (request, response, next) => {
    response.render('modificarUsuarios',{
        permisos: request.session.permisos || [],
    });
});


module.exports = router;
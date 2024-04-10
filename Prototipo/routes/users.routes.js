const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');
const isAuth = require('../util/is-auth');


router.get('/login', usersController.get_login);
router.post('/login', usersController.post_login);
router.get('/logout', usersController.get_logout);

router.get('/gestionUsuarios/crearUsuario', isAuth, usersController.get_crearUsuario);
router.post('/gestionUsuarios/crearUsuario', isAuth, usersController.post_crearUsuario);


// Modificar usuarios
router.get('/modificarUsuarios/:username', isAuth, usersController.get_modificarUsuario);
router.post('/modificarUsuarios', isAuth, usersController.post_modificarUsuario);

module.exports = router;
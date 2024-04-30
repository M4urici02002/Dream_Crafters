const express = require('express');
const router = express.Router();

const emailController = require('../controllers/email.controller');
const isAuth = require('../util/is-auth');


router.get('/enviarCorreo', isAuth, emailController.get_enviarCorreo);

// router.get('/-', isAuth, emailController.exports.showForm);
// router.post('/api/email', isAuth, emailController.exports.sendEmail);

module.exports = router;
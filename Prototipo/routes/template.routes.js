const express = require('express');
const router = express.Router();

const templateController = require('../controllers/template.controller');
const isAuth = require('../util/is-auth');

router.get('/', isAuth, templateController.get_template);

module.exports = router;
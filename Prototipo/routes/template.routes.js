const express = require('express');
const router = express.Router();

const templateController = require('../controllers/template.controller');
const isAuth = require('../util/is-auth');

router.get('/template', isAuth, templateController.get_categoriasMarca);
router.post('/template', isAuth, templateController.post_categoriasMarca);

router.get('/template/editarEncuesta', isAuth, templateController.get_EditarEncuesta);
router.post('/template/editarEncuesta', isAuth, templateController.post_editarEncuesta);

module.exports = router;
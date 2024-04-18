const express = require('express');
const router = express.Router();

const templateController = require('../controllers/template.controller');
const isAuth = require('../util/is-auth');

router.get('/template', isAuth, templateController.get_categoriasMarca);
router.post('/template', isAuth, templateController.post_categoriasMarca);

router.get('/template/editarEncuesta', isAuth, templateController.get_EditarEncuesta);
router.get('/template/agregarPregunta', isAuth, templateController.get_agregarPregunta);

router.get('/template/diasParaEnvio', isAuth, templateController.get_diasParaEnvio);
router.post('/template/diasParaEnvio', isAuth, templateController.post_diasParaEnvio);


module.exports = router;
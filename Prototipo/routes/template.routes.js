const express = require('express');
const router = express.Router();

const templateController = require('../controllers/template.controller');
const isAuth = require('../util/is-auth');
const canCrm = require('../util/canCrm');

router.get('/template', isAuth, canCrm, templateController.get_categoriasMarca);
router.post('/template', isAuth, canCrm, templateController.post_categoriasMarca);

router.get('/template/editarEncuesta', isAuth, canCrm, templateController.get_EditarEncuesta);
router.post('/template/editarEncuesta', isAuth, canCrm, templateController.post_editarEncuesta);

module.exports = router;
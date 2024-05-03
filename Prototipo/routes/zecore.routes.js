const express = require("express");
const router = express.Router();

const zecore = require("../controllers/zecore.controller");

router.post("/zecore/nuevoproducto", zecore.validateToken, zecore.postNuevoProducto);
router.post("/zecore/modificarproducto", zecore.validateToken, zecore.postModificarProducto);
router.post("/zecore/venta", zecore.validateToken, zecore.postVenta);


module.exports = router;
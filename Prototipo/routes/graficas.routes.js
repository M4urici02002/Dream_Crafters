const express = require("express");
const router = express.Router();
const isAuth = require("../util/is-auth");
const graficasController = require("../controllers/graficas.controller");

// Ruta principal de 'graficas'
router.get("/", isAuth, (request, response, next) => {
response.redirect("/graficas/numeroResenas")
});

// Ruta unificada para calificación por estrellas, categorías y productos
router.get(
"/calificacionEstrellas",
isAuth,
graficasController.calificacionEstrellas
);
router.get(
"/productosPorCategoria",
isAuth,
graficasController.productosPorCategoria
);
router.get(
"/calificacionesFiltradas",
isAuth,
graficasController.obtenerCalificacionesFiltradas
);

router.get(
"/orderToReview",
isAuth,
graficasController.showOrderToReview
);

router.get(
"/obtenerReseñasContestadas",
isAuth,
graficasController.obtenerResenasContestadas
);

router.get(
"/obtenerResenasContestadasFiltradas",
isAuth,
graficasController.obtenerResenasContestadasFiltradas
);

router.get(
  "/numeroResenas", 
  isAuth,
  graficasController.numeroResenas
  );

  router.get(
    "/numeroResenasFiltradas",
    isAuth,
    graficasController.numeroResenasFiltradas
    );

module.exports = router;

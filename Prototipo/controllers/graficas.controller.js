const calificacionesModel = require("../models/graficas.model");

exports.calificacionEstrellas = (req, res) => {
  Promise.all([
    calificacionesModel.obtenerCategorias(),
    calificacionesModel.obtenerCalificaciones(),
  ])
    .then(([categoriasResult, calificacionesResult]) => {
      res.render("calificacionEstrellas", {
        categorias: categoriasResult[0],
        datos: calificacionesResult[0],
        permisos: req.session.permisos || [],
      });
    })
    .catch((err) => {
      console.error("Error al obtener los datos:", err);
      res.status(500).send("Error al obtener los datos");
    });
};

exports.productosPorCategoria = (req, res) => {
  const categoriaSeleccionada = req.query.categoria; // Asumiendo que se pasa la categoría como un parámetro de consulta

  if (!categoriaSeleccionada) {
    return res.status(400).send("Categoría no especificada");
  }

  calificacionesModel
    .obtenerProductosPorCategoria(categoriaSeleccionada)
    .then(([productosResult]) => {
      res.json(productosResult); // Enviar los productos como respuesta JSON
    })
    .catch((err) => {
      console.error(
        `Error al obtener productos para la categoría ${categoriaSeleccionada}:`,
        err
      );
      res.status(500).send("Error al obtener productos");
    });
};

exports.obtenerCalificacionesFiltradas = (req, res) => {
  const { categoria, producto, fechaInicio, fechaFin } = req.query;

  // Asume una función en tu modelo que acepte estos parámetros y devuelva los datos filtrados
  calificacionesModel
    .obtenerCalificacionesFiltradas(categoria, producto, fechaInicio, fechaFin)
    .then(([data]) => {
      res.json(data);
    })
    .catch((err) => {
      console.error("Error al obtener calificaciones filtradas:", err);
      res.status(500).send("Error al obtener los datos filtrados");
    });
};

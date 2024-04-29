const Graficas = require("../models/graficas.model");

exports.calificacionEstrellas = (req, res) => {
  const marcaSeleccionada = req.cookies['marcaSeleccionada'];
  Promise.all([
    Graficas.obtenerCategoriasPorMarca(req.cookies['marcaSeleccionada']),
    Graficas.obtenerCalificacionesFiltradas(null, null, null, null, marcaSeleccionada),
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

  Graficas
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
  console.log(categoria)
  console.log(producto)

  Graficas
    .obtenerCalificacionesFiltradas(categoria, producto, fechaInicio, fechaFin, req.cookies['marcaSeleccionada'])
    .then(([data]) => {
      res.json(data);
    })
    .catch((err) => {
      console.error("Error al obtener calificaciones filtradas:", err);
      res.status(500).send("Error al obtener los datos filtrados");
    });
};



exports.showOrderToReview = (req, res, next) => {
  const marcaSeleccionada = req.cookies['marcaSeleccionada'];
  Promise.all([Graficas.obtenerCategoriasPorMarca(marcaSeleccionada), Graficas.obtenerResenasContestadasFiltradas(null, null, null, null, marcaSeleccionada)])
  
      .then(([categorias, resenas]) => {
        console.log(categorias)
          res.render('orderToReview', {
              categorias: categorias[0],
              permisos: req.session.permisos || [],
              path: '/graficas/orderToReview',
              datos:[Number(resenas[0][0].Contestadas),Number(resenas[0][0].No_Contestadas)]
          });
      })
      .catch(err => {
          console.error('Error al cargar la página:', err);
          res.status(500).send('Error al cargar la página de análisis');
      });
};

exports.obtenerResenasContestadasFiltradas = (req, res) => {
  const { categoria, producto, fechaInicio, fechaFin } = req.query;
  console.log(categoria,producto)
  Graficas.obtenerResenasContestadasFiltradas(categoria, producto, fechaInicio, fechaFin, req.cookies['marcaSeleccionada'])
    .then(([results]) => {
      res.json({
        contestadas: results[0].Contestadas,
        noContestadas: results[0].No_Contestadas
      });
    })
    .catch((err) => {
      console.error("Error al obtener las reseñas contestadas y no contestadas filtradas:", err);
      res.status(500).send("Error al procesar la solicitud");
    });
};

exports.numeroResenas = (req, res,nxt) => {
  const marcaSeleccionada = req.cookies['marcaSeleccionada'];
  Promise.all([
    Graficas.obtenerCategoriasPorMarca(marcaSeleccionada),
    Graficas.obtenerNumeroResenasFiltradas(null, null, null, null, marcaSeleccionada)
  ])
  .then(([categoriasResult, resenasResult]) => {
    console.log(resenasResult[0])
    res.render("graficas", { // Asegúrate de que el nombre de la vista sea correcto
      categorias: categoriasResult[0],
      resenas: resenasResult[0],
      permisos: req.session.permisos || [],
    });
  })
  .catch((err) => {
    console.error("Error al obtener los datos:", err);
    res.status(500).send("Error de conexion con nuestra base de datos");
  }); 
};

exports.numeroResenasFiltradas = (req, res) => {
  const { categoria, producto, fechaInicio, fechaFin } = req.query;
  
  Graficas.obtenerNumeroResenasFiltradas(categoria, producto, fechaInicio, fechaFin, req.cookies['marcaSeleccionada'])
    .then(([resenasFiltradasResult]) => {
      res.json({
        datos: resenasFiltradasResult
      });
    })
    .catch((err) => {
      console.error("Error al obtener reseñas filtradas:", err);
      res.status(500).send("Error al obtener los datos filtrados");
    });
}; 
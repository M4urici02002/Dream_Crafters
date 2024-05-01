const db = require('../util/database');
const Encuesta = require('../models/encuesta.model');

exports.get_catalogoEncuestas = async (request, response, next) => {
  try {
    const page = parseInt(request.query.page) || 1; // Obtener el número de página, si no se especifica, usar página 1
    const perPage = 10; // Número de encuestas por página
    const offset = (page - 1) * perPage; // Calcular el offset

    const encuestas = await Encuesta.fetchPerPage(perPage, offset);

    // Obtener el número total de encuestas
    const totalEncuestas = await Encuesta.getTotalCount();
    const totalPages = Math.ceil(totalEncuestas / perPage);

    response.render("catalogoEncuestas", {
      encuestas: encuestas,
      permisos: request.session.permisos || [],
      csrfToken: request.csrfToken(),
      page: page, // Pasar el número de página a la vista
      totalPages: totalPages // Pasar el número total de páginas a la vista
    });
  
  } catch (error) {
    console.log(error);
    response.status(500).send("Error al obtener catálogo de Encuestas");
  }
};

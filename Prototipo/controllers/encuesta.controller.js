const db = require('../util/database');
const Encuesta = require('../models/encuesta.model');
const Pregunta = require('../models/pregunta.model');

exports.get_catalogoEncuestas = async (request, response, next) => {
  try {
    const encuestas = await Encuesta.fetchAll();
    for (let encuesta of encuestas) {
      const preguntas = await Pregunta.fetchAllByEncuesta(encuesta.IDEncuesta);

      // Agrega las preguntas como una propiedad a la encuesta actual
      encuesta.preguntas = preguntas;
    }
    response.render("catalogoEncuestas", {
      encuestas: encuestas,
      permisos: request.session.permisos || [],
      csrfToken: request.csrfToken(),
    });
  
  } catch (error) {
    console.log(error);
    response.status(500).send("Error al obtener catálogo de Encuestas");
  }
};

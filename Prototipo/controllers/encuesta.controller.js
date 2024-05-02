const db = require('../util/database');
const Encuesta = require('../models/encuesta.model');
const Pregunta = require('../models/pregunta.model');

exports.get_catalogoEncuestas = async (request, response, next) => {
  try {
    // Obtén todas las encuestas
    const encuestas = await Encuesta.fetchAll();

    // Para cada encuesta, obtén las preguntas asociadas
    for (let encuesta of encuestas) {
      // Obtén las preguntas asociadas a la encuesta actual
      const preguntas = await Pregunta.fetchAllByEncuesta(encuesta.IDEncuesta);

      // Calcula la longitud del array de preguntas
      const totalPreguntas = preguntas.length;
      console.log(totalPreguntas);

      console.log(preguntas);

      // Agrega las preguntas como una propiedad a la encuesta actual
      encuesta.preguntas = preguntas;

      // Agrega la longitud de las preguntas como una propiedad de la encuesta actual
      encuesta.totalPreguntas = totalPreguntas;
    }

    // Renderiza la vista con las encuestas y las preguntas asociadas
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

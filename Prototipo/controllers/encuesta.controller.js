const db = require("../util/database");
const Encuesta = require('../models/encuesta.model');

exports.get_catalogoEncuestas = async (request, response, next) => {
    console.log("catalogo Encuestas");
   try {
     //const uroles = await Rol.fetchAll();

     response.render("catalogoEncuestas", {
       //rolRegistrado: uroles,
       permisos: request.session.permisos || [],
       csrfToken: request.csrfToken(),
     });
   
   } catch (error) {
     console.log(error);
     response.status(500).send("Error al obtener catálogo de Encuestas");
   }
};



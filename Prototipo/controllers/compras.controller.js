const db = require("../util/database");
const Compra = require('../models/compras.model');

exports.get_catalogoCompras = async (request, response, next) => {
    console.log("catalogo Compras");
   try {
     //const uroles = await Rol.fetchAll();

     response.render("compras", {
       //rolRegistrado: uroles,
       permisos: request.session.permisos || [],
       csrfToken: request.csrfToken(),
     });

   } catch (error) {
     console.log(error);
     response.status(500).send("Error al obtener catálogo de Encuestas");
   }
};
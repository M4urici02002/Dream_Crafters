const db = require("../util/database");
const Compra = require('../models/compras.model');

exports.get_catalogoCompras = async (request, response, next) => {
   try {
    const ucompras = await Compra.fetchAll();

    response.render("compras", {
        compras: ucompras,
        permisos: request.session.permisos || [],
        csrfToken: request.csrfToken(),
    });

   } catch (error) {
     console.log(error);
     response.status(500).send("Error al obtener catálogo de compras");
   }
};
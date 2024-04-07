// marcas.controller.js
const Marca = require('../models/marcas.model');

exports.getMarcas = (req, res, next) => {
    Marca.fetchAll()
        .then(([rows, fieldData]) => {
            res.locals.marcas = rows;
            next(); // Importante para continuar con el siguiente middleware o ruta.
        })
        .catch(err => {
            console.log(err);
            next(err); // Pasa el error al manejador de errores de Express.
        });
};

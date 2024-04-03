const Resena = require('../models/resena.model');

// resena.controller
exports.get_resena = (request, response, next) => {
    const categoria = request.query.categoria; // Obtiene la categoría de los parámetros de la URL, si existe
    
    Resena.fetchAll(categoria).then(([rows, fieldData]) => {
        response.render('resena', {
            resena: rows,
            permisos: request.session.permisos || [],
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

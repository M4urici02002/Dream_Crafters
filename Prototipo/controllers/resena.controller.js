const Resena = require('../models/resena.model');

// resena.controller
exports.get_resena = (request, response, next) => {
    const categoria = request.query.categoria;
    const idMarca = request.cookies['marcaSeleccionada']; // Asumiendo que se guarda el ID de la marca seleccionada en una cookie
    
    Resena.fetchAll(categoria, idMarca)
    .then(([rows, fieldData]) => {
        //console.log(request.cookies['marcaSeleccionada'])
        response.render('resena', {
            resena: rows,
            categoria: categoria,
            permisos: request.session.permisos || [],
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

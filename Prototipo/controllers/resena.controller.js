const Resena = require('../models/resena.model');

exports.getResena = (request, response, next) => {
    const categoria = request.query.categoria;
    const idMarca = request.cookies['marcaSeleccionada'];

    Resena.fetchAll(categoria, idMarca)
    .then(([rows, fieldData]) => {
        response.render('resena', {
            resena: rows,
            categoria: categoria,
            permisos: request.session.permisos || [],
            csrfToken: request.csrfToken(),
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

exports.postActualizarVisibilidad = (request, response, next) => {
    const reseñaId = request.body.reseñaId;
    const isVisible = request.body.isVisible;

    // Llama al método updateVisibility del modelo Resena para actualizar la visibilidad en la base de datos
    Resena.updateVisibility(reseñaId, isVisible)
        .then(result => {
            response.status(200).json({ message: 'Visibility updated successfully.' });
        })
        .catch(error => {
            response.status(500).json({ message: 'Failed to update visibility.' });
        });
};
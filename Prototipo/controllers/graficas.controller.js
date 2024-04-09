// controllers/tuControlador.js
const calificacionModel = require('../models/graficas.model');

exports.calificacionEstrellas = (req, res) => {
    calificacionModel.obtenerCalificaciones()
    .then(([result]) => {
        res.render('calificacionEstrellas', {
            datos: result,
            permisos: req.session.permisos || [] 
        });
    })
    .catch((error) => {
        console.error('Error al obtener las calificaciones:', error);
        res.send("Error al obtener los datos");
    });
};

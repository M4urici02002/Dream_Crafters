const db = require('../util/database');

exports.calificacionEstrellas = (req, res) => {
    db.execute('SELECT rating, COUNT(*) as cantidad FROM resena GROUP BY rating ORDER BY rating;')
    .then(([result]) => {
        // Ahora que tienes los resultados, puedes renderizar la vista con ellos
        res.render('calificacionEstrellas', {
            datos: result,
            permisos: req.session.permisos || [] // Se pasa 'permisos' a la vista
        });
    })
    .catch((error) => {
        console.error('Error al obtener las calificaciones:', error);
        res.send("Error al obtener los datos");
    });
};

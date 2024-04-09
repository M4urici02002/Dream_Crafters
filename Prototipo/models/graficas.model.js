// models/calificacionModel.js
const db = require('../util/database');

exports.obtenerCalificaciones = () => {
    return db.execute('SELECT rating, COUNT(*) as cantidad FROM resena GROUP BY rating ORDER BY rating;');
};

const db = require('../util/database');

module.exports = class Categoria {
    static fetchAllByMarcaNombre(nombreMarca) {
        return db.execute(`
            SELECT DISTINCT e.Categoria
            FROM encuesta e
            INNER JOIN marca m ON e.IDMarca = m.IDMarca
            WHERE m.Nombre = ?
        `, [nombreMarca]);
    }
};
const db = require('../util/database');

module.exports = class Categoria {
    static fetchAllByMarcaNombre(nombreMarca) {
        return db.execute(`
            SELECT DISTINCT p.Categoria
            FROM producto p
            INNER JOIN marca m ON p.IDMarca = m.IDMarca
            WHERE m.Nombre = ?
        `, [nombreMarca]);
    }
};
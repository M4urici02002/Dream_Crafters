const db = require('../util/database');

module.exports = class Marca {
    static fetchAll() {
        return db.execute('SELECT * FROM marca');
    }
};

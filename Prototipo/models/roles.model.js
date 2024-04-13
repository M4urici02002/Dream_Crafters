
const db = require('../util/database');

class Rol {
    static fetchAll() {
        return db.execute('SELECT * FROM rol');
    }
}

module.exports = Rol;
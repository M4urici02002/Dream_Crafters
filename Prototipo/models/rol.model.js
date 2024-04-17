const db = require('../util/database');

module.exports = class Rol {

    constructor(mi_nombreRol) {
        this.nombreRol = mi_nombreRol;
    }

    async save() {
        try {
            await db.execute('INSERT INTO rol (nombre) VALUES (?)', [this.nombreRol]);
        } catch(error) {
            console.log(error);
            throw new Error('Error al guardar el rol en la base de datos');
        }
    }
    
    static fetchAll() {
        return db.execute('Select * from rol')
    }

    static eliminar(idrol) {
        return db.execute('DELETE FROM rol WHERE idrol = ?', [idrol]);
    }
}

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


    static async privilegioAll() {
        try {
            const [privilegios] = await db.query('SELECT * FROM privilegio');
            return privilegios;
        } catch (error) {
            throw new Error('Error al obtener los privilegios de la base de datos');
        }
    }
}

// rol.model.js

const db = require('../util/database');

module.exports = class Rol {
    constructor(nombre) {
        this.nombre = nombre;
    }

    async save() {
        try {
            await db.execute(`
                INSERT INTO rol (nombre) 
                VALUES (?)`, 
                [this.nombre]
            );
        } catch(error) {
            console.log(error);
            throw new Error('Error al guardar el rol en la base de datos');
        }
    }
};

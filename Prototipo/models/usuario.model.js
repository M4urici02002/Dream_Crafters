const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_username, mi_nombre, mi_password) {
        this.username = mi_username;
        this.nombre = mi_nombre;
        this.password = mi_password;
    }

    save() {
        return bcrypt.hash(this.password, 12) //cantidad de veces q se cifra
        .then(async (password_cifrado) => {
            try {
                await db.execute(
                    `INSERT INTO usuario (username, nombre, password) 
                    VALUES (?, ?, ?)`, 
                    [this.username, this.nombre, password_cifrado]
                );
                
                return db.execute(
                    'INSERT INTO asigna (username, idrol) VALUES (?, 3)', 
                    [this.username]
                );
            } catch(error) {
                console.log(error);
                throw Error('Ese usuario ya existe!');
            }
        });
    }
    static fetchAll() {
        return db.execute('Select * from usuario')
    }

    static fetchOne(username) {
        return db.execute('Select * from usuario WHERE username = ?'
        , [username]);
    }

    static getPermisos(username) {
        return db.execute(`
            SELECT permiso
            FROM privilegio pr, posee po, rol r, asigna a, usuario u
            WHERE u.username = ? AND u.username = a.username AND
            a.idrol = r.idrol AND r.idrol = po.idrol AND po.idprivilegio = pr.idprivilegio
        `, [username]);
    }
    static fetchOneWithRole(username) {
        return db.execute(`
            SELECT usuario.username, usuario.nombre, usuario.password, rol.nombre AS nombre_rol
            FROM usuario
            INNER JOIN asigna ON usuario.username = asigna.username
            INNER JOIN rol ON asigna.idrol = rol.idrol
            WHERE usuario.username = ?
        `, [username]);
    }
    static eliminar(username) {
        return db.execute('DELETE FROM usuario WHERE username = ?', [username]);
    }

}
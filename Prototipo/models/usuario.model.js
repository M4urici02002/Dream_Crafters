const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Usuario {
  //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
  constructor(mi_username, mi_nombre, mi_password) {
    this.username = mi_username;
    this.nombre = mi_nombre;
    this.password = mi_password;
  }

<<<<<<< HEAD
  save() {
    return bcrypt
      .hash(this.password, 12) //cantidad de veces q se cifra
      .then(async (password_cifrado) => {
        try {
          await db.execute("CALL InsertarUsuarioYAsignarRol(?, ?, ?)", [
            this.username,
            this.nombre,
            password_cifrado,
          ]);
        } catch (error) {
          console.log(error);
          throw Error("Ese usuario ya existe!");
        }
      });
  }
  static fetchAll() {
    return db.execute("Select * from usuario");
  }

  static fetchOne(username) {
    return db.execute("Select * from usuario WHERE username = ?", [username]);
  }
=======
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_username, mi_nombre, mi_password, mi_idrol) {
        this.username = mi_username;
        this.nombre = mi_nombre;
        this.password = mi_password;
        this.idrol = mi_idrol;
    }

    save() {
        return bcrypt.hash(this.password, 12) //cantidad de veces q se cifra
        .then(async (password_cifrado) => {
            console.log("Usuario creado: ",this.username, this.nombre, this.idrol);
            try {
                await db.execute('CALL InsertarUsuarioYAsignarRol(?, ?, ?, ?)', [this.username, this.nombre, password_cifrado, this.idrol]);
            } catch(error) {
                console.log(error);
                throw Error('Ese usuario ya existe!');
            }
        });
    }
    static fetchAll() {
        return db.execute('Select * from usuario')
    }
>>>>>>> e46711b2ea000b0ab080cc93c079313e2377af34

  static update(username, nombre) {
    return db.execute(
      `UPDATE usuario SET 
            nombre = ?
            WHERE username = ?`,
      [nombre, username]
    );
  }

  static getPermisos(username) {
    return db.execute(
      `
            SELECT permiso
            FROM privilegio pr, posee po, rol r, asigna a, usuario u
            WHERE u.username = ? AND u.username = a.username AND
            a.idrol = r.idrol AND r.idrol = po.idrol AND po.idprivilegio = pr.idprivilegio
        `,
      [username]
    );
  }
  static fetchOneWithRole(username) {
    return db.execute(
      `
            SELECT usuario.username, usuario.nombre, usuario.password, rol.nombre AS nombre_rol
            FROM usuario
            INNER JOIN asigna ON usuario.username = asigna.username
            INNER JOIN rol ON asigna.idrol = rol.idrol
            WHERE usuario.username = ?
        `,
      [username]
    );
  }
  static eliminar(username) {
    return db.execute("CALL EliminarUsuario(?)", [username]);
  }
};

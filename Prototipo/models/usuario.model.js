const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Usuario {
  /// Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
  constructor(miUsername, miNombre, miPassword, miIdRol) {
    this.username = miUsername;
    this.nombre = miNombre;
    this.password = miPassword;
    this.idRol = miIdRol;
  }

  save() {
    return bcrypt.hash(this.password, 12) // cantidad de veces que se cifra
      .then((passwordCifrado) => {
        console.log("Usuario creado: ", this.username, this.nombre, this.idRol);
        try {
          return db.execute('CALL InsertarUsuarioYAsignarRol(?, ?, ?, ?)', [this.username, this.nombre, passwordCifrado, this.idRol]);
        } catch (error) {
          console.log(error);
          throw new Error('Ese usuario ya existe!');
        }
      });
  }

  static fetchAll() {
    return db.execute('SELECT * FROM usuario');
  }

  static fetchUsuariosConRoles() {
    return db.execute(
      'SELECT U.username, U.nombre, rol.nombre AS rol_nombre FROM usuario U JOIN asigna A ON U.username = A.username JOIN rol ON A.idrol = rol.idrol;'
    );
  }

  static async fetchOne(username) {
    try {
      const [rows] = await db.execute('SELECT * FROM usuario WHERE username = ?', [username]);
      if (rows.length > 0) {
        const usuario = rows[0]; // Tomar el primer usuario de los resultados
        return usuario;
      } else {
        return null; // Devolver null si no se encuentra ningún usuario con el nombre de usuario proporcionado
      }
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      throw error; // Lanzar error para que se maneje en el controlador
    }
  }

  static update(username, nombre, idRol) {
    return db.execute('CALL ModificarUsuarioYRol(?, ?, ?)', [username, nombre, idRol]);
  }

  static getPermisos(username) {
    return db.execute(
      'SELECT permiso FROM privilegio pr, posee po, rol r, asigna a, usuario u WHERE u.username = ? AND u.username = a.username AND a.idrol = r.idrol AND r.idrol = po.idrol AND po.idprivilegio = pr.idprivilegio',
      [username]
    );
  }

  static fetchOneWithRole(username) {
    return db.execute(
      'SELECT usuario.username, usuario.nombre, usuario.password, rol.nombre AS nombre_rol FROM usuario INNER JOIN asigna ON usuario.username = asigna.username INNER JOIN rol ON asigna.idrol = rol.idrol WHERE usuario.username = ?',
      [username]
    );
  }

  static eliminar(username) {
    return db.execute("CALL EliminarUsuario(?)", [username]);
  }

  static search(valorBusqueda) {
    return db.execute(
      'SELECT U.username, U.nombre, rol.nombre AS rol_nombre FROM usuario U JOIN asigna A ON U.username = A.username JOIN rol ON A.idrol = rol.idrol WHERE rol.nombre LIKE ? OR U.username LIKE ? OR U.nombre LIKE ?;',
      ['%' + valorBusqueda + '%', '%' + valorBusqueda + '%', '%' + valorBusqueda + '%']
    );
  }

  // Método para actualizar la contraseña del usuario en la base de datos
  static updatePassword(username, newPassword) {
    return db.execute(
      'UPDATE usuario SET password = ? WHERE username = ?',
      [newPassword, username]
    );
  }
};

const db = require("../util/database");

module.exports = class Rol {
  constructor(mi_nombreRol) {
    this.nombreRol = mi_nombreRol;
  }

  async save() {
    try {
      await db.execute("INSERT INTO rol (nombre) VALUES (?)", [this.nombreRol]);

    } catch (error) {
      console.log(error);
      throw new Error("Error al guardar el rol en la base de datos");
    }
  }

  // Obtener todos los roles para consultar usuarios
    static fetch() {
      return db.execute('SELECT * FROM rol');
  }

  // Obtener todos los roles para consultar roles
  static async fetchAll() {
    try {
      const [roles] = await db.query(`
                SELECT * FROM rol;
            `);
      return roles;

    } catch (error) {
      throw error;
    }
  }

  static eliminar(idrol) {
    return db.execute("DELETE FROM rol WHERE idrol = ?", [idrol]);
  }

  static async asignaciones(idrol) {
    try {
      const result = await db.query(
        "SELECT COUNT(*) AS total FROM asigna WHERE idrol = ?",
        [idrol]
      );
      const totalAsignaciones = result[0][0].total;
      console.log(totalAsignaciones);
      return totalAsignaciones;

    } catch (error) {
      console.error("Error al verificar las asignaciones del rol:", error);
      throw error;
    }
  }

  static async privilegioAll() {
    try {
      const [privilegios] = await db.query("SELECT * FROM privilegio");
      console.log(privilegios);
      return privilegios;

    } catch (error) {
      throw new Error("Error al obtener los privilegios de la base de datos");
    }
  }
};

const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Encuesta {
  constructor(mi_titulo, mi_categoria, mi_IDMarca) {
    this.titulo = mi_titulo;
    this.categoria = mi_categoria;
    this.IDMarca = mi_IDMarca;
  }

  save() {
    try {
      return db.execute(
        `INSERT INTO encuesta (titulo, categoria, IDMarca) 
                VALUES (?, ?, ?)`,
        [this.titulo, this.categoria, this.IDMarca]
      );
    } catch (error) {
      throw new Error(
        "Error al guardar la encuesta en la base de datos: " + error.message
      );
    }
  }

  static update(_diasParaEnvio, _IDEncuesta) {
    return db.execute(
      `UPDATE Encuesta SET 
          diasParaEnvio = _diasParaEnvio
          WHERE IDEncuesta=_IDEncuesta;
          `,
      [_diasParaEnvio, _IDEncuesta]
    );
  }

  static fetchOne(IDEncuesta) {
    return db.execute("Select * from Encuesta WHERE IDEncuesta = ?", 
    [IDEncuesta]);
  }
};

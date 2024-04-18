const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Encuesta {
  constructor(mi_IDEncuesta, mi_IDMarca, mi_titulo, mi_DiasParaEnvio, mi_categoria) {
    this.IDEncuesta = mi_IDEncuesta;
    this.IDMarca = mi_IDMarca;
    this.titulo = mi_titulo;
    this.DiasParaEnvio = mi_DiasParaEnvio;
    this.categoria = mi_categoria;
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
};

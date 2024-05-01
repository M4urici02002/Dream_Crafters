const db = require("../util/database");

module.exports = class Encuesta {
  constructor(mi_IDMarca, mi_titulo, mi_DiasParaEnvio, mi_categoria) {
      this.IDMarca = mi_IDMarca;
      this.titulo = mi_titulo;
      this.DiasParaEnvio = mi_DiasParaEnvio;
      this.categoria = mi_categoria;
  }

  static async save(IDMarca, titulo, DiasParaEnvio, categoria) {
    try {
        console.log("IDMarca:", IDMarca);
        console.log("titulo:", titulo);
        console.log("DiasParaEnvio:", DiasParaEnvio);
        console.log("categoria:", categoria);
        const result = await db.execute(
            `INSERT INTO encuesta (IDMarca, titulo, diasParaEnvio, categoria) 
            VALUES (?, ?, ?, ?)`,
            [IDMarca, titulo, DiasParaEnvio, categoria]
        );
        return result; // Devuelve el resultado completo sin desestructurarlo
    } catch (error) {
        throw new Error("Error al guardar la encuesta en la base de datos: " + error.message);
    }
  }

  // Obtener todas las encuestas
  static async fetchAll() {
    try {
      const [encuestas] = await db.query(`
                SELECT IDEncuesta, Nombre as 'Marca', Titulo, DiasParaEnvio, Categoria
                FROM encuesta e, marca m
                WHERE e.IDMarca=m.IDMarca;
            `);
      return encuestas;

    } catch (error) {
      throw error;
    }
  }

  // Obtener encuestas por página
  static async fetchPerPage(perPage, offset) {
    try {
      const [encuestas] = await db.query(`
                SELECT IDEncuesta, Nombre as 'Marca', Titulo, DiasParaEnvio, Categoria
                FROM encuesta e, marca m
                WHERE e.IDMarca=m.IDMarca
                LIMIT ? OFFSET ?;
            `, [perPage, offset]);
      return encuestas;
    } catch (error) {
      throw error;
    }
  }

  // Obtener el número total de encuestas
  static async getTotalCount() {
    try {
      const [result] = await db.query(`SELECT COUNT(*) as totalCount FROM encuesta`);
      return result[0].totalCount;
    } catch (error) {
      throw error;
    }
  }
};

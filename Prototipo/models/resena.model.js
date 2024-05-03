const db = require('../util/database');

module.exports = class Resena {
  // Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
  constructor(
    idEncuesta,
    idProducto,
    idCliente,
    titulo,
    calificacion,
    descripcion,
    enviada,
    fechaContestacion,
    visibilidad
  ) {
    this.idEncuesta = idEncuesta;
    this.idProducto = idProducto;
    this.idCliente = idCliente;
    this.titulo = titulo;
    this.calificacion = calificacion;
    this.descripcion = descripcion;
    this.enviada = enviada;
    this.fechaContestacion = fechaContestacion;
    this.visibilidad = visibilidad;
  }

  static async save(IDEncuesta, IDProducto, IDCliente, rating, Titulo) {
    try {
        console.log("IDEncuesta:", IDEncuesta);
        console.log("IDProducto:", IDProducto);
        console.log("IDCliente:", IDCliente);
        console.log("rating:", rating);
        console.log("Titulo:", Titulo);
        const result = await db.execute(
            `INSERT INTO resena(IDEncuesta, IDProducto, IDCliente, Rating, Titulo, Enviada, FechaContestacion, Visibilidad) VALUES
            (?, ?, ?, ?, ?, 1, CURRENT_DATE, 1);`,
            [IDEncuesta, IDProducto, IDCliente, rating, Titulo]
        );
        return result; // Devuelve el resultado completo sin desestructurarlo
    } catch (error) {
        throw new Error("Error al guardar la encuesta en la base de datos: " + error.message);
    }
  }

  static fetchAll(categoria = null, nombreMarca = null) {
    let query = '\
      SELECT r.*, p.Nombre as NombreProducto, c.Correo, m.Nombre as NombreMarca \
      FROM resena r \
      INNER JOIN producto p ON r.IDProducto = p.IDProducto \
      INNER JOIN cliente c ON r.IDCliente = c.IDCliente \
      INNER JOIN marca m ON p.IDMarca = m.IDMarca \
      INNER JOIN encuesta e ON r.IDEncuesta = e.IDEncuesta \
    ';
    const condiciones = [];
    const parametros = [];

    if (categoria) {
      condiciones.push('p.Categoria = ?');
      parametros.push(categoria);
    }

    if (nombreMarca) {
      condiciones.push('m.Nombre = ?');
      parametros.push(nombreMarca);
    }

    if (condiciones.length) {
      query += ' WHERE ' + condiciones.join(' AND ');
    }

    return db.execute(query, parametros);
  }

  static updateVisibility(idResena, isVisible) {
    return db.execute(
      'UPDATE resena SET Visibilidad = ? WHERE IDReseña = ?',
      [isVisible, idResena]
    );
  }
};

const db = require("../util/database");

class Graficas {
  static obtenerCategoriasPorMarca(marca) {
    return db.execute(
      "SELECT DISTINCT Categoria FROM producto p JOIN marca m on m.IDMarca = p.IDMarca WHERE m.Nombre = ? ORDER BY Categoria;",
      [marca]
    );
  }

  static obtenerProductosPorCategoria(categoria) {
    return db.execute(
      "SELECT IDProducto, Nombre FROM producto WHERE Categoria = ? ORDER BY Nombre;",
      [categoria]
    );
  }

  static obtenerCalificacionesFiltradas(
    categoria,
    producto,
    fechaInicio,
    fechaFin,
    marca
  ) {
    let query = `SELECT r.rating, COUNT(*) as cantidad
                     FROM resena r
                     JOIN producto p ON r.IDProducto = p.IDProducto
                     JOIN marca m on p.IDMarca = m.IDMarca
                     WHERE 1=1`;
    const params = [];
    if (categoria) {
      query += " AND p.Categoria = ?";
      params.push(categoria);
    }
    if (producto) {
      query += " AND p.Nombre = ?";
      params.push(producto);
    }
    if (fechaInicio) {
      query += " AND r.FechaContestacion >= ?";
      params.push(fechaInicio);
    }
    if (fechaFin) {
      query += " AND r.FechaContestacion <= ?";
      params.push(fechaFin);
    }
    if (marca) {
      query += " AND m.Nombre = ?";
      params.push(marca);
    }

    query += " GROUP BY r.rating ORDER BY r.rating;";
    return db.execute(query, params);
  }

  static resenasContestadas() {
    return db.execute(
      "SELECT SUM(CASE WHEN FechaContestacion IS NOT NULL THEN 1 ELSE 0 END) AS Contestadas, SUM(CASE WHEN FechaContestacion IS NULL THEN 1 ELSE 0 END) AS No_Contestadas FROM resena"
    );
  }

  static obtenerResenasContestadasFiltradas(
    categoria,
    producto,
    fechaInicio,
    fechaFin,
    marca
  ) {
    let query = `SELECT
                     SUM(CASE WHEN FechaContestacion IS NOT NULL THEN 1 ELSE 0 END) AS Contestadas,
                     SUM(CASE WHEN FechaContestacion IS NULL THEN 1 ELSE 0 END) AS No_Contestadas
                     FROM resena r
                     JOIN producto p ON r.IDProducto = p.IDProducto
                     JOIN marca m on p.IDMarca = m.IDMarca
                     WHERE 1=1`;
    let params = [];
    if (categoria) {
      query += " AND p.Categoria = ?";
      params.push(categoria);
    }
    if (producto) {
      query += " AND p.Nombre = ?";
      params.push(producto);
    }
    if (fechaInicio) {
      query += " AND r.FechaContestacion >= ?";
      params.push(fechaInicio);
    }
    if (fechaFin) {
      query += " AND r.FechaContestacion <= ?";
      params.push(fechaFin);
    }
    if (marca) {
      query += " AND m.Nombre = ?";
      params.push(marca);
    }

    return db.execute(query, params);
  }

  static obtenerNumeroResenasFiltradas(
    categoria,
    producto,
    fechaInicio,
    fechaFin,
    marca
  ) {
    let query = `SELECT YEAR(r.FechaContestacion) as Year, MONTH(r.FechaContestacion) as Month, COUNT(*) as TotalResenas
                     FROM resena r
                     JOIN producto p ON r.IDProducto = p.IDProducto
                     JOIN marca m on p.IDMarca = m.IDMarca
                     WHERE r.FechaContestacion IS NOT NULL`;

    const params = [];

    if (categoria) {
      query += " AND p.Categoria = ?";
      params.push(categoria);
    }
    if (producto) {
      query += " AND p.Nombre = ?";
      params.push(producto);
    }
    if (fechaInicio) {
      query += " AND r.FechaContestacion >= ?";
      params.push(fechaInicio);
    }
    if (fechaFin) {
      query += " AND r.FechaContestacion <= ?";
      params.push(fechaFin);
    }
    if (marca) {
      query += " AND m.Nombre = ?";
      params.push(marca);
    }

    query += " GROUP BY YEAR(r.FechaContestacion), MONTH(r.FechaContestacion)";
    query += " ORDER BY YEAR(r.FechaContestacion), MONTH(r.FechaContestacion)";

    return db.execute(query, params);
  }
}

module.exports = Graficas;

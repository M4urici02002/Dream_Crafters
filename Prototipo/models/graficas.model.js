const db = require("../util/database");

// Función para obtener las calificaciones
exports.obtenerCalificaciones = () => {
  return db.execute(
    "SELECT rating, COUNT(*) as cantidad FROM resena GROUP BY rating ORDER BY rating;"
  );
};

exports.obtenerCategorias = () => {
  return db.execute(
    "SELECT DISTINCT Categoria FROM Producto ORDER BY Categoria;"
  );
};

// Función para obtener productos por categoría
exports.obtenerProductosPorCategoria = (categoria) => {
  return db.execute(
    "SELECT IDProducto, Nombre FROM Producto WHERE Categoria = ? ORDER BY Nombre;",
    [categoria]
  );
};

exports.obtenerCalificacionesFiltradas = (
  categoria,
  producto,
  fechaInicio,
  fechaFin
) => {
  let query = `SELECT r.rating, COUNT(*) as cantidad
                 FROM Resena r
                 JOIN Producto p ON r.IDProducto = p.IDProducto
                 WHERE 1=1`;
  const params = [];
  if (categoria) {
    query += " AND p.Categoria = ?";
    params.push(categoria);
  }
  if (producto) {
    query += " AND P.Nombre = ?";
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

  query += " GROUP BY rating ORDER BY rating;";

  return db.execute(query, params);
};

exports.resenasContestadas = () => {
  return db.execute(
      "SELECT SUM(CASE WHEN FechaContestacion IS NOT NULL THEN 1 ELSE 0 END) AS Contestadas, SUM(CASE WHEN FechaContestacion IS NULL THEN 1 ELSE 0 END) AS No_Contestadas FROM Resena"
  );
};

exports.obtenerResenasContestadasFiltradas = (categoria, producto, fechaInicio, fechaFin) => {
  let query = `SELECT
        SUM(CASE WHEN FechaContestacion IS NOT NULL THEN 1 ELSE 0 END) AS Contestadas,
        SUM(CASE WHEN FechaContestacion IS NULL THEN 1 ELSE 0 END) AS No_Contestadas
    FROM Resena r
    JOIN Producto p ON r.IDProducto = p.IDProducto
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

  return db.execute(query, params);
};
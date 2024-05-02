const db = require("../util/database");

module.exports = class Compra {
  constructor(mi_IDCompra, mi_IDProducto, IDCliente, Fecha) {
      this.IDCompra = mi_IDCompra;
      this.IDProducto = mi_IDProducto;
      this.IDCliente = mi_IDCliente;
      this.Fecha = mi_Fecha;
  }

  // Obtener todas las compras con información relacionada
  static async fetchAll() {
    try {
      const [compras] = await db.query(`
                SELECT IDCompra, C.IDCliente, Cl.Nombre AS nombreCliente, Cl.Correo, C.IDProducto, P.Nombre AS nombreProducto, Fecha AS fechaCompra, E.DiasParaEnvio, E.IDEncuesta, E.Titulo AS tituloEncuesta
                FROM compra C
                INNER JOIN Producto P ON C.IDProducto = P.IDProducto
                INNER JOIN cliente Cl ON C.IDCliente = Cl.IDCliente
                INNER JOIN encuesta E ON E.Categoria = P.Categoria
                WHERE E.IDEncuesta IS NOT NULL
                AND E.IDEncuesta = ( SELECT MAX(IDEncuesta)
                    FROM encuesta 
                    WHERE Categoria = P.Categoria)
                AND DATE_ADD(C.Fecha, INTERVAL E.DiasParaEnvio DAY) = CURDATE() -- Comparación de fechas para determinar si se debe enviar hoy
                ORDER BY C.IDCompra;
            `);
      return compras;

    } catch (error) {
      throw error;
    }
  }
};

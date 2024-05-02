const db = require("../util/database");

module.exports = class Compra {
  constructor(mi_IDCompra, mi_IDProducto, IDCliente, Fecha) {
      this.IDCompra = mi_IDCompra;
      this.IDProducto = mi_IDProducto;
      this.IDCliente = mi_IDCliente;
      this.Fecha = mi_Fecha;
  }

  // Obtener todas las compras con información relacionada
  static async fetchAll(nombreMarca) {
      return db.execute(`
      SELECT IDCompra, C.IDCliente, Cl.Nombre AS nombreCliente, Cl.Correo, C.IDProducto, P.Nombre AS nombreProducto, Fecha AS fechaCompra, E.IDEncuesta, E.Titulo AS tituloEncuesta, M.Nombre as NombreMarca
      FROM compra C
      INNER JOIN producto P ON C.IDProducto = P.IDProducto
      INNER JOIN cliente Cl ON C.IDCliente = Cl.IDCliente
      INNER JOIN encuesta E ON E.Categoria = P.Categoria
      INNER JOIN marca M ON P.IDMarca = M.IDMarca
      WHERE E.IDEncuesta = ( SELECT MAX(IDEncuesta)
                FROM encuesta 
                WHERE Categoria = P.Categoria and M.Nombre = ?)
                AND DATE_ADD(C.Fecha, INTERVAL E.DiasParaEnvio DAY) = CURDATE()
                ORDER BY c.IDCompra;
            `,[nombreMarca]);
    } 
  };
 

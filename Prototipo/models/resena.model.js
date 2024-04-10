const db = require('../util/database');

module.exports = class Resena {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_IDEncuesta, mi_IDProducto, mi_IDCliente, mi_Titulo, mi_Rating, mi_Descripcion,mi_Enviada,mi_FechaContestacion) {
        this.IDEncuesta = mi_IDEncuesta;
        this.IDProducto = mi_IDProducto;
        this.IDCliente = mi_IDCliente;
        this.Titulo = mi_Titulo;
        this.Rating = mi_Rating;
        this.Descripcion = mi_Descripcion;
        this.Enviada = mi_Enviada;
        this.FechaContestacion = mi_FechaContestacion;
    }
    // En tu modelo de Reseña (Resena.model.js o similar)

    static fetchAll(categoria = null, nombreMarca = null) {
        let query = `
            SELECT r.*, p.Nombre as NombreProducto, c.Correo, m.Nombre as NombreMarca
            FROM resena r
            INNER JOIN producto p ON r.IDProducto = p.IDProducto
            INNER JOIN cliente c ON r.IDCliente = c.IDCliente
            INNER JOIN marca m ON p.IDMarca = m.IDMarca
            INNER JOIN encuesta e ON r.IDEncuesta = e.IDEncuesta
        `;
        let conditions = [];
        let params = [];
    
        if (categoria) {
            conditions.push("e.Categoria = ?");
            params.push(categoria);
        }
    
        if (nombreMarca) {
            conditions.push("m.Nombre = ?");
            params.push(nombreMarca);
        }
    
        if (conditions.length) {
            query += " WHERE " + conditions.join(" AND ");
        }
    
        return db.execute(query, params);
    }
    
}
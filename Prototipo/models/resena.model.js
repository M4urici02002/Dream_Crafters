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

    static fetchAll(categoria = null) {
        if (categoria) {
            return db.execute(
                `
                SELECT r.*, c.Correo 
                FROM resena r
                INNER JOIN encuesta e ON r.IDEncuesta = e.IDEncuesta
                INNER JOIN cliente c ON r.IDCliente = c.IDCliente
                WHERE e.Categoria = ?
                `,[categoria]
                
            );
        } else {
            return db.execute(`
            SELECT r.*, c.Correo 
            FROM resena r
            INNER JOIN encuesta e ON r.IDEncuesta = e.IDEncuesta
            INNER JOIN cliente c ON r.IDCliente = c.IDCliente
            `);
        }
    }
}
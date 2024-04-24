const db = require('../util/database');

module.exports = class Pregunta {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_Pregunta, mi_Descripcion, mi_Tipo, mi_Categoria) {
        this.Pregunta = mi_Pregunta;
        this.Descripcion = mi_Descripcion;
        this.Tipo = mi_Tipo;
        this.Categoria = mi_Categoria;
    }
    // En tu modelo de Reseña (Resena.model.js o similar)
    static fetchAllByIDEncuesta(IDEncuesta) {
        return db.execute(`
            SELECT p.Descripcion, e.IDEncuesta, p.IDPregunta, p.Categoria, Tipo, e.Categoria FROM pregunta p, encuesta e 
            WHERE p.categoria = e.categoria AND IDEncuesta = ?;
        `, [IDEncuesta]);
    }
}
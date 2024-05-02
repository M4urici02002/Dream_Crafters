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
    static fetchAllByCategoria(IDEncuesta) {
        return db.execute(`
            SELECT p.Descripcion, e.IDEncuesta, p.IDPregunta, p.Categoria, Tipo, e.Categoria FROM pregunta p, encuesta e 
            WHERE p.categoria = e.categoria AND IDEncuesta = ?;
        `, [IDEncuesta]);
    }

    // Método para guardar la relación entre la encuesta y la pregunta en la tabla preguntaencuesta
    static async guardarPreguntaEnEncuesta(IDEncuesta, IDPregunta) {
        try {
            await db.execute(
                `INSERT INTO preguntaencuesta (IDEncuesta, IDPregunta) 
                VALUES (?, ?)`,
                [IDEncuesta, IDPregunta]
            );
        } catch (error) {
            throw new Error("Error al guardar la pregunta en la encuesta: " + error.message);
        }
    }

    static async fetchAllByEncuesta(IDEncuesta) {
        try {
            const [result] = await db.execute(`
                SELECT P.Descripcion
                FROM Pregunta P
                JOIN PreguntaEncuesta PE ON P.IDPregunta = PE.IDPregunta
                WHERE PE.IDEncuesta = ?;
            `, [IDEncuesta]);
    
            // Mapea los resultados para obtener un array de descripciones de preguntas
            const descripciones = result.map(row => row.Descripcion);
    
            return descripciones;
        } catch (error) {
            console.error("Error al buscar las preguntas de la encuesta: ", IDEncuesta);
            throw new Error("Error al buscar las preguntas de la encuesta");
        }
    }
    

}
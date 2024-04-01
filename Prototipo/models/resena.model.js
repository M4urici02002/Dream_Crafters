const db = require('../util/database');

// const resena = [
//     {
//         producto:"Colchon Sigma",
//         nombre: "Valeria", 
//         fecha: "00/00/0000", 
//         titulo: "Muy buena calidad y muy comodo",
//         estrellas: 'xxxxx',

//     }
// ];

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

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
//    save() {
//        coches.push({
//            producto: this.producto,
//            nombre: this.nombre,
//            fecha: this.fecha,
//            titulo: this.titulo,
//            estrellas: this.estrellas,
//        });
//    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('Select * from resena')
    }

}
const resena = [
    {
        producto:"Colchon Sigma",
        nombre: "Valeria", 
        fecha: "00/00/0000", 
        titulo: "Muy buena calidad y muy comodo",
        estrellas: 'xxxxx',

    }
];

module.exports = class Resena {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_producto, mi_nombre, mi_fecha, mi_titulo, mi_estrellas) {
        this.producto = mi_producto;
        this.nombre = mi_nombre;
        this.fecha = mi_fecha;
        this.titulo = mi_titulo;
        this.estrellas = mi_estrellas;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        coches.push({
            producto: this.producto,
            nombre: this.nombre,
            fecha: this.fecha,
            titulo: this.titulo,
            estrellas: this.estrellas,
        });
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return resena;
    }

}
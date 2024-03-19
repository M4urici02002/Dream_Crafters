const db = require('../util/database');

module.exports = class Producto {
    // Constructor de la clase
    constructor(mi_clase, mi_precio, mi_imagen) {
        this.clase = mi_clase;
        this.precioProducto = mi_precio;
        this.imagen = mi_imagen;
    }

    // Este método sirve para guardar el último producto agregado
    save () {
        return db.execute(
            `INSERT INTO producto (clase, precio, imagen) 
            VALUES (?, ?, ?)`, 
            [this.clase, this.precioProducto, this.imagen]);
    }

    // Método que devuelve los objetos del almacenamiento persistente
    static fetchAll() {
        //return productosCatalogo;
        return db.execute('Select * from producto')
    }
    static fetch(IDProducto) {
        if (IDProducto) {
            return this.fetchOne(IDProducto);
        } else {
            return this.fetchAll();
        }
    }
    static fetchOne(IDProducto) {
        return db.execute('Select * from producto WHERE IDProducto = ?', [IDProducto]);
    }

    static update(IDProducto, clase, precio, imagen) {
        return db.execute(`UPDATE producto SET 
            clase = ?, precio = ?, imagen = ?
            WHERE IDProducto = ?`, 
            [clase, precio, imagen, IDProducto]);
    }

}


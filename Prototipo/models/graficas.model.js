const db = require('../util/database');

// Función para obtener las calificaciones
exports.obtenerCalificaciones = () => {
    return db.execute('SELECT rating, COUNT(*) as cantidad FROM resena GROUP BY rating ORDER BY rating;');
};

exports.obtenerCategorias = () => {
    return db.execute('SELECT DISTINCT Categoria FROM Producto ORDER BY Categoria;');
};

// Función para obtener productos por categoría
exports.obtenerProductosPorCategoria = (categoria) => {
    return db.execute('SELECT IDProducto, Nombre FROM Producto WHERE Categoria = ? ORDER BY Nombre;', [categoria]);
};
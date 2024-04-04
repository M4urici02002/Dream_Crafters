const db = require('../util/database');

exports.calificacionEstrellas = (request, response, next) => {
    db.execute('SELECT rating, COUNT(*) as cantidad FROM resena GROUP BY rating ORDER BY rating;')
    .then(([result]) => {
        // Ahora que tienes los resultados, puedes renderizar la vista con ellos
        response.render('calificacionEstrellas', {
            datos: result,
            permisos: request.session.permisos || [] // Se pasa 'permisos' a la vista
        });
    })
    .catch((error) => {
        console.error('Error al obtener las calificaciones:', error);
        response.send("Error al obtener los datos");
    });
};

exports.getCategorias = (request, response, next) => {
    const query = 'SELECT DISTINCT categoria FROM producto ORDER BY Categoria ASC;';
    db.execute(query)
    .then(([categorias]) => {
        response.render('calificacionEstrellas', { // Asegúrate de reemplazar 'ruta/a/tu/vista/ejs' con la ruta real a tu archivo EJS
            categorias: categorias,
            permisos: request.session.permisos || [] // Se pasa 'permisos' a la vista
            // Incluye cualquier otra variable que necesites pasar a tu vista
        });
    })
    .catch(err => console.log(err));
};


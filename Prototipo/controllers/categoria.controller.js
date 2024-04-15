const Categoria = require('../models/categoria.model');

exports.getCategorias = (req, res, next) => {
    const nombreMarca = req.cookies['marcaSeleccionada'] || 'LUUNA'; // Valor por defecto
    Categoria.fetchAllByMarcaNombre(nombreMarca)
        .then(([categorias]) => {
            res.locals.listaCategorias = categorias; // Almacenar categorías en res.locals
            next(); // Continuar con el próximo middleware
        })
        .catch(err => {
            console.log(err);
            res.locals.listaCategorias = []; // Asegurar que siempre existe la variable, aunque esté vacía
            next();
        });
};

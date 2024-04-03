const Resena = require('../models/resena.model');

exports.get_resena = (request, response, next) => {
    Resena.fetchAll().then(([rows, fieldData]) => {
        //console.log(fieldData);
        response.render('resena', {
            resena: rows,
            permisos: request.session.permisos || [],
        });
    })
    .catch((error) => {
        console.log(error)
    });


};
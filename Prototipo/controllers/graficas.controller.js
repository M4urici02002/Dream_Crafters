const path = require('path');

exports.get_graficas= (request, response, next) => {
    response.render('graficas', {
        permisos: request.session.permisos || [],

    });
};
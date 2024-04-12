const Rol = require('../models/rol.model');

exports.get_crearRol = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('crearRol', {
        nombreRol: request.session.nombreRol || '',
        registro: true,
        csrfToken: request.csrfToken(), // Asegúrate de que request.csrfToken() esté disponible aquí
        error: error,
        permisos: request.session.permisos || [],
    });
};

exports.post_crearRol = (request, response, next) => {
    const nombreRol = request.body.nombreRol;
    const nuevo_rol = new Rol(nombreRol);

    nuevo_rol.save()
        .then(() => {
            response.redirect('/gestionRol');
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'Error al crear el rol';
            response.redirect('/gestionRol/crearRol');
        });
};



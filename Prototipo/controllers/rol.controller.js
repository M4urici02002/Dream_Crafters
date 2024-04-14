const Rol = require('../models/rol.model');

exports.get_crearRol = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('crearRol', {

        nombreRol: request.session.nombreRol || '',
        csrfToken:request.csrfToken(),
        error:error,
        permisos: request.session.permisos || [],
    });
};

exports.post_crearRol = (request, response, next) => {
    const nuevo_Rol = new Rol (
        request.body.nombreRol
    );
    nuevo_Rol.save()
        .then(() => {
            response.redirect('/gestionRoles');
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'Ese rol ya existe';
            response.redirect('/gestionRoles/crearRol');
        });
};
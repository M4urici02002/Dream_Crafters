const Rol = require('../models/rol.model');

exports.get_crearRol = async (request, response, next) => {
    try {
        const privilegios = await Rol.privilegioAll(); // Suponiendo que tienes un método fetchAll en tu modelo de Privilegio
        response.render('crearRol', {
            nombreRol: request.session.nombreRol || '',
            csrfToken: request.csrfToken(),
            error: request.session.error || '',
            permisos: request.session.permisos || [],
            privilegios: privilegios
        });
    } catch (error) {
        console.error(error);
        request.session.error = 'Error al obtener los privilegios';
        response.redirect('/gestionRoles');
    }
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
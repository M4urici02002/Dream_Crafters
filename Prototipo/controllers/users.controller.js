const Usuario = require('../models/usuario.model');

exports.get_login = (request, response, next) => {
    response.render('login', {
        username: request.session.username || '',
        permisos: request.session.permisos || [],

    });
};

exports.post_login = (request, response, next) => {
    Usuario.fetchOne(request.body.username)
        .then(([usuarios, fieldData]) => {
            if (usuarios.length == 1) {
                const usuario = usuarios[0];
                Usuario.getPermisos(usuario.username)
                .then(([permisos, fieldData]) => {
                    console.log(permisos);
                    request.session.permisos = permisos;
                    request.session.username = usuario.nombre;
                    request.session.isLoggedIn = true;
                    response.redirect('/graficas');
                })
                .catch((error) => {
                    console.log(error);
                });
            } else {
                response.redirect('/login');
            }
        })
        .catch((error) => {console.log(error);});
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};
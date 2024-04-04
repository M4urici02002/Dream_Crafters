const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

exports.get_login = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        username: request.session.username || '',
        registro: false,
        //csrfToken: request.csrfToken(),
        error: error,
        permisos: request.session.permisos || [],
    });
};

// exports.post_login = (request, response, next) => {
//     Usuario.fetchOne(request.body.username)
//         .then(([usuarios, fieldData]) => {
//             if (usuarios.length == 1) {
//                 const usuario = usuarios[0];
//                 bcrypt.compare(request.body.password, usuario.password)
//                     .then((doMatch) => {
//                         if(doMatch) {
//                             Usuario.getPermisos(usuario.username)
//                             .then(([permisos, fieldData]) => {
//                                 console.log(permisos);
//                                 console.log(usuario);
//                                 request.session.permisos = permisos;
//                                 request.session.username = usuario.username;
//                                 request.session.nombre = usuario.nombre;
//                                 request.session.isLoggedIn = true;
//                                 response.redirect('/graficas');
//                             })
//                             .catch((error) => {
//                                 console.log(error);
//                             });
//                         } else {
//                             request.session.error = "Usuario y/o contraseña incorrectos";
//                             response.redirect('/login');
//                         }
//                     })
//                     .catch((error) => {
//                         console.log(error);
//                     });
//             } else {
//                 request.session.error = "Usuario y/o contraseña incorrectos";
//                 response.redirect('/login');
//             }
//         })
//         .catch((error) => {console.log(error);});
// };

exports.post_login = (request, response, next) => {
    Usuario.fetchOneWithRole(request.body.username)
        .then(([usuarios, fieldData]) => {
            if (usuarios.length == 1) {
                const usuario = usuarios[0];
                bcrypt.compare(request.body.password, usuario.password)
                    .then((doMatch) => {
                        if(doMatch) {
                            Usuario.getPermisos(usuario.username)
                            .then(([permisos, fieldData]) => {
                                console.log(permisos);
                                console.log(usuario);
                                request.session.permisos = permisos;
                                request.session.username = usuario.username;
                                request.session.nombre = usuario.nombre;
                                request.session.rol = usuario.nombre_rol; // Guardar el rol en la sesión
                                request.session.isLoggedIn = true;
                                response.redirect('/graficas');
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        } else {
                            request.session.error = "Usuario y/o contraseña incorrectos";
                            response.redirect('/login');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                request.session.error = "Usuario y/o contraseña incorrectos";
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

exports.get_crearUsuario = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('crearUsuario', {
        username: request.session.username || '',
        registro: true,
        //csrfToken: request.csrfToken(),
        error: error,
        permisos: request.session.permisos || [],
    });
};
exports.post_crearUsuario = (request, response, next) => {
    const nuevo_usuario = new Usuario(
        request.body.username, request.body.name, request.body.password
    );
    nuevo_usuario.save()
        .then(() => {
            response.redirect('/gestionUsuarios');
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'Ese usuario ya existe';
            response.redirect('/gestionUsuarios/crearUsuario');
        });
};
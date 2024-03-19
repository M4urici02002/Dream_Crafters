const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

// Controlador para mostrar la vista de inicio de sesión
exports.get_login = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        username: request.session.username || '',
        registro: false,
        csrfToken: request.csrfToken(),
        error: error,
        permisos: request.session.permisos || [],
    });
};

// Controlador para manejar la solicitud de inicio de sesión
exports.post_login = (request, response, next) => {
    Usuario.fetchOne(request.body.username)
    // Busca un usuario en la base de datos
    .then(([usuarios, fieldData]) => {
        if (usuarios.length == 1) {
            const usuario = usuarios[0];
                bcrypt.compare(request.body.password, usuario.password)
                    .then((doMatch) => {
                        if(doMatch) {
                            Usuario.getPermisos(usuario.username)
                                .then(([permisos, fieldData]) => { // La consulta recibirá un arreglo con los permisos/privilegios
                                    console.log(permisos); // Para validar que se están recuperando los permisos
                                    request.session.permisos = permisos;
                                    request.session.username = usuario.nombre; 
                                    request.session.isLoggedIn = true;
                                    response.redirect('/');
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        } else {
                            request.session.error = "Usuario y/o contraseña incorrectos";
                            response.redirect('/users/login');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
        } else {
            request.session.error = "Usuario y/o contraseña incorrectos";
            response.redirect('/users/login');
        }
    })
    .catch((error) => {console.log(error);});
};

// Controlador para manejar la solicitud de cierre de sesión
exports.get_logout = (request, response, next) => {
    // Se destruye la sesión del usuario
    request.session.destroy(() => {
        response.redirect('/users/login'); 
    });
};

// Controlador para mostrar la vista de registro
exports.get_signup = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        username: request.session.username || '',
        registro: true,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error,
    });
};

// Controlador para manejar la solicitud de registro de un nuevo usuario
exports.post_signup = (request, response, next) => {
    // Crear un nuevo objeto de Usuario con los datos proporcionados en la solicitud
    const nuevo_usuario = new Usuario(
        request.body.username, request.body.name, request.body.password
    );
    // Se guarda el nuevo usuario en la base de datos
    nuevo_usuario.save()
        .then(() => {
            // Después de guardar exitosamente, se redirige al usuario a la página de inicio de sesión
            response.redirect('/users/login');
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'Nombre de usuario no disponible';
            response.redirect('/users/signup');
        });
};
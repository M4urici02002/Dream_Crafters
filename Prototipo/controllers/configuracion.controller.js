const Usuario = require('../models/usuario.model');

exports.get_configuracion = (request, response, next) => {
    response.render('configuracion', {
        nombre: request.session.nombre || '',
        nombre_rol: request.session.rol || '',
        password: request.session.password || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
};

exports.post_configuracion = (request, response, next) => {
    const { password, newPassword, confirmPassword } = request.body;

    // Verificar que la contraseña nueva y la confirmación coincidan
    if (newPassword !== confirmPassword) {
        return console.log('La nueva contraseña y la confirmación no coinciden');
    }

    // Verificar que la contraseña actual del usuario sea correcta
    if (password !== request.session.password) {
        return console.log('La contraseña actual es incorrecta');
    }

    // Actualizar la contraseña en la base de datos
    Usuario.updatePassword(request.session.username, newPassword)
        .then(() => {
            // Enviar un mensaje de éxito como JSON
            console.log('Contraseña actualizada exitosamente');
        })
        .catch(error => {
            // Enviar un mensaje de error como JSON
            console.error('Error al actualizar la contraseña:', error);
            console.log('Error al actualizar la contraseña');
        });
};


const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');

exports.get_configuracion = (request, response, next) => {
    response.render('configuracion', {
        successMessage: '',
        nombre: request.session.nombre || '',
        nombre_rol: request.session.rol || '',
        password: request.session.password || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
};

exports.post_configuracion = async (request, response, next) => {
    const { password, newPassword, confirmPassword } = request.body;

    try {
        if (newPassword !== confirmPassword) {
           throw new Error('La nueva contraseña y la confirmación no coinciden');
        }

        const usuario = await Usuario.fetchOne(request.session.username);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Comparar la contraseña nueva y BD
        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) {
            throw new Error('La contraseña actual es incorrecta');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await Usuario.updatePassword(request.session.username, hashedPassword);

        // Mensaje de éxito solo si la contraseña se actualizó correctamente
        const successMessage = 'Contraseña actualizada exitosamente';

        // Renderizar la vista configuracion.ejs con el mensaje de éxito
        response.render('configuracion', {
            successMessage,
            nombre: request.session.nombre || '',
            nombre_rol: request.session.rol || '',
            password: request.session.password || '',
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        // Enviar un mensaje de error como respuesta
        response.status(400).json({ error: error.message });
    }
};

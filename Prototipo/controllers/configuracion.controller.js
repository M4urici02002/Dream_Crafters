const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');

exports.get_configuracion = (request, response, next) => {
    response.render('configuracion', {
        successMessage: '',
        errorMessage: '',
        errorMessageConfir: '',
        nombre: request.session.nombre || '',
        nombre_rol: request.session.rol || '',
        password: request.session.password || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
};

exports.post_configuracion = async (request, response, next) => {
    const { password, newPassword, confirmPassword } = request.body;
    let errorMessage = '';
    let errorMessageConfir = '';
    let successMessage = '';

    try { 
        const usuario = await Usuario.fetchOne(request.session.username);
        const passwordMatch = await bcrypt.compare(password, usuario.password);

        if (newPassword !== confirmPassword) {
            errorMessageConfir = 'La nueva contraseña y la confirmación no coinciden';
        } else if (!usuario) {
            throw new Error('Usuario no encontrado');
        } else if (!passwordMatch) {
            errorMessage = 'La contraseña actual es incorrecta';
        } else {
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            await Usuario.updatePassword(request.session.username, hashedPassword);
            successMessage = 'Contraseña actualizada exitosamente';
        }

        response.render('configuracion', {
            successMessage,
            errorMessage,
            errorMessageConfir,
            nombre: request.session.nombre || '',
            nombre_rol: request.session.rol || '',
            password: request.session.password || '',
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.error(error);
        response.status(500).send("Error al modificar contraseña");
    }
};


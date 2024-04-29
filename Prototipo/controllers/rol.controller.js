const { request } = require('express');
const Rol = require('../models/rol.model');

exports.get_crearRol = async (request, response, next) => {
    try {
        const privilegios = await Rol.privilegioAll(); // Suponiendo que tienes un método fetchAll en tu modelo de Privilegio
        response.render('crearRol', {
            nombreRol: request.session.nombreRol || '',
            csrfToken: request.csrfToken(),
            error: request.session.error || '',
            permisos: request.session.permisos || [],
            privilegios: privilegios,
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



// Modificar rol
exports.get_editarRol = async (req, res, next) => {
    const privilegios = await Rol.privilegioAll();

    Rol.fetchAll().then(([roles]) => {
        
        return Rol.findByNombre(req.params.nombreRol)
        .then(([roles, fieldData]) => {
            res.render("editarRol", {
                nombreRol: req.session.nombreRol || '',
                csrfToken: req.csrfToken(),
                permisos: req.session.permisos || [],
                rol: roles[0], // Asegúrate de que rol tenga la estructura esperada, como { id: ..., nombre: ... }
                privilegios: privilegios,
                mensaje: req.session.mensaje // Añade el mensaje de la sesión
            });
            // Después de enviar el mensaje, elimina el mensaje de la sesión para evitar que se muestre en futuras solicitudes
            delete req.session.mensaje;
        }); 
    }).catch ((error) => {
        console.error('Error al obtener el rol para editar:', error);
        res.status(500).send('Error al obtener el rol para editar');
    });
};


exports.post_editarRol = async (req, res, next) => {
    try {
        // Actualizar el nombre del rol en la base de datos
        const idRol = req.body.idRol;
        const nuevoNombreRol = req.body.nombreRol;
        await Rol.update(idRol, nuevoNombreRol);

        // Verificar si hay privilegios seleccionados
        if (req.body.privilegios) {
            // Eliminar todos los privilegios asociados al rol
            await Rol.eliminarPrivilegios(idRol);

            // Asignar los nuevos privilegios seleccionados al rol
            const privilegiosSeleccionados = req.body.privilegios;
            const asignacionesPromises = privilegiosSeleccionados.map(privilegio => {
                return Rol.asignarPrivilegio(idRol, privilegio);
            });
            await Promise.all(asignacionesPromises);
        }

        // Redirigir a la página de gestión de roles con un mensaje de éxito
        req.session.mensaje = `El rol ${nuevoNombreRol} fue modificado correctamente`;
        res.redirect('/gestionRoles');
    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        req.session.error = 'Error al actualizar el rol';
        res.redirect('/gestionRoles'); // Manejar el error redirigiendo a una página apropiada o mostrando un mensaje de error en la página de gestión de roles
    }
};




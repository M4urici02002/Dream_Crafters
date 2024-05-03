const { request } = require('express');
const Rol = require('../models/rol.model');

exports.get_crearRol = async (request, response, next) => {
    try {
        const privilegios = await Rol.privilegioAll();
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


exports.post_crearRol = async (request, response, next) => {
    const nuevo_Rol = new Rol(request.body.nombreRol);
    

    try {
        const rolExiste = await Rol.findByNombre(request.body.nombreRol);

        if (rolExiste) {
            request.session.error = 'Rol ya existente. Por favor, coloca otro nuevo.';
            response.redirect('/gestionRoles/crearRol');
            

        } else {
             // Limpiar otros mensajes de sesión para evitar confusiones
             request.session.error = ''; 
             nuevo_Rol.save()
             .then(async () => {
                 const [rol] = await Rol.obtenerRolPorNombre(request.body.nombreRol)
                 const privilegios = request.body["asignarRol[]"] || []
                 for (const privilegio of privilegios){
                     const [pri] = await Rol.obtenerPrivilegioPorNombre(privilegio)
                     Rol.asignarPrivilegio(rol[0].idrol, pri[0].idprivilegio);
                 }            
            response.redirect('/gestionRoles');
        })

        }
    } catch (error) {
        console.error('Error al crear el rol:', error);
        request.session.error = 'Error al crear el rol';
    } 
};



// Modificar rol
exports.get_editarRol = async (req, res, next) => {
    const privilegios = await Rol.privilegioAll();

        return Rol.obtenerRolPorNombre(req.params.nombreRol)
        .then(([roles, fieldData]) => {
            res.render("editarRol", {
                nombreRol: req.session.nombreRol || '',
                csrfToken: req.csrfToken(),
                error: req.session.error || '',
                permisos: req.session.permisos || [],
                rol: roles[0], // Asegúrate de que rol tenga la estructura esperada, como { id: ..., nombre: ... }
                privilegios: privilegios,
                mensaje: req.session.mensaje // Añade el mensaje de la sesión
            });
            // Después de enviar el mensaje, elimina el mensaje de la sesión para evitar que se muestre en futuras solicitudes
            delete req.session.mensaje;
        })
    .catch ((error) => {
        console.error('Error al obtener el rol para editar:', error);
        res.status(500).send('Error al obtener el rol para editar');
    });
};


exports.post_editarRol = async (req, res, next) => {
    try {
        const rolExistente = await Rol.findByNombre(req.body.nombreRol);

        if (rolExistente) {
            req.session.error = 'Rol ya existente. Por favor, coloca otro nuevo.';
            res.redirect(`/editarRol/${req.body.nombreRol}`);
        } else {
            req.session.error = ''; 
            // Actualizar el nombre del rol en la base de datos
            console.log("Current body = ", req.body)
            const idRol = req.body.idRol;
            const nuevoNombreRol = req.body.nombreRol;
            await Rol.update(idRol, nuevoNombreRol);

            // Verificar si hay privilegios seleccionados
            if (req.body.rol) {
                console.log([req.body.rol].flat())
                // Eliminar todos los privilegios asociados al rol
                await Rol.eliminarPrivilegios(idRol);

                // Asignar los nuevos privilegios seleccionados al rol
                const privilegiosSeleccionados = [req.body.rol].flat();
                const asignacionesPromises = privilegiosSeleccionados.map( async privilegio => {
                    console.log(privilegio)
                    const [idprivilegio] = await Rol.obtenerPrivilegioPorNombre(privilegio)
                    console.log(idprivilegio);
                    return Rol.asignarPrivilegio(idRol, idprivilegio[0].idprivilegio);
                });
                await Promise.all(asignacionesPromises);
            }

            // Redirigir a la página de gestión de roles con un mensaje de éxito
            req.session.mensaje = `El rol ${nuevoNombreRol} fue modificado correctamente`;
            res.redirect('/gestionRoles');
        }

    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        req.session.error = 'Error al actualizar el rol';
        res.redirect('/gestionRoles'); // Manejar el error redirigiendo a una página apropiada o mostrando un mensaje de error en la página de gestión de roles
    }
};
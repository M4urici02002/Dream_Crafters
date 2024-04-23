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
    try {
        const roles = await Rol.fetchAll();
        const nombreRol = req.params.nombreRol;
        const [rol] = await Rol.findByNombre(nombreRol);
        const privilegios = await Rol.privilegioAll();
        console.log("Nombre del rol:", nombreRol);

        res.render("editarRol", {
            nombreRol: req.session.nombreRol || '',
            csrfToken: req.csrfToken(),
            permisos: req.session.permisos || [],
            rol: rol[0], // Asegúrate de que rol tenga la estructura esperada, como { id: ..., nombre: ... }
            privilegios: privilegios,
        });
    } catch (error) {
        console.error('Error al obtener el rol para editar:', error);
        res.status(500).send('Error al obtener el rol para editar');
    }
};

exports.post_editarRol = (req, res, next) => {
    const idRol = req.body.idRol;
    const nombreRol = req.body.nombreRol;

    console.log("idRol: ", idRol);
    console.log("Nombre del rooool:", nombreRol);
    Rol.update(idRol, nombreRol)
        .then(([rows, fieldData]) => {
            req.session.mensaje = `El rol ${nombreRol} fue modificado correctamente`;
            Rol.fetchAll()
                .then(([roles, fieldData]) => {
                    res.render('gestionRoles', {
                        roles: roles,
                        permisos: req.session.permisos || [],
                        csrfToken: req.csrfToken(),
                        mensaje: req.session.mensaje
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send("Error al obtener roles");
                });
        })
        .catch((error) => {
            console.error('Error al actualizar el nombre del rol:', error);
            res.redirect(500, '/error'); // Corregir el orden de los argumentos aquí
        });
};

const Rol = require('../models/rol.model');

const db=require('../util/database');

exports.get_gestionRoles = async (request, response, next) => {
    try {
        const [uroles] = await db.query(`
            SELECT idrol, nombre
            FROM rol;
        `);

        Rol.fetchAll()
        response.render('gestionRoles', {
            rolRegistrado: uroles,
            permisos: request.session.permisos || [],
            csrfToken: request.csrfToken(),
        });
    } catch (error) {
        console.log(error);
        response.status(500).send("Error al obtener roles");
    }
};


// Crear rol
exports.get_crearRol = (request, response, next) => {
    response.render('crearRol',{
        permisos: request.session.permisos || [],
        csrfToken: request.csrfToken(),
    });
};

exports.post_crearRol = (request, response, next) => { //no
    console.log(request.body);
    const rol = new RolRegistrado(
        request.body.nombreRol,
    );

    rol.save()
        .then(([rows, fieldData]) => {
            response.redirect('/gestionRoles');
        }).catch((error) => {
            console.log(error);
        });
};
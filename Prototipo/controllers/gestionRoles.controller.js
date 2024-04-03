const db=require('../util/database');

exports.get_gestionRoles = async (request, response, next) => {
    try {
        const [uroles] = await db.query(`
            SELECT idrol, nombre
            FROM rol;
        `);

        response.render('gestionRoles', {
            roles: uroles,
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.log(error);
        response.status(500).send("Error al obtener roles");
    }
};


// Crear usuario
exports.get_crearRol = (request, response, next) => {
    response.render('crearRol',{
        permisos: request.session.permisos || [],
    });
};


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

// Eliminar rol
exports.verificarAsignacion = async (request, response, next) => {
    const { idrol } = request.body;

    try {
        // Verificar si el rol tiene asignaciones
        const totalAsignaciones = await Rol.asignaciones(idrol);

        if (totalAsignaciones > 0) {
            // Si tiene asignaciones, enviar un mensaje de error
            console.log('El rol está asignado a uno o más usuarios y no puede ser eliminado.');
            return response.status(400).json({ error: 'El rol está asignado a uno o más usuarios y no puede ser eliminado.' });
        } else {
            // Si no tiene asignaciones, proceder con la eliminación del rol
            console.log("Rol a eliminar:", request.body.idrol);
            await Rol.eliminar(idrol);

            return response.status(200).json({ message: 'El rol fue eliminado correctamente.' });
        }

    } catch (error) {
        console.error('Error al eliminar el rol:', error);
        return response.status(500).json({ error: 'Error al eliminar el rol.' });
    }
};


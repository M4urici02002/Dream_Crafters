const Usuario = require('../models/usuario.model');

const db=require('../util/database');

exports.get_usuarioRegistrado = async (request, response, next) => {
    try {
        const [users] = await db.query(`
            SELECT U.username, U.nombre, rol.nombre AS rol_nombre
            FROM usuario U
            JOIN asigna A ON U.username = A.username
            JOIN rol ON A.idrol = rol.idrol;
        `);
        Usuario.fetchAll()
        response.render('gestionUsuarios', {
            usuarioRegistrado: users,
            permisos: request.session.permisos || [],
            csrfToken: request.csrfToken(),
        });
    } catch (error) {
        console.log(error);
        response.status(500).send("Error al obtener usuarios registrados");
    }
};

exports.post_eliminar = (request, response, next) => {
    console.log("Username a eliminar:", request.body.username); // Añade esto para depuración
    Usuario.eliminar(request.body.username)
        .then(() => {
            return Usuario.fetchAll();
        }).then(([usuarios, fieldData]) => {
            return response.status(200).json({usuarios: usuarios});
        }).catch((error) => {console.log(error)})
};
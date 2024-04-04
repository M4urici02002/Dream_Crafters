const db=require('../util/database');

exports.get_usuarioRegistrado = async (request, response, next) => {
    try {
        const [users] = await db.query(`
            SELECT U.username, U.nombre, rol.nombre AS rol_nombre
            FROM usuario U
            JOIN asigna A ON U.username = A.username
            JOIN rol ON A.idrol = rol.idrol;
        `);

        response.render('gestionUsuarios', {
            usuarioRegistrado: users,
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.log(error);
        response.status(500).send("Error al obtener usuarios registrados");
    }
};


// Crear usuario
exports.get_crearUsuario = (request, response, next) => {
    response.render('crearUsuario',{
        permisos: request.session.permisos || [],
    });
};

exports.post_crearUsuario = (request, response, next) => { //no
    console.log(request.body);
    const usuario = new UsuarioRegistrado(
        request.body.username, 
        request.body.nombre,
        request.body.rol,
    );

    usuario.save()
        .then(([rows, fieldData]) => {
            response.redirect('/gestionUsuarios');
        }).catch((error) => {
            console.log(error);
        });
};

// Función para eliminar un usuario
exports.eliminarUsuario = (req, res) => {
    const username = req.params.username;

    // Consulta SQL para eliminar el usuario
    const sql = `DELETE FROM usuarios WHERE username = ?`;

    connection.query(sql, [username], (err, result) => {
        if (err) {
            return res.status(500).send("Error interno del servidor.");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Usuario no encontrado.");
        }
        return res.status(200).send("Usuario eliminado correctamente.");
    });
};
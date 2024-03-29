const UsuarioRegistrado = require('../models/gestionUsuarios.model');

exports.get_usuarioRegistrado = (request, response, next) => {
    response.render('gestionUsuarios',{
        usuarioRegistrado: UsuarioRegistrado.fetchAll(),
    });
};

exports.get_crearUsuario = (request, response, next) => {
    response.render('crearUsuario');
};

exports.post_crearUsuario = (request, response, next) => {
    console.log(request.body);
    const usuario = new UsuarioRegistrado(
        request.body.username, 
        request.body.nombre,
        request.body.rol
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
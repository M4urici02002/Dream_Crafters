const Usuario = require('../models/usuario.model');

const db=require('../util/database');

exports.getUsuarioRegistrado = (request, response, next) => {
    Usuario.fetchUsuariosConRoles()
        .then(([users, fieldData]) => {
            response.render('gestionUsuarios', {
                usuarioRegistrado: users,
                permisos: request.session.permisos || [],
                csrfToken: request.csrfToken(),
                mensaje: ""
            });
        })
        .catch((error) => {
            console.log(error);
            response.status(500).send("Error al obtener usuarios registrados");
        });
};

exports.postEliminar = (request, response, next) => {
    console.log("Username a eliminar:", request.body.username); // Añade esto para depuración
    Usuario.eliminar(request.body.username)
        .then(() => {
            return Usuario.fetchAll();
        }).then(([usuarios, fieldData]) => {
            return response.status(200).json({usuarios: usuarios});
        }).catch((error) => {console.log(error)})
};

exports.getBuscar = (request, response, next) => {
    Usuario.search(request.params.valor_busqueda || "")
    .then(([users, fieldData]) => {
        return response.status(200).json({users: users});
    })
    .catch((error) => {console.log(error)});
};